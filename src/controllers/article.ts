import { Request, Response } from 'express';

import { Article } from '@/database/model/article';
import { logger } from '@/utils/logger';
import { isEmpty } from '@/utils/verify';

export class ArticleControler {
    // 创建文章
    static async createArticle(req: Request, res: Response) {
        const data = req.body;
        const article = await Article.create(data);
        res.json({
            ok: true,
            code: 1,
            data: article,
            message: '文章创建成功！'
        });
    }
    // 删除文章
    static async deleteArticle(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (isEmpty(id)) return res.status(400).json({ error: '文章 ID 不能为空' });
            const article = await Article.findByIdAndUpdate(id, {
                isDelete: true
            }).exec();
            if (!article) return res.status(404).json({ error: '文章未找到' });
            res.json({ ok: true, code: 1, message: '文章删除成功！' });
        } catch (error) {
            logger.error('文章删除失败：', error);
            res.status(500).json({ error: '文章删除失败，服务器错误' });
        }
    }
    // 更新文章
    static async updateArticle(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = req.body;
            if (isEmpty(id)) return res.status(400).json({ error: '文章 ID 不能为空' });
            const article = await Article.findByIdAndUpdate(id, data, { new: true }).exec();
            if (!article) return res.status(404).json({ error: '文章未找到' });
            res.json({ ok: true, code: 1, data: article, message: '文章更新成功！' });
        } catch (error) {
            logger.error('文章更新失败：', error);
            res.status(500).json({ error: '文章更新失败，服务器错误' });
        }
    }
    // 获取文章列表
    static async getArticles(req: Request, res: Response) {
        try {
            const { page, pre_page } = req.query;
            // prettier-ignore
            const articles = await Article.find({}, { content: 0 }) .sort({ createdAt: -1 }) .exec();
            res.json({
                ok: true,
                code: 1,
                data: articles,
                total: articles.length,
                page,
                pre_page,
                message: '获取文章列表成功！'
            });
        } catch (error) {
            logger.error('获取文章列表失败', error);
            res.status(500).json({ error: '获取文章列表失败，服务器错误' });
        }
    }
    // 获取文章详情
    static async getArticle(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (isEmpty(id)) return res.status(400).json({ error: '文章 ID 不能为空' });
            const article = await Article.findByIdAndUpdate(
                id,
                { $inc: { views: 1 } },
                { new: true }
            ).exec();
            if (!article) return res.status(404).json({ error: '文章未找到' });
            res.json({
                ok: true,
                code: 1,
                data: article,
                message: '文章获取成功！'
            });
        } catch (error) {
            logger.error('文章获取失败：', error);
            res.status(500).json({ error: '文章获取失败，服务器错误' });
        }
    }
    // 点赞文章
    static async likeArticle(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (isEmpty(id)) return res.status(400).json({ error: '文章 ID 不能为空' });
            const article = await Article.findByIdAndUpdate(
                id,
                { $inc: { likes: 1 } },
                { new: true }
            );
            if (!article) return res.status(404).json({ error: '文章未找到' });
            res.json({ likes: article.likes });
        } catch (error) {
            logger.error('点赞失败，', error);
            res.status(500).json({ error: '点赞失败，服务器错误' });
        }
    }
}
