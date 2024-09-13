import redisClient from "../configs/redis/redisClient";

export async function getCachedData(key: string): Promise<string | null> {
    try {
        return await redisClient.get(key);
    } catch (error) {
        console.error('Error getting data from Redis:', error);
        return null;
    }
}

export async function setCachedData(key: string, value: string, expirationInSeconds: number = 3600): Promise<void> {
    try {
        await redisClient.set(key, value, {
            EX: expirationInSeconds,
        });
    } catch (error) {
        console.error('Error setting data in Redis:', error);
    }
}
