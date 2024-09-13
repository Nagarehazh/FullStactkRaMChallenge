import { createClient } from 'redis';

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export async function connectRedis() {
    await redisClient.connect();
    console.log('🚀 Connected to Redis');
}

export default redisClient;