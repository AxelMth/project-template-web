// eslint-disable-next-line no-use-before-define
import React from 'react';
import { useApolloMutation } from '../../hooks/useApollo.hook';
import Form from '../elements/Form';
import { useForm } from '../../hooks/useForm.hook';
import { GroupFormInputs } from '../../constants/FormConfiguration';
import { CREATE_GROUP } from '../../apollo/mutation';
import { Group } from '../../../shared/Group.type';

interface GroupFormProps {
  handleSubmit: () => void;
}

const GroupForm: React.FC<GroupFormProps> = ({
  handleSubmit,
}: GroupFormProps) => {
  const [formInputs, handleGroupSubmit] = useForm(
    GroupFormInputs,
    successCallback,
  );
  const [{ value: name }, { value: description }] = formInputs;
  const [createGroup, { loading }] = useApolloMutation<Group>(
    CREATE_GROUP,
    () => {
      handleSubmit();
    },
    { dataPath: 'createGroup' },
  );
  function successCallback(): void {
    createGroup({
      variables: {
        name,
        description,
      },
    });
  }
  return (
    <Form
      title="Créer un nouveau groupe"
      handleSubmit={handleGroupSubmit}
      inputs={formInputs}
      submitButtonLabel="Créer"
      isLoading={loading}
    />
  );
};
export default GroupForm;
