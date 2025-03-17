import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import picocolors from 'picocolors';
import { createStream } from 'rotating-file-stream';

// 设置日志文件的存储目录
const logDirectory = path.join(__dirname, '../../logs');

// 确保日志目录存在
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// 创建一个按日期轮转的日志流
const accessLogStream = createStream(
    (time) => {
        if (!time) return new Date().toISOString().slice(0, 10) + '.log'; // 没有时间时使用当前日期
        const date = new Date(time);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}.log`; // 文件名格式为 YYYY-MM-DD.log
    },
    {
        interval: '1d', // 每天创建一个新的日志文件
        path: logDirectory
    }
);

// 自定义 morgan 格式
morgan.token('status', (req, res) => {
    const status = res.statusCode;
    // 根据状态码设置不同的颜色
    const color =
        status >= 500
            ? picocolors.red
            : status >= 400
              ? picocolors.yellow
              : status >= 300
                ? picocolors.cyan
                : status >= 200
                  ? picocolors.green
                  : picocolors.white;
    return color(status.toString());
});

morgan.token('method', (req, res) => {
    return picocolors.blue(req.method);
});

morgan.token('url', (req, res) => {
    return picocolors.magenta(req.url);
});

// 客制化输出内容
export const logger = morgan((tokens, req: any, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        picocolors.gray(tokens['response-time'](req, res) + ' ms')
    ].join('  ');
});

// 生成本地 Log 文件
export const localogger = morgan('combined', {
    skip: (_, res) => res.statusCode <= 200,
    stream: accessLogStream
});
