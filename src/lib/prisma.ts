import { PrismaClient } from '@prisma/client';

// 声明全局变量以防止热重载时创建多个实例
declare global {
    var prisma: PrismaClient | undefined;
}

class Prisma {
    // 单例实例
    private static instance: PrismaClient;
    // 私有化构造
    private constructor() {}
    // 单例模式
    public static getInstance(): PrismaClient {
        if (!Prisma.instance) {
            Prisma.instance = new PrismaClient();
        }
        return Prisma.instance;
    }
}
export const prisma = Prisma.getInstance();

global.prisma = prisma;
