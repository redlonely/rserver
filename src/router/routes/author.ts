import express from 'express';
import { AuthorController } from '../../controllers/author';

const router = express.Router();

// 添加作者
router.post('/', AuthorController.createAuthor);

// 删除作者
router.delete('/:id', AuthorController.deleteAuthor);

// 更新作者

// 获取作者列表
router.get('/', AuthorController.getAuthors);

export default router;
