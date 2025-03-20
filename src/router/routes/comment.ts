import express from 'express';
import { CommentController } from '../../controllers/comment';

const router = express.Router();

// 添加评论
router.post('/', CommentController.insertComment);

// 删除评论
router.delete('/:id', CommentController.deleteComment);

// 获取评论列表
router.get('/:id', CommentController.getComments);

export default router;
