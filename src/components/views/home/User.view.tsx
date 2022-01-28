// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  useApolloMutation,
  useApolloQuery,
} from '../../../hooks/useApollo.hook';
import { GET_USERS } from '../../../apollo/query';
import UserTable from '../../tables/UserTable';
import { RESEND_EMAIL_TO_USER, DELETE_USER } from '../../../apollo/mutation';
import useSnackbar from '../../../hooks/useSnackbar.hook';
import { User } from '../../../../shared/User.type';
import { Id } from '../../../../shared/Extension.type';
import Loading from '../../elements/Loading';
import Notification from '../../elements/Notification';
import { ModalCTA, useConfirmationModal } from '../../../hooks/useModal.hook';

const UserView: React.FC = () => {
  const history = useHistory();
  const displayUserForm = (): void => {
    history.push('/home/user/create');
  };
  const { displaySnackbar } = useSnackbar();
  const displayConfimationModal = useConfirmationModal();
  const { loading, data, refetch: fetchUsers } = useApolloQuery<(User & Id)[]>(
    GET_USERS,
    () => {
      if (fetchUsers) {
        fetchUsers();
      }
    },
    {
      dataPath: 'users',
    },
  );
  const [resendEmailToUser] = useApolloMutation<User & Id>(
    RESEND_EMAIL_TO_USER,
    () => {
      displaySnackbar('Email envoyé', 'info');
    },
    {
      dataPath: 'resendEmailToUser',
    },
  );
  const [deleteUser] = useApolloMutation<Id>(
    DELETE_USER,
    () => {
      displaySnackbar(
        'Les collaborateurs ont été supprimés avec succès !',
        'success',
      );
      if (fetchUsers) {
        fetchUsers();
      }
    },
    {
      dataPath: 'deleteUser',
    },
  );
  return (
    <Loading isLoading={loading}>
      {data?.length === 0 && (
        <div className="column is-full">
          <Notification
            message="Vous n'avez aucun collaborateur"
            type="warning"
            iconOptions={{
              icon: 'exclamation-triangle',
              type: 'warning',
              size: 'medium',
            }}
            buttonOptions={{
              label: 'Créer un nouveau collaborateur',
              type: 'link',
              handleClick: displayUserForm,
            }}
          />
        </div>
      )}
      {data && data?.length !== 0 && (
        <UserTable
          title="Collaborateurs"
          users={data}
          actions={[
            {
              type: 'text',
              label: 'Inviter par email',
              handleClick: (userIds?: string[]) => {
                userIds?.forEach((userId) => {
                  resendEmailToUser({
                    variables: {
                      userId,
                    },
                  });
                });
              },
            },
            {
              type: 'text',
              hasSeparation: true,
              color: 'danger',
              label: 'Supprimer',
              handleClick: (userIds?: string[]) => {
                displayConfimationModal(
                  <>
                    <div className="subtitle is-6 my-2">
                      Êtes vous sûr de vouloir supprimer:
                    </div>
                    {data
                      ?.filter((u) => userIds?.indexOf(u._id) !== -1)
                      .map((u) => (
                        <p
                          key={`${new Date().toISOString()}__${Math.random()}`}
                        >
                          -{' '}
                          <strong>
                            {u.firstname} {u.lastname}
                          </strong>{' '}
                          ({u.email})
                        </p>
                      ))}
                    <div className="subtitle is-6 my-2">
                      de manière définitive?
                    </div>
                  </>,
                )
                  .then((cta: ModalCTA): boolean => {
                    if (cta === ModalCTA.CONFIRM) {
                      userIds?.forEach((userId) => {
                        deleteUser({ variables: { userId } });
                      });
                    }
                    return true;
                  })
                  .catch((error) => console.error(error));
              },
            },
          ]}
          newButton={{
            label: 'Créer un collaborateur',
            color: 'link',
            size: 'normal',
            handleClick: () => {
              history.push('/home/user/create');
            },
          }}
          noDataButtonOptions={{
            label: 'Créer un nouveau collaborateur',
            type: 'primary',
            handleClick: () => {
              history.push('/home/user/create');
            },
          }}
        />
      )}
    </Loading>
  );
};

export default UserView;
