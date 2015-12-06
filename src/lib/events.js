let topics = {};

export function publish (topic: string, data: Object) : boolean {
  // checks if any one is interested in this topic
  if (!topics[topic]) {
    return false; // no need to broadcast on an empty network
  }

  let subscribers = topics[topic];
  let len = subscribers ? subscribers.length : 0;

  while (len--) {
    subscribers[len](data);
  }

  return true;
};

export function subscribe (topic: string, handler: Function) {
  if (!topics[topic]) {
    topics[topic] = [];
  }

  topics[topic].push(handler);
};

export function unsubscribe (topic: string, handler: Function) : boolean {
  // topic not found
  if (!topics[topic]) {
    return false;
  }

  let subscribers = topics[topic];
  let index = subscribers.indexOf(handler);

  // handler not found
  if (index = -1) {
    return false;
  }

  // removing subscriber
  subscribers.splice(index, 1);

  return true;
}
