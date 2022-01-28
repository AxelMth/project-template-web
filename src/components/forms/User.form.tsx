// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useApolloMutation } from '../../hooks/useApollo.hook';
import Form from '../elements/Form';
import { CREATE_USER } from '../../apollo/mutation';
import { UserFormInputs } from '../../constants/FormConfiguration';
import { useForm } from '../../hooks/useForm.hook';
import { User } from '../../../shared/User.type';
import { Id } from '../../../shared/Extension.type';

interface UserFormProps {
  handleSubmit: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ handleSubmit }: UserFormProps) => {
  const [formInputs, handleSubmitForm] = useForm(
    UserFormInputs,
    successCallback,
  );
  const [
    { value: firstname },
    { value: lastname },
    { value: email },
    { value: job },
    { value: phone },
    { value: company },
    { value: contextualJob },
    { value: fixedLinePhone },
    { value: fax },
  ] = formInputs;
  const [createUser, { loading, error }] = useApolloMutation<User & Id>(
    CREATE_USER,
    () => {
      handleSubmit();
    },
    { dataPath: 'createUser', shouldDisplayNotification: false },
  );
  function successCallback(): void {
    createUser({
      variables: {
        firstname,
        lastname,
        email,
        company,
        job,
        contextualJob,
        phone,
        fixedLinePhone,
        fax,
        groups: null,
      },
    });
  }
  return (
    <Form
      handleSubmit={handleSubmitForm}
      inputs={formInputs}
      title="Créer un nouveau collaborateur"
      submitButtonLabel="Créer"
      isLoading={loading}
      error={error}
    />
  );
};
export default UserForm;
