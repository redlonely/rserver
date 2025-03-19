import { Document, model, Schema } from 'mongoose';
import { IAuthor } from './author';
import { IComment } from './comment';
import { ITag } from './tag';

// prettier-ignore
interface IArticle extends Document {
    title    : string;      // 标题
    cover    : string;      // 封面
    author   : IAuthor;     // 作者
    tags     : ITag[];      // 标签
    summary  : string;      // 摘要
    content  : string;      // 内容
    comments : IComment[];  // 评论
    likes    : number;      // 点赞数
    views    : number;      // 浏览数
    createdAt: Date;        // 创建时间
    updatedAt: Date;        // 更新时间
}

// prettier-ignore
const ArticleSchema: Schema = new Schema(
    {
        title   : { type: String, required: true },
        cover   : { type: String, required: true },
        summary : { type: String, required: true },
        content : { type: String, required: true },
        likes   : { type: Number, default: 0 },
        views   : { type: Number, default: 0 },
        author  : { type: Schema.Types.ObjectId, ref: 'Author' },
        tags    : [{ type: Schema.Types.ObjectId, ref: 'Tag', default: []  }],
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }]
    },
    { timestamps: true }
);

ArticleSchema.pre('save', function (next) {
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
    next();
});

export const Article = model<IArticle>('Article', ArticleSchema);
export { IArticle };
