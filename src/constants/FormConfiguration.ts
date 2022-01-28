import { Input } from '../hooks/useForm.hook';
import CheckType from './CheckType';

export const ProjectFormInputs: Input[] = [
  {
    name: 'Nom',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
  {
    name: 'Début du projet',
    type: 'date',
    initialValue: new Date(),
    validationChecks: [CheckType.ValidDate],
  },
  {
    name: 'Fin du projet',
    type: 'date',
    initialValue: new Date(),
    validationChecks: [CheckType.ValidDate],
  },
  {
    name: 'Ville',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
  {
    name: 'Description',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
  {
    name: 'Client',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
  {
    name: 'Référent client',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
];

export const UserFormInputs: Input[] = [
  {
    name: 'Prénom',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
  {
    name: 'Nom de famille',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
  {
    name: 'Email',
    type: 'email',
    initialValue: '',
    validationChecks: [CheckType.ValidEmail],
  },
  {
    name: 'Métier',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
  {
    name: 'Téléphone',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString, CheckType.ValidPhone],
  },
  {
    name: 'Entreprise',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
  {
    name: 'Rôle',
    type: 'text',
    initialValue: '',
    validationChecks: [],
  },
  {
    name: 'Fixe',
    type: 'text',
    initialValue: '',
    validationChecks: [],
  },
  {
    name: 'Fax',
    type: 'text',
    initialValue: '',
    validationChecks: [],
  },
];

export const GroupFormInputs: Input[] = [
  {
    name: 'Nom',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
  {
    name: 'Description',
    type: 'text',
    initialValue: '',
    validationChecks: [],
  },
];

export const DocumentFormInputs: Input[] = [
  {
    name: 'Nom',
    type: 'text',
    initialValue: '',
    validationChecks: [
      CheckType.NotEmptyString,
      // TODO
      // , CheckType.IsDocumentRespectingNamingRule
    ],
  },
  {
    name: 'Choisir un document',
    type: 'file',
    initialValue: '',
    validationChecks: [CheckType.ValidFile],
  },
];

export const AdminPasswordFormInputs: Input[] = [
  {
    name: 'Ancien mot de passe',
    type: 'password',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
  {
    name: 'Nouveau mot de passe',
    type: 'password',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString, CheckType.ValidPassword],
  },
  {
    name: 'Confirmation du mot de passe',
    type: 'password',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString, CheckType.ValidPassword],
  },
];

export const AdminInfosFormInputs: Input[] = [
  {
    name: 'Nom',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
  {
    name: 'Prénom',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
];

export const AdminContactInfosFormInputs: Input[] = [
  {
    name: 'Email',
    type: 'text',
    initialValue: '',
    validationChecks: [CheckType.NotEmptyString],
  },
];
