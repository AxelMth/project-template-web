// eslint-disable-next-line no-use-before-define
import React, { useContext, useState } from 'react';
import { Route, Link, Switch, useHistory, useLocation } from 'react-router-dom';
import ProjectView from './Project.view';
import User from './User.view';
import Group from './Group.view';
import GroupDetails from './GroupDetails.view';
import Document from './Document.view';
import DocumentDetails from './DocumentDetails.view';
import AdminPassword from './AdminPassword.view';
import AdminInfos from './AdminInfos.view';
import Snackbar from '../../elements/Snackbar';
import UserForm from '../../forms/User.form';
import DocumentForm from '../../forms/Document.form';
import GroupForm from '../../forms/Group.form';
import { SnackbarContext } from '../../../contexts/Snackbar.context';
import { Project } from '../../../../shared/Project.type';
import { GET_PROJECTS, GET_ME } from '../../../apollo/query';
import { Id } from '../../../../shared/Extension.type';
import { useApolloQuery } from '../../../hooks/useApollo.hook';
import { Admin } from '../../../../shared/Admin.type';
import { PropsWithChildren } from '../../../types/react.type';
import Modal from '../../elements/Modal';
import { ModalContext } from '../../../contexts/Modal.context';
import Sidenav from '../../elements/Sidenav';
import ProjectSidenavItems from '../../sidenavs/ProjectSidenav';
import AdminProfileSidenavItems from '../../sidenavs/AdminProfileSidenav';

const Section: React.FC<PropsWithChildren & { title: string }> = ({
  children,
  title,
}: PropsWithChildren & { title: string }) => {
  return (
    <>
      <div className="subtitle has-text-white is-6 mb-5">
        <div className="mb-1">{title}</div>
        {children}
      </div>
    </>
  );
};

const Home: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const homeLocation = location.pathname.match(/\/home\/(\w+)/);
  const [notificationState] = useContext(SnackbarContext);
  const [modalState] = useContext(ModalContext);
  const [activeTab, setActiveTab] = useState<string>(
    (homeLocation && homeLocation[1]) || '',
  );
  const { data: projects } = useApolloQuery<(Project & Id)[]>(
    GET_PROJECTS,
    () => {},
    {
      dataPath: 'projects',
    },
  );
  const { data: me } = useApolloQuery<Admin & Id>(GET_ME, () => {}, {
    dataPath: 'me',
  });
  return (
    <>
      <div className="columns is-marginless">
        <Modal
          isActive={modalState.isActive}
          title={modalState.title}
          body={modalState.body}
          buttons={modalState.buttons}
        />
        <Sidenav
          shouldBeDisplayed
          depth={1}
          className="is-one-quarter is-paddingless"
        >
          <div className="title has-text-white is-spaced is-4">
            {me?.firstname} {me?.lastname}
          </div>
          <Section title="Projets">
            {projects?.map((p) => (
              <div
                className="subtitle has-text-white is-5 mb-0"
                key={`${new Date().toISOString()}__${Math.random()}`}
              >
                <div
                  aria-hidden="true"
                  className="is-item is-active"
                  onClick={(): void => {
                    setActiveTab('project');
                    history.push('/home/project');
                  }}
                >
                  {p.name}
                  <span className="icon is-small is-right">
                    <i className="fas fa-cog" />
                  </span>
                </div>
              </div>
            ))}
          </Section>
          <Section title="Rubriques">
            <Link
              to="/home/users"
              className={`is-item ${
                activeTab === 'users' || activeTab === 'user' ? 'is-active' : ''
              }`}
              onClick={() => {
                setActiveTab('users');
              }}
            >
              <span className="icon is-small mr-4">
                <i className="fas fa-user" />
              </span>
              Mes collaborateurs
            </Link>
            <Link
              to="/home/groups"
              className={`is-item ${
                activeTab === 'groups' || activeTab === 'group'
                  ? 'is-active'
                  : ''
              }`}
              onClick={() => {
                setActiveTab('groups');
              }}
            >
              <span className="icon is-small mr-4">
                <i className="fas fa-users" />
              </span>
              Mes groupes
            </Link>
            <Link
              to="/home/documents"
              className={`is-item ${
                activeTab === 'documents' || activeTab === 'document'
                  ? 'is-active'
                  : ''
              }`}
              onClick={() => {
                setActiveTab('documents');
              }}
            >
              <span className="icon is-small mr-4">
                <i className="fas fa-file" />
              </span>
              Mes documents
            </Link>
          </Section>
          <Section title="Préférences">
            <Link
              to="/home/profile"
              className={`is-item ${
                activeTab === 'profile' ? 'is-active' : ''
              }`}
              onClick={() => {
                setActiveTab('profile');
              }}
            >
              <span className="icon is-small mr-4">
                <i className="fas fa-user" />
              </span>
              Mon compte
            </Link>
          </Section>
        </Sidenav>
        <Switch>
          <Route path="/home" exact>
            <Sidenav
              shouldBeDisplayed
              depth={2}
              className="is-one-fifth is-paddingless"
            >
              <ProjectSidenavItems />
            </Sidenav>
          </Route>
          <Route path="/home/project">
            <Sidenav
              shouldBeDisplayed
              depth={2}
              className="is-one-fifth is-paddingless"
            >
              <ProjectSidenavItems />
            </Sidenav>
          </Route>
          <Route path="/home/profile">
            <Sidenav
              shouldBeDisplayed
              depth={2}
              className="is-one-fifth is-paddingless"
            >
              <AdminProfileSidenavItems />
            </Sidenav>
          </Route>
        </Switch>
        <div className="column is-paddingless">
          <div className="columns is-marginless is-multiline is-centered">
            <Snackbar
              shouldDisplay={notificationState.shouldBeDisplayed}
              message={notificationState.message || undefined}
              color={notificationState.color}
            />
            <div className="column is-paddingless">
              <Switch>
                <Route path="/home" exact>
                  <ProjectView />
                </Route>
                <Route path="/home/project">
                  <ProjectView />
                </Route>
                <Route path="/home/users">
                  <User />
                </Route>
                <Route path="/home/user/create">
                  <UserForm
                    handleSubmit={() => {
                      history.push('/home/users');
                    }}
                  />
                </Route>
                <Route path="/home/groups">
                  <Group />
                </Route>
                <Route path="/home/group/create">
                  <GroupForm
                    handleSubmit={() => {
                      history.push('/home/groups');
                    }}
                  />
                </Route>
                <Route path="/home/group/:id">
                  <GroupDetails />
                </Route>
                <Route path="/home/documents">
                  <Document />
                </Route>
                <Route path="/home/document/create">
                  <DocumentForm
                    handleSubmit={() => {
                      history.push('/home/documents');
                    }}
                  />
                </Route>
                <Route path="/home/document/:id">
                  <DocumentDetails />
                </Route>
                <Route path="/home/profile" exact>
                  <AdminInfos />
                </Route>
                <Route path="/home/profile/personal-infos">
                  <AdminInfos />
                </Route>
                <Route path="/home/profile/password">
                  <AdminPassword />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
