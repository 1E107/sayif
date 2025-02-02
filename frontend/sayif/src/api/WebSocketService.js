import { Client } from '@stomp/stompjs';
import { API_BASE_URL } from './config';
import SockJS from 'sockjs-client';

class WebSocketService {
  constructor() {
    this.client = null;
    this.token = null;
    this.onConnectCallbacks = [];
    this.subscriptions = new Map(); // 구독 상태를 추적하기 위한 맵
  }

  connect(token) {
    if (this.client && this.client.connected) {
      return; // 이미 연결되어 있으면 새로운 연결을 만들지 않음
    }

    this.token = token;

    this.client = new Client({
      brokerURL: 'wss://i11e107.p.ssafy.io/api/ws',
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      debug: function (str) {
        console.log('STOMP: ' + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws`)
    });

    this.client.onConnect = (frame) => {
      console.log('Connected to WebSocket server');
      console.log('Server frame:', frame);
      this.onConnectCallbacks.forEach(callback => callback());
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.activate(); 
  }

  disconnect() {
    if (this.client !== null) {
      // 모든 구독을 취소
      this.subscriptions.forEach((subscription, topic) => {
        console.log(`Unsubscribing from topic: ${topic}`);
        subscription.unsubscribe();
      });
      // 구독 맵을 초기화
      this.subscriptions.clear();
      
      // WebSocket 연결 해제
      this.client.deactivate();
      console.log('Disconnected from WebSocket server');
    }
  }

  sendMessage(topic, message) {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: topic,
        body: JSON.stringify(message),
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      console.log('Message sent to topic:', topic, 'Message:', message);
    } else {
      console.error('Unable to send message, WebSocket client is not connected');
    }
  }

  subscribe(topic, callback) {
    if (this.client && this.client.connected) {
      if (!this.subscriptions.has(topic)) {
        console.log('Subscribing to topic:', topic);
        const subscription = this.client.subscribe(topic, (message) => {
          console.log('Raw message received:', message);
          console.log('Message body:', message.body);
          try {
            const parsedBody = JSON.parse(message.body);
            console.log('Parsed message:', parsedBody);
            callback(parsedBody);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        });
        this.subscriptions.set(topic, subscription); // 구독 상태 저장
      } else {
        console.log('Already subscribed to topic:', topic);
      }
    } else {
      console.error('WebSocket is not connected. Unable to subscribe.');
      this.onConnectCallbacks.push(() => this.subscribe(topic, callback));
    }
    return null;
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
