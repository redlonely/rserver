import mongoose, { Document, Schema } from 'mongoose';

interface IAuthor extends Document {
    name: string; // 作者名
    avatar: string; // 头像
    gender: string; // 性别
    introduction: string; // 介绍
}

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        avatar: { type: String, default: '' },
        gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
        introduction: { type: String, default: '' }
    },
    { timestamps: true }
);

const Author = mongoose.model<IAuthor>('Author', AuthorSchema);

export { Author, AuthorSchema, IAuthor };
