// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectSidenavItems: React.FC = () => {
  return (
    <>
      <Link to="/home/project" className="subtitle is-6">
        Informations
      </Link>
      <Link to="/home/project" className="subtitle is-6">
        Nomenclature
      </Link>
      <Link to="/home/project" className="subtitle is-6">
        Règles de validation
      </Link>
    </>
  );
};
export default ProjectSidenavItems;
