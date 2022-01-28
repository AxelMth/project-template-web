import { gql } from 'apollo-server-express';
import { Admin } from '../../../shared/Admin.type';
import { User } from '../../../shared/User.type';
import { Context } from '../../types/Apollo.type';

export const authTypeDef = gql`
  type Auth {
    token: String
  }
  union AuthenticatedUser = User | Admin
  extend type Query {
    me: AuthenticatedUser! @auth
  }
`;

export const authenticatedUserResolver = {
  __resolveType(obj: User | Admin): string | null {
    if ((obj as User).phone) {
      return 'User';
    }
    if ((obj as Admin).email) {
      return 'Admin';
    }
    return null;
  },
};
export const authResolver = {};
export const authQueryResolver = {
  me: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    args,
    { user }: Context,
  ): Promise<User | Admin> => {
    return user;
  },
};
export const authMutationResolver = {};
