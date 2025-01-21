import { createClient } from 'redis';  // Correct import for node-redis v4+

// Create and configure the Redis client
const client = createClient({
  url: 'redis://localhost:6379',  // Redis connection URL
});

// Log any errors
client.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
client.connect().catch(console.error);

export default client;
