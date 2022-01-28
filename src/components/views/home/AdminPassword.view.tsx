// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import { ApolloError } from '@apollo/client';
import { useForm } from '../../../hooks/useForm.hook';
import useSnackbar from '../../../hooks/useSnackbar.hook';
import Form from '../../elements/Form';
import { AdminPasswordFormInputs } from '../../../constants/FormConfiguration';
import { CHANGE_ADMIN_PASSWORD } from '../../../apollo/mutation';
import { useApolloMutation } from '../../../hooks/useApollo.hook';
import { Admin } from '../../../../shared/Admin.type';
import { Id } from '../../../../shared/Extension.type';
import { arePasswordsIdentical, InputError } from '../../../toolbox/check';
import Loading from '../../elements/Loading';

export const ProfileView: React.FC = () => {
  const { displaySnackbar } = useSnackbar();
  const [formInputs, handleSubmit] = useForm(
    AdminPasswordFormInputs,
    successCallback,
  );
  const [
    { value: oldPassword },
    { value: newPassword },
    { value: newPasswordConfirmation },
  ] = formInputs;
  const [updateAdmin, { loading, error: mutationError }] = useApolloMutation<
    Admin & Id
  >(
    CHANGE_ADMIN_PASSWORD,
    () => {
      displaySnackbar('Mot de passe modifié !', 'success');
    },
    {
      dataPath: 'changeAdminPassword',
      shouldDisplayNotification: false,
    },
  );
  const [error, setError] = useState<InputError | ApolloError | undefined>(
    undefined,
  );
  function successCallback(): void {
    const newError = arePasswordsIdentical(
      newPassword as string,
      newPasswordConfirmation as string,
    );
    setError(newError);
    if (newError === true) {
      updateAdmin({
        variables: {
          oldPassword,
          newPassword,
        },
      });
    }
  }
  return (
    <Loading isLoading={loading}>
      <Form
        handleSubmit={handleSubmit}
        inputs={formInputs}
        title="Mot de passe"
        submitButtonLabel="Enregistrer"
        isLoading={loading}
        error={mutationError || error}
      />
    </Loading>
  );
};

export default ProfileView;
