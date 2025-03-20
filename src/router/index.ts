import express from 'express';

import ArticleRoute from './routes/article';
import AuthorRoute from './routes/author';
import CommentRoute from './routes/comment';
import TagRoute from './routes/tag';
import VisitorRoute from './routes/visitor';

const router = express.Router();

// 文章
router.use('/articles', ArticleRoute);
// 标签
router.use('/tags', TagRoute);
// 作者
router.use('/authors', AuthorRoute);
// 访客
router.use('/visitors', VisitorRoute);
// 评论
router.use('/comments', CommentRoute);

export default router;
