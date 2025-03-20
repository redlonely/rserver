import { Comment } from '@/database/model/comment';
import { Visitor } from '@/database/model/visitor';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';

const isEmail = (email: string) => {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email);
};

export class CommentController {
    // 添加评论
    static async insertComment(req: Request, res: Response) {
        try {
            // TODO 数据格式验证
            const { nickname, email, website, target, type, parent, content } = req.body;

            // 判断昵称和邮箱是否为空
            if (isEmpty(nickname) || isEmpty(email)) {
                return res.status(400).json({ ok: false, error: '昵称和邮箱不能为空' });
            } else if (!isEmail(email)) {
                return res.status(400).json({ ok: false, error: '邮箱格式不正确' });
            }

            // 判断访客是否存在
            let visitor = await Visitor.findOne({
                $or: [{ nickname: nickname.trim() }, { email: email.trim() }]
            }).select('_id nickname email gender avatar');

            // 访客系统不能被前端感知，所以需要后端自动创建访客

            // 如果访客不存在，则创建访客
            if (!visitor || !visitor?._id) {
                visitor = await Visitor.create({ nickname, email, website });
            }

            // 判断评论对象和评论对象类型是否为空
            if (isEmpty(target) || type < 1) {
                return res.status(400).json({ ok: false, error: '评论对象和评论对象类型不能为空' });
            } else if (isEmpty(content)) {
                return res.status(400).json({ error: '评论内容不能为空' });
            } else if (type === 3 && isEmpty(parent)) {
                return res.status(400).json({ error: '回复评论时，父评论不能为空' });
            }

            // 创建评论
            const comment = await Comment.create({
                visitor: visitor._id,
                target,
                type,
                content,
                parent
            });

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
    // 获取评论列表
    static async getComments(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { page = 1, pre_page = 10 } = req.query;
            if (isEmpty(id)) {
                return res.status(400).json({ error: '评论对象ID不能为空' });
            }

            const comments = await Comment.find({ target: id })
                .select('-__v -target')
                .populate({
                    path: 'visitor',
                    select: '_id nickname website avatar createdAt'
                })
                .sort({ createdAt: -1 })
                .lean(); // lean() 方法将 Mongoose 文档转换为普通 JavaScript 对象

            const tree = comments
                .filter((comment) => !comment.parent?.toString())
                .map((comment) => {
                    const children = comments.filter(
                        (c) => c.parent?.toString() === comment._id?.toString()
                    );
                    return { ...comment, children };
                });

            res.json({
                ok: true,
                data: tree,
                message: '获取评论列表成功！'
            });
        } catch (error) {
            logger.error('获取评论列表失败：', error);
            res.status(500).json({ error: '获取评论列表失败，服务器错误' });
        }
    }
}
