import { model, Schema } from 'mongoose';

interface IVisit {
    ip: string;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}

const VisitSchema = new Schema<IVisit>(
    {
        ip: String,
        userAgent: String
    },
    {
        timestamps: true
    }
);

const Visit = model<IVisit>('Visit', VisitSchema);

export { IVisit, Visit, VisitSchema };
