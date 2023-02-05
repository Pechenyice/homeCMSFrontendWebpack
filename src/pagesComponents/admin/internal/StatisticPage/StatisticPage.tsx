import { useEffect, useState } from 'react';
import styles from './StatisticPage.module.scss';
import { ProjectsFiltration } from 'components/entities/project/ProjectsFiltration/ProjectsFiltration';
import { useSearchParams } from 'react-router-dom';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { useAdminProjects } from 'hooks/queries/entities/project/useAdminProjects';
import { EntitiesAdminTable } from 'components/entities/common/EntitiesAdminTable';
import { useLibrary } from 'hooks/queries/admin/useLibrary';
import { LibraryFiltration } from 'components/LibraryFiltration/LibraryFiltration';
import { LibraryTable } from 'components/LibraryTable/LibraryTable';
import { useStatisticOrganizations } from 'hooks/queries/admin/statistic/useStatisticOrganizations';
import { StatisticOrganizationsTable } from 'components/statistic/StatisticOrganizationsTable/StatisticOrganizationsTable';

export const StatisticPage = () => {
  const {
    statisticOrganizations,
    isLoading,
    getStatisticOrganizations,
  } = useStatisticOrganizations();

  useEffect(() => {
    getStatisticOrganizations();
  }, []);

  return (
    <>
      <StatisticOrganizationsTable
        data={statisticOrganizations.items}
        isLoading={isLoading}
      />
    </>
  );
};
