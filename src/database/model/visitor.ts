import { model, Schema } from 'mongoose';

// prettier-ignore
enum Gender {
    secret = 0,
    male   = 1,
    female = 2
}

// 访客表
// prettier-ignore
interface IVisitor {
    nickname : string; // 昵称
    email    : string; // 邮箱
    website  : string; // 网站
    avatar   : string; // 头像
    gender   : Gender; // 性别
    ip       : string; // IP
    userAgent: string; // 设备信息
    createdAt: Date;   // 创建时间
    updatedAt: Date;   // 更新时间
}

// prettier-ignore
const VisitorSchema = new Schema<IVisitor>(
    {
        nickname : { type: String, required: true , unique: true},
        email    : { type: String, required: true , unique: true },
        website  : { type: String, default: '' },
        avatar   : { type: String, default: '' },
        gender   : { type: Number, default: Gender.secret },
        ip       : { type: String, default: '' },
        userAgent: { type: String, default: '' }
    },
    {
        timestamps: true
    }
);

VisitorSchema.pre('save', function (next) {
    this.createdAt ? (this.updatedAt = new Date()) : (this.createdAt = this.updatedAt = new Date());
    next();
});

const Visitor = model<IVisitor>('Visitor', VisitorSchema);

export { IVisitor, Visitor, VisitorSchema };
