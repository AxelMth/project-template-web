import { MutationFunctionOptions, OperationVariables } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useApolloMutation } from './useApollo.hook';
import { ADMIN_LOGIN, USER_LOGIN } from '../apollo/mutation';
import { ApolloCustomError } from '../types/apollo.type';

export function useAdminLogin(): [
  (
    options?: MutationFunctionOptions<
      {
        token: string;
      },
      OperationVariables
    >,
  ) => void,
  {
    data: { token: string } | null | undefined;
    error: ApolloCustomError;
    loading: boolean | undefined;
  },
] {
  const history = useHistory();
  const [login, { data, error, loading }] = useApolloMutation<{
    token: string;
  }>(
    ADMIN_LOGIN,
    (_data) => {
      if (_data?.token) {
        localStorage.setItem('token', _data.token);
        history.push('/home');
      }
    },
    {
      dataPath: 'adminLogin',
      shouldDisplayNotification: false,
    },
  );
  return [login, { data, error, loading }];
}

export function useUserLogin(): [
  (
    options?: MutationFunctionOptions<
      {
        token: string;
      },
      OperationVariables
    >,
  ) => void,
  {
    data: { token: string } | null | undefined;
    error: ApolloCustomError;
    loading: boolean | undefined;
  },
] {
  const history = useHistory();
  const [login, { data, error, loading }] = useApolloMutation<{
    token: string;
  }>(
    USER_LOGIN,
    (_data) => {
      if (_data?.token) {
        localStorage.setItem('token', _data.token);
        history.push('/home');
      }
    },
    {
      dataPath: 'userLogin',
      shouldDisplayNotification: false,
    },
  );
  return [login, { data, error, loading }];
}
