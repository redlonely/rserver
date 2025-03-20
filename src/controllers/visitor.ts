import { Request, Response } from 'express';

import { Visitor } from '@/database/model/visitor';
import { isEmpty } from 'lodash';

export class VisitorControler {
    // 创建访客记录
    static async createVisitor(req: Request, res: Response) {
        const { nickname, email, ...data } = req.body;
        if (isEmpty(nickname) || isEmpty(email)) {
            return res.status(400).json({
                message: '昵称和邮箱不能为空'
            });
        }
        // 判断邮箱是否已存在
        const visitorEmail = await Visitor.findOne({ email });
        if (visitorEmail) {
            return res.status(400).json({
                message: '邮箱已存在'
            });
        }
        const visitor = await Visitor.create({ nickname, email, ...data });
        if (!visitor) {
            return res.status(500).json({
                message: '创建访客记录失败'
            });
        }
        res.json({
            ok: true,
            code: 1,
            message: '访问记录添加成功',
            data: visitor
        });
    }
    // 删除访客记录
    static async deleteVisitor(req: Request, res: Response) {
        const { id } = req.params;
        if (isEmpty(id)) {
            return res.status(400).json({
                message: '访客记录ID不能为空'
            });
        }
        const visitor = await Visitor.findByIdAndDelete(id);
        if (!visitor) {
            return res.status(404).json({
                message: '访客记录不存在'
            });
        }
        res.json({
            ok: true,
            code: 1,
            message: '访问记录删除成功',
            data: visitor
        });
    }
    // 获取访客记录列表
    static async getVisitors(req: Request, res: Response) {
        const { page = 1, pre_page = 10 } = req.query;
        const visitors = await Visitor.find({})
            .select('-__v')
            .sort({ createdAt: -1 })
            .limit(Number(pre_page))
            .skip(Number(pre_page) * (Number(page) - 1));
        res.json({
            ok: true,
            code: 1,
            message: '访问记录列表获取成功',
            data: visitors,
            total: +visitors.length,
            page: +page,
            pre_page: +pre_page
        });
    }
    // 判断访客是否存在
    static async isVisitor(req: Request, res: Response) {
        const { nickname = '', email = '' } = req.query;
        // 使用 trim 处理空白字符并验证参数
        // if (!nickname?.trim()) {
        //     return res.status(400).json({
        //         ok: false,
        //         code: 'INVALID_NICKNAME',
        //         message: '昵称不能为空'
        //     });
        // }
        // if (!email?.trim()) {
        //     return res.status(400).json({
        //         ok: false,
        //         code: 'INVALID_EMAIL',
        //         message: '邮箱不能为空'
        //     });
        // }

        // try {
        //     // 使用单一查询同时检查昵称和邮箱
        //     const existingVisitor = await Visitor.findOne({
        //         $or: [{ nickname: nickname.trim() }, { email: email.trim() }]
        //     });

        //     if (!existingVisitor) {
        //         return res.json({
        //             ok: true,
        //             code: 'VISITOR_NOT_FOUND',
        //             message: '访客不存在'
        //         });
        //     }

        //     // 优先返回昵称冲突
        //     if (existingVisitor.nickname === nickname.trim()) {
        //         return res.status(409).json({
        //             ok: false,
        //             code: 'NICKNAME_EXISTS',
        //             message: '昵称已存在'
        //         });
        //     }

        //     // 返回邮箱冲突
        //     return res.status(409).json({
        //         ok: false,
        //         code: 'EMAIL_EXISTS',
        //         message: '邮箱已存在'
        //     });
        // } catch (error) {
        //     console.error('检查访客时出错:', error);
        //     return res.status(500).json({
        //         ok: false,
        //         code: 'SERVER_ERROR',
        //         message: '服务器内部错误'
        //     });
        // }
    }
}
