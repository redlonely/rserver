/**
 * 环境变量类型声明
 * 为 process.env 中的变量提供类型支持
 */

declare namespace NodeJS {
    interface ProcessEnv {
        // 服务器配置
        PORT: string;
        NODE_ENV: 'development' | 'production' | 'test';

        // 数据库配置
        DB_HOST: string;
        DB_PORT: string;
        DB_NAME: string;
        DB_USER: string;
        DB_PASSWORD: string;
        DATABASE_URL: string;

        // JWT配置
        JWT_SECRET: string;
        JWT_EXPIRES_IN: string;

        // 其他配置
        API_PREFIX: string;
        CORS_ORIGIN: string;
    }
}
