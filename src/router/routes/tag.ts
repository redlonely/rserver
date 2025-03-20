import express from 'express';
import { TagController } from '../../controllers/tag';

const router = express.Router();

// 创建标签
router.post('/', TagController.createTag);

// 删除标签
router.delete('/:id', TagController.deleteTag);

// 获取标签列表
router.get('/', TagController.getTags);

export default router;
