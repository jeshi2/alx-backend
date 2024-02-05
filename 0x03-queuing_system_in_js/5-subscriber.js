import redis from 'redis';

const subscriberClient = redis.createClient();

subscriberClient.on('connect', () => {
  console.log('Redis client connected to the server');
});

subscriberClient.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err}`);
});

const channel = 'holberton school channel';

subscriberClient.subscribe(channel);

subscriberClient.on('message', (channel, message) => {
  console.log(message);

  if (message === 'KILL_SERVER') {
    subscriberClient.unsubscribe();
    subscriberClient.quit();
  }
});
