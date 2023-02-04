export function SharedSubscriptions() {
  debugger;
  //const subscribers = new Set();
  const subscribers: { [key: string]: Set<any> } = {};
  return {
    subscribe: (topic: string, subscriber: any) => {
      if (!subscribers[topic]) {
        subscribers[topic] = new Set();
      }
      subscribers[topic].add(subscriber);
      return () => {
        subscribers[topic].delete(subscriber);
      };
    },
    publish: (topic: string, data: any) => {
      for (const sub of Array.from(subscribers[topic])) {
        // @ts-ignore
        sub(data);
      }
    },
  };
}

export const cartSubs = SharedSubscriptions();
