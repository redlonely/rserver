import express from 'express';
import { VisitorControler } from '../../controllers/visitor';

const router = express.Router();

// 创建访客记录
router.post('/', VisitorControler.createVisitor);

// 删除访客记录
router.delete('/:id', VisitorControler.deleteVisitor);

// 获取访客记录列表
router.get('/', VisitorControler.getVisitors);

export default router;
