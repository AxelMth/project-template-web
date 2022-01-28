import { gql } from 'apollo-server-express';
import DocumentModel from '../../models/Document';
import { Document, DocumentStatus } from '../../../shared/Document.type';
import { Id } from '../../../shared/Extension.type';
import { Context } from '../../types/Apollo.type';

export const documentTypeDef = gql`
  input DocumentInput {
    name: String!
    url: String!
  }
  type Document {
    _id: ID!
    name: String!
    url: String!
    version: Int!
  }
  extend type Query {
    # CRUD Operations
    documents: [Document!]! @accessProject @auth
  }
  extend type Mutation {
    # CRUD Operations
    createDocument(document: DocumentInput!): Document! @accessProject @auth
    deleteDocument(documentId: ID!): ID! @accessProject @auth
    # Custom Operations
  }
`;

export const documentResolver = {};

export const documentQueryResolver = {
  documents: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    __,
    { projects }: Context,
  ): Promise<(Document & Id)[]> => {
    return JSON.parse(
      JSON.stringify(
        await DocumentModel.find({
          project: projects,
        }),
      ),
    );
  },
};

export const documentMutationResolver = {
  createDocument: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    { document }: { document: { name: string } },
    { projects }: Context,
  ): Promise<Document & Id> => {
    const newDocument = new DocumentModel({
      ...document,
      version: 1,
      status: DocumentStatus.WAITING_FOR_VALIDATION,
    });
    const createdDocument = await newDocument.save();
    return createdDocument;
  },
  deleteDocument: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    { documentId }: { documentId: string },
    { projects }: Context,
  ): Promise<Id> => {
    await DocumentModel.deleteOne({
      _id: documentId,
    });
    return JSON.parse(JSON.stringify(documentId));
  },
};
