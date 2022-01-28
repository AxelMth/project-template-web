// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useUserLogin } from '../../../hooks/useLogin.hook';
import { useForm } from '../../../hooks/useForm.hook';
import CheckType from '../../../constants/CheckType';
import Form from '../../elements/Form';

const Login: React.FC = () => {
  const [formInputs, handleSubmit] = useForm(
    [
      {
        name: 'email',
        type: 'email',
        initialValue: '',
        validationChecks: [CheckType.ValidEmail],
      },
      {
        name: 'password',
        type: 'password',
        initialValue: '',
        validationChecks: [CheckType.ValidPassword],
      },
    ],
    successCallback,
  );
  const [{ value: email }, { value: password }] = formInputs;
  const [login, { error }] = useUserLogin();
  function successCallback(): void {
    login({
      variables: {
        email,
        password,
      },
    });
  }
  return (
    <div className="container">
      <div className="columns is-multiline is-centered">
        <div className="column is-two-thirds mt-6">
          <Form
            handleSubmit={handleSubmit}
            inputs={formInputs}
            title="Espace collaborateur"
            submitButtonLabel="Se connecter"
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
