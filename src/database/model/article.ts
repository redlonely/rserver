import { Document, model, Schema } from 'mongoose';
import { IAuthor } from './author';
import { ITag } from './tag';

export enum ArticleStatus {
    PENDING = 0,
    PUBLISHED = 1,
    DRAFT = 2,
    DELETED = 3
}

// prettier-ignore
interface IArticle extends Document {
    author   : IAuthor;        // 作者
    title    : string;         // 标题
    cover    : string;         // 封面
    tags     : ITag[];         // 标签
    summary  : string;         // 摘要
    content  : string;         // 内容
    likes    : number;         // 点赞数
    views    : number;         // 浏览数
    status   : ArticleStatus;  // 状态 0: 待审核 1: 发布 2: 草稿 3: 删除
    createdAt: Date;           // 创建时间
    updatedAt: Date;           // 更新时间
}

// prettier-ignore
const ArticleSchema: Schema = new Schema(
    {
        author  : { type: Schema.Types.ObjectId, ref: 'Author', required: true },
        tags    : [{ type: Schema.Types.ObjectId, ref: 'Tag', default: [] }],
        title   : { type: String, required: true },
        cover   : { type: String, required: true },
        summary : { type: String, required: true },
        content : { type: String, required: true },
        likes   : { type: Number, default: 0 },
        views   : { type: Number, default: 0 },
        status  : { type: Number, enum: ArticleStatus, default: ArticleStatus.PENDING },
    },
    { timestamps: true }
);

ArticleSchema.pre('save', function (next) {
    this.createdAt ? (this.updatedAt = new Date()) : (this.createdAt = this.updatedAt = new Date());
    next();
});

export const Article = model<IArticle>('Article', ArticleSchema);
export { IArticle };
