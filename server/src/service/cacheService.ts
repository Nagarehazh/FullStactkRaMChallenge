import redisClient from "../configs/redis/redisClient";

async function ensureConnection() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
}

export async function getCachedData(key: string): Promise<string | null> {
    try {
        await ensureConnection();
        return await redisClient.get(key);
    } catch (error) {
        console.error('Error getting data from Redis:', error);
        return null;
    }
}

export async function setCachedData(key: string, value: string, expirationInSeconds: number = 3600): Promise<void> {
    try {
        await ensureConnection();
        await redisClient.set(key, value, {
            EX: expirationInSeconds,
        });
    } catch (error) {
        console.error('Error setting data in Redis:', error);
    }
}

export async function removeCachedData(pattern: string): Promise<void> {
    try {
        await ensureConnection();
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
            await redisClient.del(keys);
        }
    } catch (error) {
        console.error('Error removing data from Redis:', error);
    }
}
