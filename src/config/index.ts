import dotenv from 'dotenv';
import 'tsconfig-paths/register';
dotenv.config();

const {
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DATABASE_URL,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    API_PREFIX,
    CORS_ORIGIN
} = process.env;

export const config = {
    PORT: PORT || '3000',
    NODE_ENV: NODE_ENV || 'development',
    DB_HOST: DB_HOST || 'mongodb://localhost:27017',
    DB_PORT: DB_PORT || '27017',
    DB_NAME: DB_NAME || 'blog',
    DB_USER: DB_USER || '',
    DB_PASSWORD: DB_PASSWORD || '',
    REDIS_HOST: REDIS_HOST || 'localhost',
    REDIS_PORT: REDIS_PORT || 6379,
    REDIS_PASSWORD: REDIS_PASSWORD || '',
    DATABASE_URL: DATABASE_URL || '',
    JWT_SECRET: JWT_SECRET || 'secret',
    JWT_EXPIRES_IN: JWT_EXPIRES_IN || '1d',
    API_PREFIX: API_PREFIX || '/api',
    CORS_ORIGIN: CORS_ORIGIN || '*'
};
