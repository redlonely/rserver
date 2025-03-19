import express from 'express';

import ArticleRoute from './routes/article';

const router = express.Router();

import { BaseControler } from '@/controllers';

router.post('/visit', BaseControler.createVisit);

router.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    res.json({
        ok: true,
        ip,
        userAgent
    });
});

// 用户路由
router.use('/articles', ArticleRoute);

export default router;
