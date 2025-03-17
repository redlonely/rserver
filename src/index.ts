import dotenv from 'dotenv';
import 'tsconfig-paths/register';

import color from 'picocolors';

import express, { Express } from 'express';

// 尽早加载环境变量
dotenv.config();

// 使用类型化的环境变量
const PORT = process.env.PORT || '3000';
const NODE_ENV = process.env.NODE_ENV || 'development';

import { useMiddleware } from './middleware';

const app: Express = express();

// 中间件
useMiddleware(app);

// 路由
app.listen(PORT, () => {
    console.clear();
    console.log('\n ');
    console.log(color.green('mode - '), color.yellow(NODE_ENV));
    console.log(color.green('Server is running on port'), color.yellow(PORT));
    console.log(color.green('http://localhost:'), color.yellow(PORT));
    console.log('\n ');
});
