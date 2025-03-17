import { ErrorRequestHandler } from 'express';
import { logger } from '../utils/logger';

export const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
    logger.error(`Error occurred: ${err.message}`, err);
    res.status(500).json({
        ok: false,
        message: '服务器内部错误',
        error: process.env.NODE_ENV === 'development' ? err.message : '请联系管理员'
    });
    next();
};
