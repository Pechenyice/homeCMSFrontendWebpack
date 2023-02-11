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
import { StatisticFiltration } from 'components/statistic/StatisticFiltration/StatisticFiltration';

export const StatisticPage = () => {
  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const {
    statisticOrganizations,
    isLoading,
    getStatisticOrganizations,
  } = useStatisticOrganizations();

  useEffect(() => {
    getStatisticOrganizations();
  }, []);

  useEffect(() => {
    setSortBy((params.sortBy as any) || '');
    setSortDirection((params.sortDirection as any) || '');
  }, [params]);

  const handleSearchClick = () => {
    getStatisticOrganizations();
  };

  const handleClearClick = () => {
    getStatisticOrganizations({
      sortBy: params.sortBy || undefined,
      sortDirection: params.sortDirection || undefined,
    } as any);
  };

  // sort rule: desc -> asc -> null
  const handleColumnHeaderClick = (columnHeader: string) => {
    let newSortDirection =
      sortDirection === 'ASC' ? '' : sortDirection === 'DESC' ? 'ASC' : 'DESC';
    newSortDirection = sortBy === columnHeader ? newSortDirection : 'DESC';

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

    getStatisticOrganizations(preparedQueryParams as any);
  };

  return (
    <>
      <StatisticFiltration
        onSearchClick={handleSearchClick}
        onClearClick={handleClearClick}
      />
      <StatisticOrganizationsTable
        data={statisticOrganizations.companies}
        total={statisticOrganizations.meta}
        isLoading={isLoading}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onColumnHeaderClick={handleColumnHeaderClick}
      />
    </>
  );
};
