import {Injectable, signal} from '@angular/core';
import {Client, IMessage, StompSubscription} from '@stomp/stompjs';
import {environment} from '@env/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StompClientService {

  private readonly client = new Client({
    brokerURL: environment.BROKER_URL,
    reconnectDelay: 5000,
    debug: msg => console.log('[STOMP]', msg),
  });

  readonly connected = signal(false);
  readonly connecting = signal(false);

  private readonly subscriptions = new Map<
    string,
    {
      callback: (message: IMessage) => void;
      subscription?: StompSubscription;
    }
  >();

  constructor() {
    this.client.onConnect = () => {
      console.log('[STOMP] Connected');

      this.connecting.set(false);
      this.connected.set(true);

      this.restoreSubscriptions();
    };

    this.client.onDisconnect = () => {
      console.log('[STOMP] Disconnected');

      this.connected.set(false);
      this.connecting.set(false);

      this.clearActiveSubscriptions();
    };

    this.client.onStompError = (frame) => {
      console.error('[STOMP] STOMP error:', frame);
    };

    this.client.onWebSocketError = (error) => {
      console.error('[STOMP] WebSocket error:', error);
    };

    this.client.onWebSocketClose = () => {
      console.warn('[STOMP] WebSocket closed');
      this.connected.set(false);
    };
  }

  connect(): void {

    if (this.connected() || this.connecting()) {
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('[STOMP] Cannot connect without authentication token');
      return;
    }

    this.connecting.set(true);

    this.client.connectHeaders = {
      Authorization: `Bearer ${token}`
    };

    this.client.activate();
  }

  disconnect(): void {

    if (!this.connected() && !this.connecting()) {
      return;
    }

    console.log('[STOMP] Disconnecting...');

    this.subscriptions.clear();

    this.connecting.set(false);
    this.connected.set(false);

    this.client.deactivate();
  }

  subscribe(destination: string, callback: (message: IMessage) => void): void {

    // Store the subscription definition.
    this.subscriptions.set(destination, {callback});

    // If already connected, subscribe immediately.
    if (this.connected()) {
      this.subscribeNow(destination);
    }
  }

  unsubscribe(destination: string): void {

    const entry = this.subscriptions.get(destination);

    if (!entry) {return;}

    entry.subscription?.unsubscribe();

    this.subscriptions.delete(destination);

    console.log(`[STOMP] Unsubscribed from ${destination}`);
  }

  private restoreSubscriptions(): void {

    console.log(`[STOMP] Restoring ${this.subscriptions.size} subscriptions`);

    for (const destination of this.subscriptions.keys()) {
      this.subscribeNow(destination);
    }
  }

  private subscribeNow(destination: string): void {

    const entry = this.subscriptions.get(destination);

    if (!entry || !this.connected()) {
      return;
    }

    // Prevent duplicate subscription.
    if (entry.subscription) {
      return;
    }

    entry.subscription = this.client.subscribe(
      destination,
      entry.callback
    );

    console.log(`[STOMP] Subscribed to ${destination}`);
  }

  private clearActiveSubscriptions(): void {

    for (const entry of this.subscriptions.values()) {
      entry.subscription = undefined;
    }
  }
}
