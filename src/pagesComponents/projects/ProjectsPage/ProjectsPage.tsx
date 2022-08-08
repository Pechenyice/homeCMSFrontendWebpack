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
import { useSearchParams } from 'react-router-dom';
import { useQueryParams } from 'hooks/utils/useQueryParams';

export const ProjectsPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(50);

  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const { projects, isLoading, getProjects } = useProjects();

  useEffect(() => {
    getProjects(page, limit);
  }, [page, limit]);

  useEffect(() => {
    setSortBy((params.sortBy as any) || '');
    setSortDirection((params.sortDirection as any) || '');
  }, [params]);

  const handleSearchClick = () => {
    if (page === 1) {
      getProjects(page, limit);
    } else {
      setPage(1);
    }
  };

  const handleClearClick = () => {
    if (page === 1) {
      getProjects(page, limit, {
        sortBy: params.sortBy || undefined,
        sortDirection: params.sortDirection || undefined,
      } as any);
    } else {
      setPage(1);
    }
  };

  const handleUpdatePage = (newPage: number) => {
    setPage(newPage);
  };

  // sort rule: desc -> asc -> null
  const handleColumnHeaderClick = (columnHeader: string) => {
    let newSortDirection =
      sortDirection === 'asc' ? '' : sortDirection === 'desc' ? 'asc' : 'desc';
    newSortDirection = sortBy === columnHeader ? newSortDirection : 'desc';

    const newSortBy = newSortDirection === '' ? '' : columnHeader;

    let preparedQueryParams = {
      ...params,
      sortBy: newSortBy ? newSortBy : undefined,
      sortDirection: newSortDirection ? newSortDirection : undefined,
    };
    preparedQueryParams = JSON.parse(JSON.stringify(preparedQueryParams));
    setSearchParams(preparedQueryParams as any);

    setSortBy(newSortBy);
    setSortDirection(newSortDirection);

    if (page === 1) {
      getProjects(page, limit, preparedQueryParams as any);
    } else {
      setPage(1);
    }
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
        sortBy={sortBy}
        sortDirection={sortDirection}
        onColumnHeaderClick={handleColumnHeaderClick}
        onUpdatePage={handleUpdatePage}
        entityPath="projects"
      />
    </>
  );
};
