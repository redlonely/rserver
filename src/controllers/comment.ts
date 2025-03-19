import { Comment } from '@/database/model/comment';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';

export class CommentController {
    // 添加评论
    static async insertComment(req: Request, res: Response) {
        try {
            const { author, target, type, parent, content } = req.body;
            console.log(req.body);
            if (isEmpty(author)) {
                return res.status(400).json({ error: '作者不能为空' });
            } else if (isEmpty(target) || type < 1) {
                return res.status(400).json({ error: '评论对象和评论对象类型不能为空' });
            } else if (isEmpty(content)) {
                return res.status(400).json({ error: '评论内容不能为空' });
            }
            const comment = await Comment.create({ author, target, type, content, parent });
            res.json({
                ok: true,
                code: 1,
                data: comment,
                message: '评论成功！'
            });
        } catch (error) {
            logger.error('评论失败：', error);
            res.status(500).json({ error: '评论失败，服务器错误' });
        }
    }
    // 删除评论
    static async deleteComment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (isEmpty(id)) {
                return res.status(400).json({ error: '评论ID不能为空' });
            }
            const comment = await Comment.findByIdAndDelete(id);
            if (!comment) {
                return res.status(404).json({ error: '评论不存在' });
            }
            res.json({
                ok: true,
                code: 1,
                data: comment,
                message: '删除评论成功！'
            });
        } catch (error) {
            logger.error('删除评论失败：', error);
            res.status(500).json({ error: '删除评论失败，服务器错误' });
        }
    }
}
