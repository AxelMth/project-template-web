import * as Mongoose from 'mongoose';
import { Admin } from '../../shared/Admin.type';

interface MongooseAdmin extends Admin, Mongoose.Document {}
export const AdminSchema = new Mongoose.Schema(
  {
    email: { type: String, required: true },
    projects: [{ type: String, required: true }],
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    registeredAt: { type: Number, required: true },
  },
  { collection: 'admin' },
);

export default Mongoose.model<MongooseAdmin>('Admin', AdminSchema);
