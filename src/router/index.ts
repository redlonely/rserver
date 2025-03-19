import express from 'express';

import ArticleRoute from './routes/article';
import AuthorRoute from './routes/author';
import CommentRoute from './routes/comment';

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

router.use('/articles', ArticleRoute); // 文章路由
router.use('/authors', AuthorRoute); // 评论路由
router.use('/comments', CommentRoute); // 评论路由

export default router;
