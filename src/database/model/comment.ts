import mongoose, { Document, Schema } from 'mongoose';
import { IAuthor } from './author';

interface IComment extends Document {
    author: IAuthor;
    articleId: mongoose.Types.ObjectId;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
        articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
        comment: { type: String, required: true }
    },
    { timestamps: true }
);

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export { Comment, CommentSchema, IComment };
