import { ApolloServer } from 'apollo-server-express';
import logger from '../modules/logger';
import { AuthDirective } from './directives/auth';
import { AccessProjectDirective } from './directives/accessProject';
import { typeDefs, resolvers } from './resolvers';

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token =
      (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[1]) ||
      '';
    return {
      token,
    };
  },
  playground: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
  formatError: (err) => {
    logger.error(err);
    return err;
  },
  schemaDirectives: {
    auth: AuthDirective,
  },
});
