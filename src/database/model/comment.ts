import mongoose, { Schema } from 'mongoose';
import { IAuthor } from './author';

// prettier-ignore
// 评论对象类型
enum CommentType {
    Artile  = 1,   // 文章
    Comment = 2,   // 评论
    Reply   = 3,   // 回复
    Post    = 4    // 动态
}

// prettier-ignore
interface IComment  {
    author   : IAuthor;                  // 作者
    target   : mongoose.Types.ObjectId;  // 评论对象
    type     : CommentType;              // 评论对象类型
    parent   : mongoose.Types.ObjectId;  // 父评论
    content  : string;                   // 内容
    likes    : number;                   // 点赞数
    createdAt: Date;                     // 创建时间
    updatedAt: Date;                     // 更新时间
}

// prettier-ignore
const CommentSchema = new Schema<IComment>(
    {
        author : { type: Schema.Types.ObjectId, ref: 'Author', required: true },
        target : { type: Schema.Types.ObjectId, ref: 'Article', required: true },
        type   : { type: Number, enum: CommentType, required: true },
        parent : { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
        content: { type: String, required: true },
        likes  : { type: Number, default: 0 }
    },
    { timestamps: true }
);

CommentSchema.pre<IComment>('save', function (next) {
    this.createdAt ? (this.updatedAt = new Date()) : (this.createdAt = this.updatedAt = new Date());
    next();
});

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export { Comment, CommentSchema, IComment };
