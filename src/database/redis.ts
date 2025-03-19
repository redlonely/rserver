import Redis from 'ioredis';
import colors from 'picocolors';

import { config } from '@/config';

const redis = new Redis({
    host: config.REDIS_HOST,
    port: 26739,
    password: config.REDIS_PASSWORD,
    lazyConnect: true // 延迟连接
});

redis.on('connect', () => {
    console.log(colors.green(`Successful Connected to Redis`));
});

redis.on('error', (err: any) => {
    console.error(colors.red(`Redis connection error: ${err.message || err}`));
});

export default redis;
