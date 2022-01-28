// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import Axios from 'axios';
import { useApolloMutation } from '../../hooks/useApollo.hook';
import Form from '../elements/Form';
import { useForm } from '../../hooks/useForm.hook';
import { DocumentFormInputs } from '../../constants/FormConfiguration';
import { CREATE_DOCUMENT } from '../../apollo/mutation';
import { Document as DocumentInterface } from '../../../shared/Document.type';

interface DocumentFormProps {
  handleSubmit: () => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  handleSubmit,
}: DocumentFormProps) => {
  const [formInputs, handleDocumentSubmit] = useForm(
    DocumentFormInputs,
    successCallback,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [{ value: name }, { value: file }] = formInputs;
  const [createDocument, { loading }] = useApolloMutation<DocumentInterface>(
    CREATE_DOCUMENT,
    () => {
      handleSubmit();
      setIsLoading(false);
    },
    { dataPath: 'createDocument' },
  );
  function successCallback(): void {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('files', (file as FileList)[0], (file as FileList)[0].name);
    Axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, formData)
      .then((response): void => {
        const { url } = response.data;
        return createDocument({
          variables: {
            name,
            url,
          },
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error while uploading file: ', error);
      });
  }
  return (
    <Form
      title="Créer un nouveau document"
      handleSubmit={handleDocumentSubmit}
      inputs={formInputs}
      submitButtonLabel="Créer"
      isLoading={loading || isLoading}
    />
  );
};
export default DocumentForm;
