// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useForm } from '../../../hooks/useForm.hook';
import useSnackbar from '../../../hooks/useSnackbar.hook';
import Form from '../../elements/Form';
import {
  AdminContactInfosFormInputs,
  AdminInfosFormInputs,
} from '../../../constants/FormConfiguration';
import {
  CHANGE_ADMIN_CONTACT_INFOS,
  CHANGE_ADMIN_INFOS,
} from '../../../apollo/mutation';
import {
  useApolloMutation,
  useApolloQuery,
} from '../../../hooks/useApollo.hook';
import { Admin } from '../../../../shared/Admin.type';
import { Id } from '../../../../shared/Extension.type';
import Loading from '../../elements/Loading';
import { GET_ME } from '../../../apollo/query';

export const AdminInfosView: React.FC = () => {
  const { displaySnackbar } = useSnackbar();
  const [adminInfosInputs, handleSubmitInfos] = useForm(
    AdminInfosFormInputs,
    successInfosCallback,
  );
  const [
    { value: firstname, setter: setFirstname },
    { value: lastname, setter: setLastname },
  ] = adminInfosInputs;
  const [adminContactInfosInputs, handleSubmitContactInfos] = useForm(
    AdminContactInfosFormInputs,
    successContactInfosCallback,
  );
  const [{ value: email, setter: setEmail }] = adminContactInfosInputs;
  const { loading: isLoading } = useApolloQuery<Admin & Id>(
    GET_ME,
    (data) => {
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setEmail(data.email);
    },
    {
      dataPath: 'me',
    },
  );
  const [updateAdminInfos] = useApolloMutation<Admin & Id>(
    CHANGE_ADMIN_INFOS,
    () => {
      displaySnackbar('Informations modifiées avec succès !', 'success');
    },
    {
      dataPath: 'changeAdminInfos',
    },
  );
  const [updateAdminContactInfos] = useApolloMutation<Admin & Id>(
    CHANGE_ADMIN_CONTACT_INFOS,
    () => {
      displaySnackbar('Informations modifiées avec succès !', 'success');
    },
    {
      dataPath: 'changeAdminContactInfos',
    },
  );
  function successInfosCallback(): void {
    updateAdminInfos({
      variables: {
        firstname,
        lastname,
      },
    });
  }
  function successContactInfosCallback(): void {
    updateAdminContactInfos({
      variables: {
        email,
      },
    });
  }
  return (
    <Loading isLoading={isLoading}>
      <Form
        handleSubmit={handleSubmitInfos}
        inputs={adminInfosInputs}
        title="Information personnelles"
        submitButtonLabel="Enregistrer"
        isLoading={isLoading}
      />
      <Form
        handleSubmit={handleSubmitContactInfos}
        inputs={adminContactInfosInputs}
        title="Information de contact"
        submitButtonLabel="Enregistrer"
        isLoading={isLoading}
      />
    </Loading>
  );
};

export default AdminInfosView;
