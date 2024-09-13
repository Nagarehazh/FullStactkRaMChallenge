import dotenv from 'dotenv';

dotenv.config();

export const environments = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '4040', 10),
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:password@postgres_db:5432/rickmorty_db',
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'rickmorty_db',
};