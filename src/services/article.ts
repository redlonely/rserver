import { prisma } from '@/lib/prisma';
import { logger } from '../utils/logger';

export class ArticleService {
    static async getArticles() {
        try {
            const articles = await prisma.article.findMany();
            return articles;
        } catch (error) {
            logger.error('ArticleService.getArticles', error);
            return [];
        }
    }
}
