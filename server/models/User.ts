import * as Mongoose from 'mongoose';
import { User } from '../../shared/User.type';

interface MongooseUser extends User, Mongoose.Document {}
export const UserSchema = new Mongoose.Schema(
  {
    email: { type: String, required: true },
    projects: { type: Array, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    job: { type: String, required: true },
    phone: { type: String, required: true },
    contextualJob: String,
    company: String,
    fixedLinePhone: String,
    fax: String,
    salt: { type: String, required: true },
    registeredAt: { type: Number, required: true },
    hasEmailActivated: { type: Boolean, required: true, default: false },
    hasSubscribedToNewsletter: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasAgreedToTermsOfService: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { collection: 'user' },
);

export default Mongoose.model<MongooseUser>('User', UserSchema);
