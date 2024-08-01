import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  constructor() {
    this.client = null;
    this.token = null;
  }

  connect(token) {
    if (this.client && this.client.connected) {
      return; // 이미 연결되어 있으면 새로운 연결을 만들지 않음
    }

    this.token = token;

    this.client = new Client({
      brokerURL: 'ws://localhost:9090/ws', // WebSocket 서버 URL
      connectHeaders: {
        Authorization: `Bearer ${token}` // WebSocket 연결 시 헤더에 토큰 포함
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => new SockJS('http://localhost:9090/ws') // WebSocket 엔드포인트 URL
    });

    this.client.onConnect = () => {
      console.log('Connected to WebSocket server');
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  disconnect() {
    if (this.client !== null) {
      this.client.deactivate();
    }
    console.log('Disconnected from WebSocket server');
  }

  sendMessage(topic, message) {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: topic,
        body: JSON.stringify(message),
        headers: {
          Authorization: `Bearer ${this.token}` // 메시지 전송 시 헤더에 토큰 포함
        }
      });
    } else {
      console.error('Unable to send message, WebSocket client is not connected');
    }
  }

  subscribe(topic, callback) {
    if (this.client && this.client.connected) {
      return this.client.subscribe(topic, (message) => {
        callback(JSON.parse(message.body));
      });
    }
    return null;
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
