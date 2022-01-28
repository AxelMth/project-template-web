/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentNode } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  ApolloError,
  MutationHookOptions,
  OperationVariables,
  QueryHookOptions,
} from '@apollo/client';

export type ApolloDocument =
  | DocumentNode
  | TypedDocumentNode<any, OperationVariables>;
export type ApolloMutationHookOptions = MutationHookOptions<any, any>;
export type ApolloQueryHookOptions = QueryHookOptions<any, any>;
export type ApolloCustomError = ApolloError | undefined;
/* eslint-enable @typescript-eslint/no-explicit-any */
