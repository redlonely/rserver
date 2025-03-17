import express from 'express';
import { ArticleControler } from '../../controllers/article';

const router = express.Router();

// 获取所有用户
router.get('/', ArticleControler.getArticles);

export default router;
