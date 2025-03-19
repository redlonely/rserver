import { model, Schema } from 'mongoose';

interface IVisit {
    ip: string;
    userAgent: string;
}

const VisitSchema: Schema = new Schema(
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
