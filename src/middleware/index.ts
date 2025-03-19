import router from '@/router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { errorHandler } from './error';
import { localogger, logger } from './logger';

export const useMiddleware = (app: Express) => {
    // 安全性相关中间件
    app.use(helmet());

    // 跨域处理中间件
    app.use(cors());

    // 请求解析中间件
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 日志记录中间件
    app.use(logger);
    app.use(localogger);

    // Cookie 解析中间件
    app.use(cookieParser());

    // 路由中间件
    app.use(process.env.API_PREFIX || '/api', router);

    // 错误处理中间件
    app.use(errorHandler);
};
