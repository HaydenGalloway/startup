const GameEvent = {
  System: 'system',
  End: 'gameEnd',
  Start: 'gameStart',
  AddItem: 'addItem',
  RemoveItem: 'removeItem'
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class GameEventNotifier {
  //events = [];
  handlers = [];

  constructor() {
    // When dev debugging we need to talk to the service and not the React debugger
    let port = window.location.port;
    if (process.env.NODE_ENV !== 'production') {
      port = 4000;
    }

    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = (event) => {
      this.receiveEvent(new EventMessage('Santa\'s List', GameEvent.System, { msg: 'connected' }));
    };
    this.socket.onclose = (event) => {
      this.receiveEvent(new EventMessage('Santa\'s List', GameEvent.System, { msg: 'disconnected' }));
    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
      } catch {}
    };
  }

  sendAddItemEvent(email) {
    console.log('Sending Add Item event:', email);
    this.broadcastEvent(email, GameEvent.AddItem, {});
  }

  sendRemoveItemEvent(email, item) {
    console.log('Sending Remove Item event:', email, item);
    this.broadcastEvent(email, GameEvent.RemoveItem, {});
  }

  broadcastEvent(from, type, value) {
    const event = new EventMessage(from, type, value);
    this.socket.send(JSON.stringify(event));
    this.receiveEvent(event); // Add this line to directly call receiveEvent
  }

  addHandler(handler) {
    console.log('Adding handler:', handler);
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    console.log('Removing handler:', handler);
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    console.log('Received event:', event);
    this.handlers.forEach((handler) => {
      console.log('Calling handler for event:', event);
      handler(event);
    });
  }  
  
}

const GameNotifier = new GameEventNotifier();
export { GameEvent, GameNotifier };
