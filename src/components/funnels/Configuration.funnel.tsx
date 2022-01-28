// eslint-disable-next-line no-use-before-define
import React, { ComponentType, useState } from 'react';
// import Group from '../views/home/Group.view';
import './Configuration.funnel.scss';
import { useHistory } from 'react-router-dom';

enum ConfigurationFunnelRoutes {
  ProjectCreation = '#project',
  GroupCreation = '#group',
  UserCreation = '#user',
}
enum ConfigurationFunnelHeaders {
  ProjectCreation = 'Créer un nouveau projet',
  UserCreation = 'Créer des collaborateurs',
  GroupCreation = 'Créer des groupes',
}

type FunnelSteps = {
  route: ConfigurationFunnelRoutes;
  header: ConfigurationFunnelHeaders;
  Component: ComponentType<{ handleClickNext: () => void }>;
}[];
const configurationFunnelSteps: FunnelSteps = [
  // {
  //   route: ConfigurationFunnelRoutes.GroupCreation,
  //   header: ConfigurationFunnelHeaders.GroupCreation,
  //   Component: Group,
  // },
];

function canGoPrevious(step: number): boolean {
  return step - 1 >= 0;
}

function canGoNext(step: number): boolean {
  return step + 1 < configurationFunnelSteps.length;
}

const ConfigurationFunnel: React.FC = () => {
  const [step, setStep] = useState(0);
  const { header, Component } = configurationFunnelSteps[step];
  const history = useHistory();
  return (
    <div className="container is-fluid">
      <div className="columns configuration-funnel-header is-mobile is-vcentered is-centered">
        {canGoPrevious(step) && (
          <div className="column is-1">
            <i
              aria-hidden="true"
              className="fas fa-angle-left"
              onClick={() => setStep(step - 1)}
            />
          </div>
        )}
        <div className="column header-content">{header}</div>
        {canGoPrevious(step) && <div className="column is-1" />}
      </div>
      <div className="body mt-20">
        <Component
          handleClickNext={() => {
            if (canGoNext(step)) {
              setStep(step + 1);
            } else {
              history.push('/home');
            }
          }}
        />
      </div>
    </div>
  );
};
export default ConfigurationFunnel;
