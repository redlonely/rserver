import { Request, Response } from 'express';

import { ArticleService } from '@/services/article';

export class ArticleControler {
    static async getArticles(req: Request, res: Response) {
        const articles = await ArticleService.getArticles();
        res.json({
            ok: true,
            message: '文章列表获取成功！',
            data: articles
        });
    }
}
