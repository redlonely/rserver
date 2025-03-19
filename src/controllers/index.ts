import { Request, Response } from 'express';

import { Visit } from '@/database/model/visit';

export class BaseControler {
    // 访问记录
    static async createVisit(req: Request, res: Response) {
        const data = req.body;
        // 获取访问信息
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];
        await Visit.create({
            ip,
            userAgent,
            ...data
        });
        res.json({
            ok: true
        });
    }
}
