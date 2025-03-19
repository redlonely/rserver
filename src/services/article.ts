import { Article } from '@/database/model/article';
import { logger } from '../utils/logger';

export class ArticleService {
    static async getArticles() {
        try {
            const articles = await Article.find().sort({ createdAt: -1 }).exec();
            return articles;
        } catch (error) {
            logger.error('ArticleService.getArticles', error);
            return [];
        }
    }
    static async create(article: any) {
        try {
            const newArticle = await article.create(article);
            console.log(newArticle);
            return newArticle;
        } catch (error) {
            logger.error('ArticleService.create', error);
            return null;
        }
    }
}
