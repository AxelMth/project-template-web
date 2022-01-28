import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      _id
      name
      city
      startDate
      endDate
      description
      client
      clientAdviser
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      firstname
      lastname
      email
      company
      job
      contextualJob
      phone
      fixedLinePhone
      fax
      groups {
        name
        color
      }
    }
  }
`;

export const GET_GROUPS = gql`
  query GetGroups {
    groups {
      _id
      name
      description
      color
      users {
        _id
      }
    }
  }
`;

export const GET_GROUP_BY_ID = gql`
  query GetGroupById($id: ID!) {
    group(id: $id) {
      _id
      name
      description
      users {
        _id
        firstname
        lastname
        email
        company
        job
        contextualJob
        phone
        fixedLinePhone
        fax
        groups {
          name
          color
        }
      }
    }
  }
`;

export const GET_DOCUMENTS = gql`
  query GetDocuments {
    documents {
      _id
      name
      version
      status
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      ...UserFields
      ...AdminFields
    }
  }
  fragment UserFields on User {
    firstname
    lastname
  }
  fragment AdminFields on Admin {
    firstname
    lastname
    email
  }
`;
