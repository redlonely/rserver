import { config } from '@/config';
import { logger } from '@/utils/logger';
import mongosose from 'mongoose';
import colors from 'picocolors';

const connect = async () => {
    mongosose.connect(config.DATABASE_URL, {});
    mongosose.connection.on('connected', () => {
        console.log(colors.green(`Successful Connected to MongoDB`));
    });
    mongosose.connection.on('error', (err) => {
        logger.error('MongoDB connection error:', err);
        console.error('MongoDB connection error:', err);
    });
    mongosose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });
};

const close = async () => {
    mongosose.connection.close();
};

export default { close, connect };
