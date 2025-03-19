import mongoose, { Document, Schema } from 'mongoose';

interface ITag extends Document {
    name: string;
    description: string;
}

const TagSchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, default: '' }
    },
    { timestamps: true }
);

const Tag = mongoose.model<ITag>('Tag', TagSchema);

export { ITag, Tag, TagSchema };
