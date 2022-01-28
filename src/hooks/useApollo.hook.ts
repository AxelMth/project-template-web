import {
  MutationFunctionOptions,
  OperationVariables,
  useMutation,
  useQuery,
} from '@apollo/client';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ApolloCustomError,
  ApolloDocument,
  ApolloMutationHookOptions,
  ApolloQueryHookOptions,
} from '../types/apollo.type';
import useSnackbar from './useSnackbar.hook';

type CustomOptions = {
  dataPath: string;
  shouldDisplayNotification?: boolean;
};
export function useApolloMutation<T>(
  mutation: ApolloDocument,
  callback: (data: T) => void,
  options: ApolloMutationHookOptions & CustomOptions,
): [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (options?: MutationFunctionOptions<any, OperationVariables>) => void,
  {
    data: T | null | undefined;
    loading: boolean | undefined;
    error: ApolloCustomError;
  },
] {
  const apolloMutation = useMutation<Record<string, T>>(mutation, {
    errorPolicy: 'all',
    ...options,
  });
  const [mutate, { loading, error, data }] = apolloMutation;
  // Success callback
  useEffect(() => {
    if (data && options?.dataPath && data[options.dataPath]) {
      callback(data[options.dataPath]);
    }
  }, [data]);
  // Error callback
  useNetworkError(error, options.shouldDisplayNotification);
  const cleanData = data && data[options.dataPath];
  return [mutate, { data: cleanData, loading, error }];
}

export function useApolloQuery<T>(
  query: ApolloDocument,
  callback: (data: T) => void,
  options: ApolloQueryHookOptions & CustomOptions,
): {
  data: T | null | undefined;
  loading: boolean | undefined;
  error: ApolloCustomError;
  refetch: () => void;
} {
  const apolloQuery = useQuery<Record<string, T>>(query, {
    errorPolicy: 'all',
    ...options,
  });
  const { loading, error, data } = apolloQuery;
  let refetch = (): void => {};
  if (apolloQuery.refetch) {
    refetch = apolloQuery.refetch;
  }
  // Success callback
  useEffect(() => {
    if (data && options.dataPath && data[options.dataPath]) {
      callback(data[options.dataPath]);
    } else if (data && options.dataPath && !data[options.dataPath]) {
      throw new Error("dataPath doesn't exist");
    }
  }, [data]);
  // Error callback
  useNetworkError(error, options.shouldDisplayNotification);
  const cleanData = data && data[options.dataPath];
  return { data: cleanData, loading, error, refetch };
}

function useNetworkError(
  error: ApolloCustomError,
  shouldDisplayNotification = true,
): void {
  const history = useHistory();
  const { displaySnackbar } = useSnackbar();
  useEffect(() => {
    if (error?.graphQLErrors[0]?.extensions?.code === 'FORBIDDEN') {
      history.push('/login');
    } else if (error?.message && shouldDisplayNotification) {
      displaySnackbar(error?.message, 'danger');
    }
  }, [error]);
}
