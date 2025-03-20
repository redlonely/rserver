import mongoose, { Schema } from 'mongoose';

// 朋友圈
// prettier-ignore
interface IMoment{
    author   : Schema.Types.ObjectId;  // 作者
    location : string;                 // 位置
    content  : string;                 // 内容
    images   : string[];               // 图片
    createdAt: Date;                   // 创建时间
    updatedAt: Date;                   // 更新时间
}

const MomentSchema = new Schema<IMoment>(
    {
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        location: { type: String, default: '' },
        content: { type: String, required: true },
        images: { type: [String], validate: [(v: string[]) => v.length <= 9, '最多上传九张图片'] }
    },
    { timestamps: true }
);

MomentSchema.pre<IMoment>('save', function (next) {
    this.createdAt ? (this.updatedAt = new Date()) : (this.createdAt = this.updatedAt = new Date());
    next();
});

const Moment = mongoose.model<IMoment>('Moment', MomentSchema);

export { IMoment, Moment, MomentSchema };
