import { ProjectViewMainPartition } from 'components/entities/project/ProjectViewStepsInterface/ProjectViewMainPartition';
import { EntityCreationSteps } from 'components/EntityCreationSteps/EntityCreationSteps';
import { useEffect, useState } from 'react';
import styles from './ProjectsPage.module.scss';

import { IProjectData } from 'types/entities/project';
import { Action, Button, Text } from 'components/kit';
import { useProjects } from 'hooks/queries/entities/useProjects';
import { ProjectsFiltration } from 'components/entities/project/ProjectsFiltration/ProjectsFiltration';
import PageLoader from 'components/PageLoader/PageLoader';
import { EntitiesTable } from 'components/entities/common/EntitiesTable';

export const ProjectsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const { projects, isLoading, getProjects } = useProjects();

  useEffect(() => {
    getProjects(page, limit);
  }, [page, limit]);

  const handleSearchClick = () => {
    getProjects(page, limit);
  };

  const handleClearClick = () => {
    getProjects(page, limit, {});
  };

  const handleUpdatePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <ProjectsFiltration
        onSearchClick={handleSearchClick}
        onClearClick={handleClearClick}
      />
      <EntitiesTable
        data={projects.items}
        total={projects.total}
        page={page}
        limit={limit}
        isLoading={isLoading}
        onUpdatePage={handleUpdatePage}
      />
    </>
  );
};
