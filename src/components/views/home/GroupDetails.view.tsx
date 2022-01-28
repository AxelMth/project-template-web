// eslint-disable-next-line no-use-before-define
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useApolloMutation,
  useApolloQuery,
} from '../../../hooks/useApollo.hook';
import { GET_GROUP_BY_ID, GET_USERS } from '../../../apollo/query';
import Notification from '../../elements/Notification';
import UserTable from '../../tables/UserTable';
import {
  ADD_USER_TO_GROUP,
  REMOVE_USER_FROM_GROUP,
  SET_GROUP_DESCRIPTION,
  SET_GROUP_NAME,
} from '../../../apollo/mutation';
import InlineForm from '../../elements/InlineForm';
import { DisplayCriteria } from '../../elements/Menu';
import { Group } from '../../../../shared/Group.type';
import { User } from '../../../../shared/User.type';
import { Id } from '../../../../shared/Extension.type';
import { GROUPS_USER_COLUMNS } from '../../../constants/Table';
import Loading from '../../elements/Loading';
import { ModalCTA, useConfirmationModal } from '../../../hooks/useModal.hook';
import useSnackbar from '../../../hooks/useSnackbar.hook';

const GroupDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditingTitle, setIsEditionTitle] = useState(false);
  const [isEditingSubtitle, setIsEditionSubtitle] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState<string | undefined>(
    undefined,
  );
  const displayConfimationModal = useConfirmationModal();
  const { displaySnackbar } = useSnackbar();
  const { loading, data: groupData, refetch: fetchGroup } = useApolloQuery<
    Group & Id
  >(
    GET_GROUP_BY_ID,
    (group) => {
      setGroupName(group.name);
      setGroupDescription(group.description);
    },
    {
      variables: { id },
      dataPath: 'group',
    },
  );
  const { data: getUsersData, refetch: fetchUsers } = useApolloQuery<
    (User & Id)[]
  >(GET_USERS, () => {}, {
    dataPath: 'users',
  });
  const [isDisplayingUserSelection, setIsDisplayingUserSelection] = useState(
    false,
  );
  const [
    deleteUserFromGroup,
    { loading: isUserDeletionLoading },
  ] = useApolloMutation<Group & Id>(
    REMOVE_USER_FROM_GROUP,
    () => {
      displaySnackbar(
        'Les collaborateurs ont été supprimés du groupe !',
        'success',
      );
      if (fetchGroup) {
        fetchGroup();
      }
      setIsDisplayingUserSelection(false);
    },
    {
      dataPath: 'removeUserFromGroup',
    },
  );
  const [
    addUserToGroup,
    { loading: isUserAdditionLoading },
  ] = useApolloMutation<Group & Id>(
    ADD_USER_TO_GROUP,
    () => {
      displaySnackbar(
        'Les collaborateurs ont été ajoutés avec succès !',
        'success',
      );
      if (fetchGroup) {
        fetchGroup();
      }
      setIsDisplayingUserSelection(false);
    },
    {
      dataPath: 'addUserToGroup',
    },
  );
  const [updateGroupName, { loading: isGroupNameLoading }] = useApolloMutation<
    Group & Id
  >(
    SET_GROUP_NAME,
    (group) => {
      displaySnackbar('Nom du groupe modifié avec succès !', 'success');
      setIsEditionTitle(false);
      setGroupName(group.name);
    },
    {
      dataPath: 'setGroupName',
    },
  );
  const [
    updateGroupDescription,
    { loading: isGroupDescriptionLoading },
  ] = useApolloMutation<Group & Id>(
    SET_GROUP_DESCRIPTION,
    (group) => {
      displaySnackbar('Description du groupe modifié avec succès !', 'success');
      setIsEditionSubtitle(false);
      setGroupDescription(group.description);
    },
    {
      dataPath: 'setGroupDescription',
    },
  );
  return (
    <Loading
      isLoading={loading || isUserDeletionLoading || isUserAdditionLoading}
    >
      {isDisplayingUserSelection && getUsersData && (
        <UserTable
          title={`Ajouter des collaborateurs au groupe ${groupData?.name}`}
          pageContext="userSelectionForGroup"
          users={getUsersData}
          newButton={{
            label: 'Ajouter au groupe',
            color: 'link',
            size: 'normal',
            handleClick: (userIds?: string[]) => {
              addUserToGroup({
                variables: { userIds, groupId: groupData?._id },
              });
            },
            displayCriteria: DisplayCriteria.HAS_AT_LEAST_ONE_SELECTED_ELEMENT,
          }}
        />
      )}
      {!isDisplayingUserSelection && groupData && (
        <div className="columns is-multiline">
          <div className="column is-full">
            {!isEditingTitle && (
              <h4 className="title is-4">
                {groupName}
                <span
                  aria-hidden="true"
                  className="icon ml-4 is-medium"
                  onClick={() => setIsEditionTitle(true)}
                >
                  <i className="fas fa-pencil" />
                </span>
              </h4>
            )}
            {isEditingTitle && (
              <InlineForm
                isLoading={isGroupNameLoading || false}
                value={groupName}
                handleChange={(s: string) => setGroupName(s)}
                submitButtonLabel="Enregistrer"
                handleCancel={() => {
                  setIsEditionTitle(false);
                }}
                handleSubmit={() => {
                  updateGroupName({
                    variables: {
                      groupId: groupData._id,
                      name: groupName,
                    },
                  });
                }}
                color="primary"
                size="medium"
              />
            )}
          </div>
          <div className="column is-full mb-5">
            {!isEditingSubtitle && (
              <p className="subtitle is-4">
                {groupDescription}
                <span
                  aria-hidden="true"
                  className="icon ml-4 is-medium"
                  onClick={() => setIsEditionSubtitle(true)}
                >
                  <i className="fas fa-pencil" />
                </span>
              </p>
            )}
            {isEditingSubtitle && (
              <InlineForm
                isLoading={isGroupDescriptionLoading || false}
                value={groupDescription || ''}
                handleChange={(s: string) => setGroupDescription(s)}
                submitButtonLabel="Enregistrer"
                handleCancel={() => {
                  setIsEditionSubtitle(false);
                }}
                handleSubmit={() => {
                  updateGroupDescription({
                    variables: {
                      groupId: groupData._id,
                      description: groupDescription,
                    },
                  });
                }}
                color="primary"
                size="normal"
              />
            )}
          </div>
          {groupData && groupData?.users && groupData.users?.length > 0 && (
            <div className="column is-full">
              <UserTable
                pageContext="usersInGroup"
                users={groupData.users as (User & Id)[]}
                columns={GROUPS_USER_COLUMNS}
                actions={[
                  {
                    type: 'text',
                    color: 'danger',
                    label: 'Supprimer du groupe',
                    handleClick: (userIds?: string[]) => {
                      displayConfimationModal(
                        <>
                          <div className="subtitle is-6 my-2">
                            Êtes vous sûr de vouloir supprimer:
                          </div>
                          {getUsersData
                            ?.filter(
                              (u: User & Id): boolean =>
                                userIds?.indexOf(u._id) !== -1,
                            )
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
                          <br />
                          <div className="subtitle is-6 my-2">
                            du groupe <strong>{groupData.name}</strong>?
                          </div>
                        </>,
                      )
                        .then((cta: ModalCTA): boolean => {
                          if (cta === ModalCTA.CONFIRM) {
                            deleteUserFromGroup({
                              variables: {
                                userIds,
                                groupId: groupData._id,
                              },
                            });
                          }
                          return true;
                        })
                        .catch((error) => console.error(error));
                    },
                  },
                ]}
                newButton={{
                  label: 'Ajouter un collaborateur',
                  color: 'link',
                  size: 'normal',
                  handleClick: () => {
                    if (fetchUsers) {
                      fetchUsers();
                    }
                    setIsDisplayingUserSelection(true);
                  },
                }}
              />
            </div>
          )}
          {groupData?.users?.length === 0 && (
            <div className="column is-full mt-5">
              <Notification
                message="Ce groupe ne contient pas de collaborateurs"
                type="warning"
                iconOptions={{
                  icon: 'exclamation-triangle',
                  size: 'medium',
                  type: 'warning',
                }}
                buttonOptions={{
                  label: 'Ajouter un nouveau collaborateur',
                  type: 'link',
                  handleClick: () => {
                    if (fetchUsers) {
                      fetchUsers();
                    }
                    setIsDisplayingUserSelection(true);
                  },
                }}
              />
            </div>
          )}
        </div>
      )}
    </Loading>
  );
};
export default GroupDetails;
