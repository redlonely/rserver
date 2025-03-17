import express from 'express';

import ArticleRoute from './routes/article';

const router = express.Router();

// 用户路由
router.use('/article', ArticleRoute);

export default router;
