// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import {
  useApolloMutation,
  useApolloQuery,
} from '../../../hooks/useApollo.hook';
import { GET_PROJECTS } from '../../../apollo/query';
import { UPDATE_PROJECT } from '../../../apollo/mutation';
import { ProjectFormInputs } from '../../../constants/FormConfiguration';
import { useForm } from '../../../hooks/useForm.hook';
import Form from '../../elements/Form';
import useSnackbar from '../../../hooks/useSnackbar.hook';
import { Project } from '../../../../shared/Project.type';
import { Id } from '../../../../shared/Extension.type';
import Loading from '../../elements/Loading';

const ProjectView: React.FC = () => {
  const { displaySnackbar } = useSnackbar();
  const [projectId, setProjectId] = useState('');
  const [formInputs, handleSubmit] = useForm(
    ProjectFormInputs,
    successCallback,
  );
  const [
    { value: name, setter: setName },
    { value: startDate, setter: setStartDate },
    { value: endDate, setter: setEndDate },
    { value: city, setter: setCity },
    { value: description, setter: setDescription },
    { value: client, setter: setClient },
    { value: clientAdviser, setter: setClientAdviser },
  ] = formInputs;
  const { loading: isProjectLoading } = useApolloQuery<(Project & Id)[]>(
    GET_PROJECTS,
    (data) => {
      const {
        _id: id,
        name: newName,
        startDate: newStartDate,
        endDate: newEndDate,
        city: newCity,
        description: newDescription,
        client: newClient,
        clientAdviser: newClientAdviser,
      } = data[0];
      setProjectId(id);
      setName(newName);
      setStartDate((newStartDate && new Date(newStartDate)) || new Date());
      setEndDate((newEndDate && new Date(newEndDate)) || new Date());
      setCity(newCity || '');
      setDescription(newDescription || '');
      setClient(newClient || '');
      setClientAdviser(newClientAdviser || '');
    },
    {
      dataPath: 'projects',
    },
  );
  const [updateProject] = useApolloMutation<Project & Id>(
    UPDATE_PROJECT,
    (data) => {
      const {
        _id: id,
        name: newName,
        startDate: newStartDate,
        endDate: newEndDate,
        city: newCity,
        description: newDescription,
        client: newClient,
        clientAdviser: newClientAdviser,
      } = data;
      setProjectId(id);
      setName(newName);
      setStartDate((newStartDate && new Date(newStartDate)) || new Date());
      setEndDate((newEndDate && new Date(newEndDate)) || new Date());
      setCity(newCity || '');
      setDescription(newDescription || '');
      setClient(newClient || '');
      setClientAdviser(newClientAdviser || '');
      displaySnackbar('Le projet a bien été modifié', 'success');
    },
    {
      dataPath: 'updateProject',
    },
  );
  function successCallback(): void {
    updateProject({
      variables: {
        id: projectId,
        name,
        startDate,
        endDate,
        city,
        description,
        client,
        clientAdviser,
      },
    });
  }
  return (
    <Loading isLoading={isProjectLoading}>
      <Form
        handleSubmit={handleSubmit}
        inputs={formInputs}
        title="Mon projet"
        submitButtonLabel="Enregistrer"
        isLoading={isProjectLoading}
      />
    </Loading>
  );
};

export default ProjectView;
