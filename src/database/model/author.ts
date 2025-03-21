import mongoose, { Schema } from 'mongoose';

// prettier-ignore
enum Gender {
    secret = 0,
    male   = 1,
    female = 2
}

// prettier-ignore
interface IAuthor {
    nickname : string; // 昵称
    email    : string; // 邮箱
    website  : string; // 网站
    avatar   : string; // 头像
    gender   : Gender; // 性别
    slogan   : string; // 格言
    ip       : string; // IP
    userAgent: string; // 设备信息
    createdAt: Date;   // 创建时间
    updatedAt: Date;   // 更新时间
}

// prettier-ignore
const AuthorSchema = new Schema<IAuthor>(
    {
        nickname : { type: String, required: true , unique: true},
        email    : { type: String, required: true , unique: true },
        website  : { type: String, default: '' },
        avatar   : { type: String, default: '' },
        gender   : { type: Number, default: Gender.secret },
        ip       : { type: String, default: '' },
        userAgent: { type: String, default: '' }
    },
    { timestamps: true }
);

AuthorSchema.pre<IAuthor>('save', function (next) {
    this.createdAt ? (this.updatedAt = new Date()) : (this.createdAt = this.updatedAt = new Date());
    next();
});

const Author = mongoose.model<IAuthor>('Author', AuthorSchema);

export { Author, AuthorSchema, IAuthor };
