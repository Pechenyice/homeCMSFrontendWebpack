import { useEffect, useState } from 'react';
import styles from './LibraryPage.module.scss';
import { ProjectsFiltration } from 'components/entities/project/ProjectsFiltration/ProjectsFiltration';
import { useSearchParams } from 'react-router-dom';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { useAdminProjects } from 'hooks/queries/entities/project/useAdminProjects';
import { EntitiesAdminTable } from 'components/entities/common/EntitiesAdminTable';
import { useLibrary } from 'hooks/queries/admin/useLibrary';
import { LibraryFiltration } from 'components/LibraryFiltration/LibraryFiltration';
import { LibraryTable } from 'components/LibraryTable/LibraryTable';

export const LibraryPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(50);

  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const { libraryWords, isLoading, getLibraryWords } = useLibrary();

  useEffect(() => {
    getLibraryWords(page, limit);
  }, [page, limit]);

  useEffect(() => {
    setSortBy((params.sortBy as any) || '');
    setSortDirection((params.sortDirection as any) || '');
  }, [params]);

  const handleSearchClick = () => {
    if (page === 1) {
      getLibraryWords(page, limit);
    } else {
      setPage(1);
    }
  };

  const handleClearClick = () => {
    if (page === 1) {
      getLibraryWords(page, limit, {
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
      getLibraryWords(page, limit, preparedQueryParams as any);
    } else {
      setPage(1);
    }
  };

  return (
    <>
      <LibraryFiltration
        onSearchClick={handleSearchClick}
        onClearClick={handleClearClick}
      />
      <LibraryTable
        data={libraryWords.items}
        total={libraryWords.total}
        page={page}
        limit={limit}
        isLoading={isLoading}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onColumnHeaderClick={handleColumnHeaderClick}
        onUpdatePage={handleUpdatePage}
      />
    </>
  );
};
