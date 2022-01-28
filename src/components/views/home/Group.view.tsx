// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  useApolloMutation,
  useApolloQuery,
} from '../../../hooks/useApollo.hook';
import { GET_GROUPS } from '../../../apollo/query';
import Notification from '../../elements/Notification';
import Colors from '../../../constants/Color';
import { CHANGE_GROUP_COLOR, DELETE_GROUP } from '../../../apollo/mutation';
import { Select } from '../../elements/Select';
import useSearch from '../../../hooks/useSearch.hook';
import { Group } from '../../../../shared/Group.type';
import { Id } from '../../../../shared/Extension.type';
import Loading from '../../elements/Loading';
import Menu from '../../elements/Menu';
import { ModalCTA, useConfirmationModal } from '../../../hooks/useModal.hook';
import useSnackbar from '../../../hooks/useSnackbar.hook';

const GroupView: React.FC = () => {
  const displayConfimationModal = useConfirmationModal();
  const { displaySnackbar } = useSnackbar();
  const history = useHistory();
  const displayGroupForm = (): void => {
    history.push('/home/group/create');
  };
  const { loading, data, refetch } = useApolloQuery<(Group & Id)[]>(
    GET_GROUPS,
    () => {
      // Replace this with a global counter of fetching for each table
      // to know when to refetch data (when page loads for the second, third times, ...)
      if (refetch) {
        refetch();
      }
    },
    { dataPath: 'groups' },
  );
  const [changeGroupColor] = useApolloMutation<Group>(
    CHANGE_GROUP_COLOR,
    () => {
      displaySnackbar(
        'La couleur du groupe a été modifiée avec succès !',
        'success',
      );
      if (refetch) {
        refetch();
      }
    },
    { dataPath: 'changeGroupColor' },
  );
  const [deleteGroup] = useApolloMutation<Id>(
    DELETE_GROUP,
    () => {
      displaySnackbar('Le groupe a été supprimé avec succès !', 'success');
      if (refetch) {
        refetch();
      }
    },
    { dataPath: 'deleteGroup' },
  );
  const [filteredData, searchInput, handleChangeSearch] = useSearch<Group & Id>(
    data,
  );
  const resetSearchField = (): void => {
    handleChangeSearch('');
  };
  const COLORS = [
    {
      label: 'Aucune',
      value: Colors.NONE,
    },
    {
      label: 'Rouge',
      value: Colors.RED,
    },
    {
      label: 'Vert',
      value: Colors.GREEN,
    },
    {
      label: 'Blue',
      value: Colors.BLUE,
    },
    {
      label: 'Gris',
      value: Colors.GREY,
    },
    {
      label: 'Yellow',
      value: Colors.YELLOW,
    },
    {
      label: 'Marron',
      value: Colors.BROWN,
    },
  ];
  return (
    <Loading isLoading={loading}>
      {data?.length === 0 && (
        <div className="column is-full">
          <Notification
            message="Vous n'avez aucun groupe"
            type="warning"
            iconOptions={{
              icon: 'exclamation-triangle',
              type: 'warning',
              size: 'medium',
            }}
            buttonOptions={{
              label: 'Créer un nouveau groupe',
              type: 'link',
              handleClick: displayGroupForm,
            }}
          />
        </div>
      )}
      {data?.length !== 0 && (
        <div className="columns is-multiline is-mobile is-vcentered">
          <div className="column is-full mb-4">
            <div className="title">Groupes</div>
          </div>
          <div className="column is-full">
            <Menu
              menuOptions={{
                searchField: {
                  searchInput,
                  handleChange: handleChangeSearch,
                  resetSearch: () => {
                    handleChangeSearch('');
                  },
                },
                newButton: {
                  color: 'link',
                  handleClick: () => displayGroupForm(),
                  label: 'Créer un nouveau groupe',
                  size: 'normal',
                },
              }}
            />
          </div>
          {filteredData?.length !== 0 &&
            filteredData.map((g: Group & Id) => (
              <div
                className="column is-one-third-fullhd is-half-tablet is-full-mobile"
                key={`${new Date().toISOString()}__${Math.random()}`}
              >
                <div
                  className={`group card has-background-${COLORS.find(
                    (c) => c.value === g.color,
                  )?.value.toLocaleLowerCase()}`}
                >
                  <span
                    aria-hidden="true"
                    className="icon is-medium has-text-danger"
                    style={{ float: 'right' }}
                    onClick={() =>
                      displayConfimationModal(
                        <div className="subtitle is-6 my-2">
                          Êtes vous sûr de vouloir supprimer le groupe{' '}
                          <strong>{g.name}</strong>?
                        </div>,
                      )
                        .then((cta: ModalCTA): boolean => {
                          if (cta === ModalCTA.CONFIRM) {
                            deleteGroup({
                              variables: {
                                groupId: g._id,
                              },
                            });
                          }
                          return true;
                        })
                        .catch((error) => console.error(error))
                    }
                  >
                    <i className="fa fa-trash" />
                  </span>
                  <h4 className="title is-5">{g.name}</h4>
                  <p className="subtitle is-5">{g.description}</p>
                  <p className="subtitle is-6">
                    {`Nombre de collaborateurs: ${g?.users?.length}`}
                  </p>
                  <div style={{ float: 'left' }}>
                    <Select
                      options={COLORS.map((e) => ({
                        ...e,
                        selected: e.value === g.color,
                      }))}
                      onChange={(value) => {
                        changeGroupColor({
                          variables: {
                            groupId: g._id,
                            color: value,
                          },
                        });
                      }}
                      value={
                        COLORS.find((e) => e.value === g.color)?.value ||
                        Colors.NONE
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className="button is-link"
                    onClick={() => {
                      history.push(`/home/group/${g._id}`);
                    }}
                    style={{
                      height: '35px',
                      float: 'right',
                    }}
                  >
                    Détails
                  </button>
                </div>
              </div>
            ))}
          {filteredData?.length === 0 && (
            <div className="column is-full">
              <Notification
                message="Aucun élément ne correspond à votre recherche"
                type="warning"
                buttonOptions={{
                  label: 'Réinitialiser la recherche',
                  type: 'link',
                  handleClick: resetSearchField,
                }}
                iconOptions={{
                  icon: 'exclamation-triangle',
                  size: 'large',
                  type: 'warning',
                }}
              />
            </div>
          )}
        </div>
      )}
    </Loading>
  );
};

export default GroupView;
