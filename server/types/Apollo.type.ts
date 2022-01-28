import { Id } from '../../shared/Extension.type';
import { Admin } from '../../shared/Admin.type';
import { User } from '../../shared/User.type';

export type Context = {
  token: string;
  user?: (User & Id) | (Admin & Id);
};

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  UNKNOWN = 'UNKNOWN',
}
