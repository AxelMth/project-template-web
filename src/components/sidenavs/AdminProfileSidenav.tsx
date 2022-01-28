// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Link } from 'react-router-dom';

const AdminProfileSidenavItems: React.FC = () => {
  return (
    <>
      <Link to="/home/profile/personal-infos" className="subtitle is-6">
        Informations
      </Link>
      <Link to="/home/profile/password" className="subtitle is-6">
        Mot de passe
      </Link>
    </>
  );
};
export default AdminProfileSidenavItems;
