import { gql, UserInputError, ValidationError } from 'apollo-server-express';
import * as Bcrypt from 'bcryptjs';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import { isNullOrUndefined } from 'util';
import UserModel from '../../models/User';
import sendEmail, { isValidEmail } from '../../modules/email';
import { NotFoundError } from '../../errors';
import GroupModel from '../../models/Group';
import { getHashedRandomPassword } from '../../modules/password';
import { User } from '../../../shared/User.type';
import { Id } from '../../../shared/Extension.type';
import { Context } from '../../types/Apollo.type';

export const userTypeDef = gql`
  input UserInput {
    email: String!
    firstname: String!
    lastname: String!
    company: String!
    job: String!
    phone: String!
    contextualJob: String
    fax: String
    fixedLinePhone: String
  }
  type User {
    _id: ID!
    email: String!
    firstname: String!
    lastname: String!
    phone: String!
    registeredAt: Int!
    hasSubscribedToNewsletter: Boolean!
    hasAgreedToTermsOfService: Boolean!
  }
  extend type Query {
    # CRUD Operations
    users: [User!]! @accessProject @auth
  }
  extend type Mutation {
    # CRUD Operations
    createUser(user: UserInput!): User! @accessProject @auth
    deleteUser(userId: ID!): ID! @accessProject @auth
    # Custom Operations
    userLogin(email: String!, password: String!): Auth!
    changeUserPassword(
      userId: ID!
      oldPassword: String
      newPassword: String!
    ): User! @auth(requires: USER)
    resendEmailToUser(userId: ID!): User! @accessProject @auth
  }
`;

export const userResolver = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
};

export const userQueryResolver = {
  users: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    args,
    { projects }: Context,
  ): Promise<(User & Id)[]> => {
    return JSON.parse(
      JSON.stringify(
        await UserModel.find({
          projects,
        }),
      ),
    );
  },
};

export const userMutationResolver = {
  userLogin: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    { email, password }: { email: string; password: string },
  ): Promise<{ token: string; user: User & Id }> => {
    const user = await UserModel.findOne({ email });
    if (isNullOrUndefined(user)) {
      throw new NotFoundError('User was not found');
    }
    const isPasswordCorrect = Bcrypt.compareSync(password, user.password);
    if (isPasswordCorrect === false) {
      throw new ValidationError('Incorrect email or password');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return { token, user: JSON.parse(JSON.stringify(user)) };
  },
  createUser: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    { user }: { user: User },
    { projects }: Context,
  ): Promise<User & Id> => {
    if (isValidEmail(user.email) === false) {
      throw new ValidationError('Email provided is not valid');
    }
    const isEmailUsed = !isNullOrUndefined(
      await UserModel.findOne({ email: user.email }),
    );
    if (isEmailUsed) {
      throw new UserInputError('Email already in use');
    }
    const { salt, password, encryptedPassword } = getHashedRandomPassword();
    const newUser = JSON.parse(JSON.stringify(user));
    newUser.password = encryptedPassword;
    newUser.salt = salt;
    newUser.registeredAt = moment().unix();
    newUser.projects = projects;
    let createdUser = new UserModel(newUser);
    await createdUser.save();
    createdUser = await UserModel.findOne({ email: user.email });
    const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET);
    // TODO: Use template here
    await sendEmail({
      to: newUser.email,
      subject: 'Email validation from GEN-AD',
      html: `<h3>Hey! Just click the link below!</h3>
      <p>Vos informations de connexion:</p>
      <p>${password}</p>
      <p>To activate your account, please click the link bellow:</p>
      <a href="http://localhost:4000/validate-email?token=${token}">http://localhost:4000/validate-email?token=${token}</a>`,
    });
    if (newUser.hasSubscribedToNewsletter === true) {
      // TODO: AddSub(newUser);
      // Do some logic if he ends up subscribing :3
    }
    return JSON.parse(JSON.stringify(createdUser));
  },
  deleteUser: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    { userId }: { userId: string },
    { projects }: Context,
  ): Promise<Id> => {
    await UserModel.deleteOne({
      _id: userId,
      projects,
    });
    return JSON.parse(JSON.stringify(userId));
  },
  resendEmailToUser: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    { userId }: { userId: string },
    { projects }: Context,
  ): Promise<Id> => {
    const user = await UserModel.findOne({ _id: userId, projects });
    if (isNullOrUndefined(user)) {
      throw new NotFoundError('User was not found');
    }
    const { salt, password, encryptedPassword } = getHashedRandomPassword();
    user.password = encryptedPassword;
    user.salt = salt;
    await UserModel.updateOne(
      {
        _id: user._id,
      },
      user,
    );
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // TODO: Use template here
    await sendEmail({
      to: user.email,
      subject: 'Email validation from GEN-AD',
      html: `<h3>Hey! Just click the link below!</h3>
      <p>Vos informations de connexion:</p>
      <p>${password}</p>
      <p>To activate your account, please click the link bellow:</p>
      <a href="http://localhost:4000/validate-email?token=${token}">http://localhost:4000/validate-email?token=${token}</a>`,
    });
    return JSON.parse(JSON.stringify(user));
  },
};
