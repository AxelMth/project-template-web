import * as Mongoose from 'mongoose';
import { Document } from '../../shared/Document.type';

interface MongooseDocument extends Document, Mongoose.Document {}
const DocumentSchema = new Mongoose.Schema(
  {
    project: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    version: { type: Number, required: true },
    status: { type: String, required: true },
    validators: Array,
  },
  { collection: 'document' },
);

export default Mongoose.model<MongooseDocument>('Document', DocumentSchema);
