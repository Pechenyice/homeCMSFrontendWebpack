import { ProjectViewMainPartition } from 'components/entities/project/ProjectViewStepsInterface/ProjectViewMainPartition';
import { EntityCreationSteps } from 'components/EntityCreationSteps/EntityCreationSteps';
import { useEffect, useState } from 'react';
import styles from './ProjectsPage.module.scss';

import { IProjectData } from 'types/entities/project';
import { Action, Button, Text } from 'components/kit';
import { useProjects } from 'hooks/queries/entities/useProjects';
import { ProjectsFiltration } from 'components/entities/project/ProjectsFiltration/ProjectsFiltration';
import PageLoader from 'components/PageLoader/PageLoader';
import Table from 'rc-table';

const COLUMNS = [
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Организация',
    dataIndex: 'organization',
    key: 'organization',
  },
  {
    title: 'Дата создания',
    dataIndex: 'creation',
    key: 'creation',
  },
  {
    title: 'Дата изменения',
    dataIndex: 'edition',
    key: 'edition',
  },
  {
    title: 'Рейтинг',
    dataIndex: 'rating',
    key: 'rating',
  },
];

export const ProjectsPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const { projects, isLoading, getProjects } = useProjects();

  useEffect(() => {
    getProjects(page, limit);
  }, []);

  const handleSearchClick = () => {
    getProjects(page, limit);
  };

  return (
    <>
      <ProjectsFiltration onSearchClick={handleSearchClick} />
      {isLoading ? (
        <PageLoader />
      ) : (
        <Table columns={COLUMNS} data={projects.items} />
      )}
    </>
  );
};
