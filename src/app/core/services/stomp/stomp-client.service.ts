import { Injectable, signal } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { environment } from '@env/environment.development';

interface SubscriptionEntry {
  id: number;
  callback: (message: IMessage) => void;
  subscription?: StompSubscription;
}

@Injectable({
  providedIn: 'root',
})
export class StompClientService {
  /**
   * The STOMP client instance used for managing WebSocket connections and subscriptions.
   * It is configured with the broker URL, reconnect delay, and debug logging.
   * The `beforeConnect` hook is used to set the Authorization header with the token from localStorage.
   */
  private readonly client = new Client({
    brokerURL: environment.BROKER_URL,
    reconnectDelay: 5000,
    debug: (msg) => console.log('[STOMP]', msg),

    beforeConnect: async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Cannot connect without authentication token');
      }

      this.client.connectHeaders = {
        Authorization: `Bearer ${token}`,
      };
    },
  });

  /**
   * A signal indicating whether the STOMP client is currently connected to the broker.
   */
  readonly connected = signal(false);

  /**
   * A signal indicating whether the STOMP client is in the process of connecting to the broker.
   */
  readonly connecting = signal(false);

  /**
   * A map that stores subscription entries for each destination.
   * Each entry contains the subscription ID, callback function, and the active subscription object (if subscribed).
   */
  private readonly subscriptions = new Map<
    string,
    Map<number, SubscriptionEntry>
  >();

  /**
   * A counter used to generate unique subscription IDs for each subscription entry.
   * This ensures that each subscription can be uniquely identified and managed.
   */
  private subscriptionId = 0;

  constructor() {
    // Handle successful connection events and restore subscriptions.
    this.client.onConnect = () => {
      console.log('[STOMP] Connected');

      this.connecting.set(false);
      this.connected.set(true);

      this.restoreSubscriptions();
    };

    // Handle disconnection events and clean up subscriptions.
    this.client.onDisconnect = () => {
      console.log('[STOMP] Disconnected');

      this.connected.set(false);
      this.connecting.set(false);

      this.clearActiveSubscriptions();
    };

    // Handle STOMP errors and log them for debugging purposes.
    this.client.onStompError = (frame) => {
      console.error('[STOMP] STOMP error:', frame);
    };

    // Handle WebSocket errors and log them for debugging purposes.
    this.client.onWebSocketError = (error) => {
      console.error('[STOMP] WebSocket error:', error);
    };

    // Handle WebSocket close events and clean up subscriptions.
    this.client.onWebSocketClose = () => {
      console.warn('[STOMP] WebSocket closed');

      this.connected.set(false);
      this.connecting.set(false);

      this.clearActiveSubscriptions();
    };
  }

  /**
   * Connects to the STOMP broker.
   * If the client is already active or if there is no authentication token in localStorage, the connection attempt is aborted.
   * @returns void
   */
  connect(): void {
    if (this.client.active) {
      return;
    }

    if (!localStorage.getItem('token')) {
      console.warn('[STOMP] Cannot connect without authentication token');
      return;
    }

    this.connecting.set(true);

    this.client.activate();
  }

  /**
   * Disconnects from the STOMP broker.
   * @returns A promise that resolves when the STOMP client has successfully disconnected from the broker.
   * If the client is not active, the promise resolves immediately.
   */
  async disconnect(): Promise<void> {
    if (!this.client.active) {
      return;
    }

    console.log('[STOMP] Disconnecting...');

    this.connected.set(false);
    this.connecting.set(false);

    await this.client.deactivate();

    this.clearActiveSubscriptions();

    console.log('[STOMP] Disconnected successfully');
  }

  /**
   * Subscribes to a STOMP destination.
   * @param destination The STOMP destination to subscribe to.
   * @param callback The callback function to handle incoming messages.
   * @returns The subscription ID.
   */
  subscribe(destination: string, callback: (message: IMessage) => void): number {
    const id = ++this.subscriptionId;

    const entry: SubscriptionEntry = { id, callback };

    // Initialize the destination entry if it doesn't exist.
    if (!this.subscriptions.has(destination)) {
      this.subscriptions.set(destination, new Map());
    }

    // Store the subscription definition.
    this.subscriptions.get(destination)!.set(id, entry);

    // If already connected, subscribe immediately.
    if (this.connected()) {
      this.subscribeNow(destination, entry);
    }

    return id;
  }

  unsubscribe(destination: string, subscriptionId?: number): void {
    const destinationSubscriptions = this.subscriptions.get(destination);

    if (!destinationSubscriptions) {
      return;
    }

    // Remove all subscriptions for this destination. if no subscriptionId is provided.
    if (subscriptionId === undefined) {
      for (const entry of destinationSubscriptions.values()) {
        entry.subscription?.unsubscribe();
      }

      this.subscriptions.delete(destination);

      console.log(`[STOMP] Unsubscribed from ${destination}`);

      return;
    }

    // Remove only the specified subscription.
    const entry = destinationSubscriptions.get(subscriptionId);

    if (!entry) {return;}

    entry.subscription?.unsubscribe();

    destinationSubscriptions.delete(subscriptionId);

    // If there are no more subscriptions for this destination, remove the destination entry.
    if (destinationSubscriptions.size === 0) {
      this.subscriptions.delete(destination);
    }

    console.log(`[STOMP] Unsubscribed from ${destination} (${subscriptionId})`);
  }

  /**
   * Restores subscriptions after a reconnection.
   */
  private restoreSubscriptions(): void {
    console.log(`[STOMP] Restoring ${this.subscriptions.size} subscriptions`);

    for (const [destination, entries] of this.subscriptions) {
      for (const entry of entries.values()) {
        this.subscribeNow(destination, entry);
      }
    }
  }

  /**
   * Subscribes to a STOMP destination.
   * @param destination The STOMP destination to subscribe to.
   * @param entry The subscription entry containing the callback.
   * @returns A promise that resolves when the subscription is successful.
   */
  private subscribeNow(destination: string, entry: SubscriptionEntry): void {
    if (!this.connected() || entry.subscription) {
      return;
    }

    entry.subscription = this.client.subscribe(destination, entry.callback);

    // Prevent duplicate subscription.
    if (entry.subscription) {
      return;
    }

    entry.subscription = this.client.subscribe(destination, entry.callback);

    console.log(`[STOMP] Subscribed to ${destination} (${entry.id})`);
  }

  /**
   * Clears all active subscriptions without removing their definitions.
   * This is typically called when the client disconnects to ensure that all active subscriptions are cleaned up.
   */
  private clearActiveSubscriptions(): void {
    for (const entries of this.subscriptions.values()) {
      for (const entry of entries.values()) {
        entry.subscription = undefined;
      }
    }
  }


  /**
   * Publishes a message to a STOMP destination.
   * @param destination The STOMP destination to publish the message to.
   * @param body The message body to be sent. It will be serialized to JSON.
   * @returns A boolean indicating whether the publish was successful (true) or failed due to disconnection (false).
   * 
   * NOTE: returning true means the message was handed to the STOMP client, not that the server successfully processed it
   */
  publish(destination: string, body: unknown): boolean {
    if (!this.connected()) {
      return false;
    }

    this.client.publish({
      destination,
      body: JSON.stringify(body)
    });

    return true;
  }
}
