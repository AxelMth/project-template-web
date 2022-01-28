import { gql } from 'apollo-server-express';
import {
  adminTypeDef,
  adminQueryResolver,
  adminMutationResolver,
  adminResolver,
} from './admin';
import {
  userTypeDef,
  userResolver,
  userQueryResolver,
  userMutationResolver,
} from './user';
import {
  documentTypeDef,
  documentQueryResolver,
  documentMutationResolver,
  documentResolver,
} from './document';
import {
  authTypeDef,
  authenticatedUserResolver,
  authQueryResolver,
  authMutationResolver,
} from './auth';

export const resolvers = {
  Query: {
    ...authQueryResolver,
    ...userQueryResolver,
    ...adminQueryResolver,
    ...documentQueryResolver,
  },
  Mutation: {
    ...authMutationResolver,
    ...userMutationResolver,
    ...adminMutationResolver,
    ...documentMutationResolver,
  },
  User: userResolver,
  Admin: adminResolver,
  Document: documentResolver,
  AuthenticatedUser: authenticatedUserResolver,
};

const baseTypeDefs = gql`
  enum Role {
    ADMIN
    USER
    UNKNOWN
  }
  directive @auth(requires: Role = ADMIN) on FIELD_DEFINITION
  directive @accessProject on FIELD_DEFINITION
  # TODO: Find an other way to extend thoses types
  type Query {
    empty: ID!
  }
  # TODO: Find an other way to extend thoses types
  type Mutation {
    empty: ID!
  }
`;

export const typeDefs = [
  baseTypeDefs,
  authTypeDef,
  adminTypeDef,
  userTypeDef,
  documentTypeDef,
];
