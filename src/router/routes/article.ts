import express from 'express';
import { ArticleControler } from '../../controllers/article';

const router = express.Router();

// 创建文章
router.post('/', ArticleControler.createArticle);

// 删除文章
router.post('/:id', ArticleControler.deleteArticle);

// 删除文章 (真删除)
router.delete('/:id', ArticleControler.removeArticle);

// 更新文章
router.put('/:id', ArticleControler.updateArticle);

// 获取文章列表
router.get('/', ArticleControler.getArticles);

// 获取文章详情
router.get('/:id', ArticleControler.getArticle);

// 点赞文章
router.post('/:id/like', ArticleControler.likeArticle);

// TODO

// 分开获取数据 —— 评论、阅读数、点赞数 —— 优化性能
// 获取文章评论列表

// 取消点赞
// ​获取文章的阅读数
// ​获取文章的评论数

export default router;
