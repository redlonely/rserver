import { Request, Response } from 'express';

import { Tag } from '@/database/model/tag';
import { logger } from '@/utils/logger';
import { isEmpty } from 'lodash';

export class TagController {
    // 创建标签
    public static async createTag(req: Request, res: Response) {
        try {
            const { name, description } = req.body;
            if (isEmpty(name)) {
                return res.json({ ok: false, message: '标签名不能为空' });
            }
            const tag = await Tag.create({ name, description });
            res.json({
                ok: true,
                data: tag,
                message: '创建标签成功'
            });
        } catch (error) {
            logger.error('标签创建失败：', error);
            res.json({ ok: false, message: '标签创建失败' });
        }
    }
    // 删除标签
    public static async deleteTag(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (isEmpty(id)) {
                return res.json({ ok: false, message: '标签ID不能为空' });
            }
            const tag = await Tag.findByIdAndDelete(id);
            if (!tag) {
                return res.json({ ok: false, message: '标签不存在' });
            }
            res.json({ ok: true, message: '标签删除成功' });
        } catch (error) {
            logger.error('标签删除失败：', error);
            res.json({ ok: false, message: '标签删除失败' });
        }
    }
    // 获取标签列表
    public static async getTags(req: Request, res: Response) {
        const { page = 1, pre_page = 10 } = req.query;
        const tags = await Tag.find({})
            .select('_id name description createdAt updatedAt')
            .limit(+pre_page)
            .skip((+page - 1) * +pre_page);
        res.json({
            ok: true,
            data: tags,
            total: +tags.length,
            message: '获取标签列表成功'
        });
    }
}
