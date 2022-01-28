import { gql, UserInputError, ValidationError } from 'apollo-server-express';
import * as Bcrypt from 'bcryptjs';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { isNullOrUndefined } from 'util';
import AdminModel from '../../models/Admin';
import { Admin } from '../../../shared/Admin.type';
import { isValidEmail } from '../../modules/email';
import { NotFoundError } from '../../errors';
import Project from '../../models/Project';
import { Id } from '../../../shared/Extension.type';
import { Context } from '../../types/Apollo.type';

export const adminTypeDef = gql`
  input AdminInput {
    email: String!
    password: String!
    firstname: String!
    lastname: String!
  }
  type Admin {
    _id: ID!
    projects: [Project!]
    email: String!
    password: String!
    firstname: String!
    lastname: String!
  }
  extend type Query {
    # CRUD Operations
    admins: [Admin!]! @accessProject @auth
  }
  extend type Mutation {
    # CRUD Operations
    adminLogin(email: String!, password: String!): Auth!
    createAdmin(admin: AdminInput!, projects: [ID!]!): Admin!
      @auth(requires: SUPERADMIN)
    deleteAdmin(adminId: ID!): ID! @auth
    # Custom Operations
    addProjectToAdmin(adminId: ID!, projectId: ID!): Admin!
      @auth(requires: SUPERADMIN)
    changeAdminPassword(oldPassword: String!, newPassword: String!): Admin!
      @auth
    changeAdminInfos(firstname: String!, lastname: String!): Admin! @auth
    changeAdminContactInfos(email: String!): Admin! @auth
  }
`;

export const adminResolver = {};

export const adminQueryResolver = {
  admins: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    args,
    { projects }: Context,
  ): Promise<Admin & Id> => {
    return JSON.parse(
      JSON.stringify(
        await AdminModel.find({
          projects,
        }),
      ),
    );
  },
};

export const adminMutationResolver = {
  adminLogin: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    { email, password }: { email: string; password: string },
  ): Promise<{ token: string; user: Admin & Id }> => {
    const admin = await AdminModel.findOne({ email });
    if (isNullOrUndefined(admin)) {
      throw new NotFoundError('Admin was not found');
    }
    const isPasswordCorrect = Bcrypt.compareSync(password, admin.password);
    if (isPasswordCorrect === false) {
      throw new ValidationError('Incorrect email or password');
    }
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET);
    return { token, user: JSON.parse(JSON.stringify(admin)) };
  },
  createAdmin: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    { admin, projects }: { admin: Admin; projects: string[] },
  ): Promise<Admin & Id> => {
    const foundProjects = await Project.find({
      _id: projects.map((projectId) => Types.ObjectId(projectId)),
    });
    if (foundProjects.length === 0) {
      throw new NotFoundError('Projects were not found');
    }
    if (isValidEmail(admin.email) === false) {
      throw new ValidationError('Email provided is not valid');
    }
    const isEmailUsed = !isNullOrUndefined(
      await AdminModel.findOne({ email: admin.email }),
    );
    if (isEmailUsed) {
      throw new UserInputError('Email already in use');
    }
    const salt = Bcrypt.genSaltSync(8);
    const newAdmin = admin;
    newAdmin.password = Bcrypt.hashSync(admin.password, salt);
    newAdmin.salt = salt;
    newAdmin.registeredAt = moment().unix();
    newAdmin.projects = projects;
    const adminBeforeSave = new AdminModel(newAdmin);
    const createdAdmin = await adminBeforeSave.save();
    return JSON.parse(JSON.stringify(createdAdmin));
  },
  addProjectToAdmin: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    { adminId, projectId }: { adminId: string; projectId: string },
  ): Promise<Admin> => {
    const admin = await AdminModel.findOne({ _id: adminId });
    if (!admin) {
      throw new NotFoundError('Admin was not found');
    }
    admin.projects = [
      ...admin.projects.filter((_projectId) => _projectId !== projectId),
      projectId,
    ];
    await AdminModel.updateOne(
      {
        _id: adminId,
      },
      admin,
    );
    return admin;
  },
  changeAdminPassword: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    { user }: Context,
  ): Promise<Admin> => {
    const admin = await AdminModel.findOne({ _id: user._id });
    if (!admin) {
      throw new NotFoundError('Admin was not found');
    }
    const encryptedPassword = Bcrypt.hashSync(oldPassword, admin.salt);
    if (encryptedPassword !== admin.password) {
      throw new UserInputError('Incorrect password');
    }
    admin.password = Bcrypt.hashSync(newPassword, admin.salt);
    await AdminModel.updateOne(
      {
        _id: admin._id,
      },
      admin,
    );
    return admin;
  },
  changeAdminInfos: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    { firstname, lastname }: { firstname: string; lastname: string },
    { user }: Context,
  ): Promise<Admin> => {
    const admin = await AdminModel.findOne({ _id: user._id });
    if (!admin) {
      throw new NotFoundError('Admin was not found');
    }
    admin.firstname = firstname;
    admin.lastname = lastname;
    await AdminModel.updateOne(
      {
        _id: admin._id,
      },
      admin,
    );
    return admin;
  },
  changeAdminContactInfos: async (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    parent,
    { email }: { email: string },
    { user }: Context,
  ): Promise<Admin> => {
    const admin = await AdminModel.findOne({ _id: user._id });
    if (!admin) {
      throw new NotFoundError('Admin was not found');
    }
    const isEmailUsed = !isNullOrUndefined(
      await AdminModel.findOne({ _id: { $ne: admin._id }, email }),
    );
    if (isEmailUsed) {
      throw new UserInputError('Email already in use');
    }
    admin.email = email;
    await AdminModel.updateOne(
      {
        _id: admin._id,
      },
      admin,
    );
    return admin;
  },
};
