// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  useApolloMutation,
  useApolloQuery,
} from '../../../hooks/useApollo.hook';
import { GET_DOCUMENTS } from '../../../apollo/query';
import { DELETE_DOCUMENT } from '../../../apollo/mutation';
import Notification from '../../elements/Notification';
import DocumentTable from '../../tables/DocumentTable';
import { Document } from '../../../../shared/Document.type';
import { Id } from '../../../../shared/Extension.type';
import Loading from '../../elements/Loading';
import useSnackbar from '../../../hooks/useSnackbar.hook';
import { ModalCTA, useConfirmationModal } from '../../../hooks/useModal.hook';

const DocumentView: React.FC = () => {
  const displayConfimationModal = useConfirmationModal();
  const { displaySnackbar } = useSnackbar();
  const { loading, data, refetch } = useApolloQuery<(Document & Id)[]>(
    GET_DOCUMENTS,
    () => {
      // Replace this with a global counter of fetching for each table
      // to know when to refetch data (when page loads for the second, third times, ...)
      if (refetch) {
        refetch();
      }
    },
    { dataPath: 'documents' },
  );
  const [deleteDocument] = useApolloMutation<Id>(
    DELETE_DOCUMENT,
    () => {
      displaySnackbar('Le document a été supprimé avec succès !', 'success');
      if (refetch) {
        refetch();
      }
    },
    { dataPath: 'deleteDocument' },
  );
  const history = useHistory();
  const displayDocumentForm = (): void => {
    history.push('/home/document/create');
  };
  return (
    <Loading isLoading={loading}>
      {data?.length === 0 && (
        <div className="column is-full">
          <Notification
            message="Vous n'avez aucun document"
            type="warning"
            iconOptions={{
              icon: 'exclamation-triangle',
              type: 'warning',
              size: 'medium',
            }}
            buttonOptions={{
              label: 'Créer un nouveau document',
              type: 'link',
              handleClick: displayDocumentForm,
            }}
          />
        </div>
      )}
      {data && data?.length !== 0 && (
        <>
          <DocumentTable
            title="Documents"
            documents={data}
            actions={[
              {
                type: 'text',
                color: 'danger',
                label: 'Supprimer',
                handleClick: (documentIds?: string[]) => {
                  displayConfimationModal(
                    <>
                      <div className="subtitle is-6 my-2">
                        Êtes vous sûr de vouloir supprimer les documents:
                      </div>
                      {data
                        ?.filter((d) => documentIds?.indexOf(d._id) !== -1)
                        .map((d) => (
                          <p
                            key={`${new Date().toISOString()}__${Math.random()}`}
                          >
                            - <strong>{d.name}</strong>
                          </p>
                        ))}
                      <div className="subtitle is-6 my-2">
                        de manière définitive?
                      </div>
                    </>,
                  )
                    .then((cta) => {
                      if (cta === ModalCTA.CONFIRM) {
                        documentIds?.forEach((documentId) => {
                          deleteDocument({
                            variables: {
                              documentId,
                            },
                          });
                        });
                      }
                      return true;
                    })
                    .catch((error) => console.error(error));
                },
              },
            ]}
            newButton={{
              label: 'Créer un nouveau document',
              color: 'link',
              size: 'normal',
              handleClick: displayDocumentForm,
            }}
          />
        </>
      )}
    </Loading>
  );
};
export default DocumentView;
