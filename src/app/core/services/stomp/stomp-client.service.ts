import {Injectable, signal} from '@angular/core';
import {Client} from '@stomp/stompjs';
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

  constructor() {
    this.client.onConnect = () => {
      console.log('[STOMP] Connected');

      this.connecting.set(false);
      this.connected.set(true);
    };

    this.client.onDisconnect = () => {
      console.log('[STOMP] Disconnected');

      this.connecting.set(false);
      this.connected.set(false);
    };

    this.client.onStompError = (frame) => {
      console.error('[STOMP] Error:', frame);
    };
  }

  connect(): void {

    if (this.connected() || this.connecting()) {
      console.log('[STOMP] Already connected/connecting');
      return;
    }

    console.log('[STOMP] Connecting...');

    this.connecting.set(true);

    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('[STOMP] Cannot connect without authentication token');
      return;
    }

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

    this.connecting.set(false);
    this.connected.set(false);

    this.client.deactivate();
  }

}
