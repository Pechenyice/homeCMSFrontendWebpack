import { useEffect, useState } from 'react';
import styles from './MethodologiesAdminPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { EntitiesAdminTable } from 'components/entities/common/EntitiesAdminTable';
import { useAdminMethodologies } from 'hooks/queries/entities/methodology/useAdminMethodologies';
import { MethodologiesFiltration } from 'components/entities/methodology/MethodologyFiltration/MethodologiesFiltration';

type Props = {
  isArchived?: boolean;
};

export const MethodologiesAdminPage = (props: Props) => {
  const { isArchived } = props;

  const [page, setPage] = useState(1);
  const [limit] = useState(50);

  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const { methodologies, isLoading, getMethodologies } = useAdminMethodologies(
    !!isArchived
  );

  useEffect(() => {
    getMethodologies(page, limit);
  }, [page, limit]);

  useEffect(() => {
    setSortBy((params.sortBy as any) || '');
    setSortDirection((params.sortDirection as any) || '');
  }, [params]);

  const handleSearchClick = () => {
    if (page === 1) {
      getMethodologies(page, limit);
    } else {
      setPage(1);
    }
  };

  const handleClearClick = () => {
    if (page === 1) {
      getMethodologies(page, limit, {
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
      getMethodologies(page, limit, preparedQueryParams as any);
    } else {
      setPage(1);
    }
  };

  return (
    <>
      <MethodologiesFiltration
        isAdmin
        onSearchClick={handleSearchClick}
        onClearClick={handleClearClick}
      />
      <EntitiesAdminTable
        isArchived={!!isArchived}
        data={methodologies.items}
        total={methodologies.total}
        page={page}
        limit={limit}
        isLoading={isLoading}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onColumnHeaderClick={handleColumnHeaderClick}
        onUpdatePage={handleUpdatePage}
        entityPath="methodologies"
      />
    </>
  );
};
