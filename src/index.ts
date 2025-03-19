import dotenv from 'dotenv';
import 'tsconfig-paths/register';
dotenv.config();

import color from 'picocolors';

import express, { Express } from 'express';

import { useMiddleware } from './middleware';

import mongo from '@/database/mongo';

import { config } from '@/config';
import redis from './database/redis';

const app: Express = express();

// 中间件
useMiddleware(app);

// 数据库
mongo.connect();
redis.connect();

// 路由
app.listen(config.PORT, () => {
    console.clear();
    console.log(color.green('mode - '), color.yellow(config.NODE_ENV));
    console.log(color.green('Server is running on port'), color.yellow(config.PORT));
});
