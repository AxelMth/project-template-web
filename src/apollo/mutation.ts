import { gql } from '@apollo/client';

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String!
    $city: String
    $startDate: String
    $endDate: String
    $description: String
    $client: String
    $clientAdviser: String
  ) {
    updateProject(
      id: $id
      project: {
        name: $name
        city: $city
        startDate: $startDate
        endDate: $endDate
        description: $description
        client: $client
        clientAdviser: $clientAdviser
      }
    ) {
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

export const CHANGE_ADMIN_PASSWORD = gql`
  mutation ChangeAdminPassword($oldPassword: String!, $newPassword: String!) {
    changeAdminPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      _id
    }
  }
`;
export const CHANGE_ADMIN_INFOS = gql`
  mutation ChangeAdminInfos($firstname: String!, $lastname: String!) {
    changeAdminInfos(firstname: $firstname, lastname: $lastname) {
      _id
    }
  }
`;
export const CHANGE_ADMIN_CONTACT_INFOS = gql`
  mutation ChangeAdminContactInfos($email: String!) {
    changeAdminContactInfos(email: $email) {
      _id
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $job: String!
    $phone: String!
    $company: String!
    $contextualJob: String
    $fixedLinePhone: String
    $fax: String
  ) {
    createUser(
      user: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        company: $company
        job: $job
        contextualJob: $contextualJob
        phone: $phone
        fixedLinePhone: $fixedLinePhone
        fax: $fax
      }
    ) {
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
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation CreateGroup($name: String!, $description: String) {
    createGroup(group: { name: $name, description: $description }) {
      _id
    }
  }
`;

export const CREATE_DOCUMENT = gql`
  mutation CreateDocument(
    $name: String!
    $url: String!
    $validators: [String!]
  ) {
    createDocument(
      document: { name: $name, url: $url, validators: $validators }
    ) {
      _id
    }
  }
`;

export const CHANGE_GROUP_COLOR = gql`
  mutation ChangeGroupColor($groupId: ID!, $color: String!) {
    changeGroupColor(groupId: $groupId, color: $color) {
      _id
    }
  }
`;

export const DELETE_GROUP = gql`
  mutation DeleteGroup($groupId: ID!) {
    deleteGroup(groupId: $groupId)
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation DeleteDocument($documentId: ID!) {
    deleteDocument(documentId: $documentId)
  }
`;

export const REMOVE_USER_FROM_GROUP = gql`
  mutation RemoveUserFromGroup($groupId: ID!, $userIds: [ID!]!) {
    removeUserFromGroup(groupId: $groupId, userIds: $userIds) {
      _id
    }
  }
`;

export const RESEND_EMAIL_TO_USER = gql`
  mutation ResendEmailToUser($userId: ID!) {
    resendEmailToUser(userId: $userId) {
      _id
    }
  }
`;

export const ADD_USER_TO_GROUP = gql`
  mutation AddUserToGroup($groupId: ID!, $userIds: [ID!]!) {
    addUserToGroup(groupId: $groupId, userIds: $userIds) {
      _id
    }
  }
`;
export const SET_GROUP_NAME = gql`
  mutation SetGroupName($groupId: ID!, $name: String!) {
    setGroupName(groupId: $groupId, name: $name) {
      _id
      name
    }
  }
`;

export const SET_GROUP_DESCRIPTION = gql`
  mutation SetGroupDescription($groupId: ID!, $description: String!) {
    setGroupDescription(groupId: $groupId, description: $description) {
      _id
      description
    }
  }
`;

export const ADMIN_LOGIN = gql`
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password) {
      token
    }
  }
`;

export const USER_LOGIN = gql`
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
    }
  }
`;
