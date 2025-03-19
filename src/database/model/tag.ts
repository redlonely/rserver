import mongoose, { Document, Schema } from 'mongoose';

// prettier-ignore
interface ITag extends Document {
    name       : string; // 标签名
    description: string; // 描述
    createdAt  : Date;   
    updatedAt  : Date;
}

const TagSchema = new Schema<ITag>(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, default: '' }
    },
    { timestamps: true }
);

TagSchema.pre<ITag>('save', function (next) {
    this.createdAt ? (this.updatedAt = new Date()) : (this.createdAt = this.updatedAt = new Date());
    next();
});

const Tag = mongoose.model<ITag>('Tag', TagSchema);

export { ITag, Tag, TagSchema };
