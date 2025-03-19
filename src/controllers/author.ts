import { Author } from '@/database/model/author';
import { logger } from '@/utils/logger';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';

export class AuthorController {
    // 添加作者
    static async insertAuthor(req: Request, res: Response) {
        try {
            const { nickname, email, ...othor } = req.body;
            if (isEmpty(nickname)) {
                return res.status(400).json({ error: '昵称不能为空' });
            } else if (isEmpty(email)) {
                return res.status(400).json({ error: '邮箱不能为空' });
            }
            const author = await Author.create({ nickname, email, ...othor });
            res.json({
                ok: true,
                code: 1,
                data: author,
                message: '作者添加成功！'
            });
        } catch (error) {
            logger.error('添加作者失败：', error);
            res.status(500).json({ error: '添加作者失败，服务器错误' });
        }
    }
    // 删除作者
    static async deleteAuthor(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (isEmpty(id)) {
                return res.status(400).json({ error: '作者ID不能为空' });
            }
            const author = await Author.findByIdAndDelete(id);
            if (!author) {
                return res.status(404).json({ error: '作者不存在' });
            }
            res.json({
                ok: true,
                code: 1,
                data: author,
                message: '删除作者成功！'
            });
        } catch (error) {
            logger.error('删除作者失败：', error);
            res.status(500).json({ error: '删除作者失败，服务器错误' });
        }
    }
    // 更新作者
    static async updateAuthor(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            if (isEmpty(id)) {
                return res.status(400).json({ error: '作者ID不能为空' });
            }
            const author = await Author.findByIdAndUpdate(id, data, { new: true });
            if (!author) {
                return res.status(404).json({ error: '作者不存在' });
            }
            res.json({
                ok: true,
                code: 1,
                data: author,
                message: '更新作者成功！'
            });
        } catch (error) {
            logger.error('更新作者失败：', error);
            res.status(500).json({ error: '更新作者失败，服务器错误' });
        }
    }
    // 获取作者列表
    static async getAuthors(req: Request, res: Response) {
        try {
            const { page = 1, pre_page = 10 } = req.query;
            // prettier-ignore
            const authors = await Author.find() .skip((+page - 1) * +pre_page) .limit(+pre_page);
            res.json({
                ok: true,
                code: 1,
                data: authors,
                page,
                pre_page,
                total: +authors.length,
                message: '获取作者列表成功！'
            });
        } catch (error) {
            logger.error('获取作者列表失败：', error);
            res.status(500).json({ error: '获取作者列表失败，服务器错误' });
        }
    }
}
