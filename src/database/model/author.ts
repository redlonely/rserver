import mongoose, { Schema } from 'mongoose';

// prettier-ignore
enum Gender {
    secret = 0,
    male   = 1,
    female = 2
}

// prettier-ignore
interface IAuthor {
    nickname    : string;  // 作者名
    email       : string;  // 邮箱
    website     : string;  // 个人网站
    avatar      : string;  // 头像
    slogan      : string;  // 个性签名
    gender      : number;  // 性别
    createdAt   : Date;    // 创建时间
    updatedAt   : Date;    // 更新时间
}

// prettier-ignore
const AuthorSchema = new Schema<IAuthor>(
    {
        nickname: { type: String, required: true },
        email   : { type: String, required: true },
        website : { type: String, default: '' },
        avatar  : { type: String, default: '' },
        slogan  : { type: String, default: '' },
        gender  : { type: Number, default: Gender.secret }
    },
    { timestamps: true }
);

AuthorSchema.pre<IAuthor>('save', function (next) {
    this.createdAt ? (this.updatedAt = new Date()) : (this.createdAt = this.updatedAt = new Date());
    next();
});

const Author = mongoose.model<IAuthor>('Author', AuthorSchema);

export { Author, AuthorSchema, IAuthor };
