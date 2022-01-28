import { ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server-express';
import { GraphQLField } from 'graphql';
import * as jwt from 'jsonwebtoken';
import Admin from '../../models/Admin';
import User from '../../models/User';
import { Context, Role } from '../../types/Apollo.type';

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: GraphQLField<any, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): GraphQLField<any, any> | void | null {
    const { requires } = this.args;
    const { resolve } = field;
    // eslint-disable-next-line no-param-reassign
    field.resolve = async function resolveFn(...args) {
      const context: Context = args[2];
      if (!context.token) {
        throw new ForbiddenError('Invalid token');
      }
      // DECODE TOKEN
      let decoded = null;
      try {
        decoded = jwt.verify(context.token, process.env.JWT_SECRET);
      } catch {
        throw new ForbiddenError('Invalid token');
      }
      if (!decoded) {
        throw new ForbiddenError('Invalid token');
      }
      // USER or ADMIN
      const user = await User.findOne({ _id: decoded.userId });
      if (requires === Role.USER && !user) {
        throw new ForbiddenError("The access can't be granted");
      }
      const admin = await Admin.findOne({ _id: decoded.adminId });
      if (requires === Role.ADMIN && !admin) {
        throw new ForbiddenError("The access can't be granted");
      }
      if (requires === Role.USER) {
        context.user = user;
      }
      if (requires === Role.ADMIN) {
        context.user = admin;
      }
      return resolve.apply(this, args);
    };
    return field;
  }
}
