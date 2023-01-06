import styles from './common.module.scss';
import {
  IAPIAdminEntitiesArchiveListElement,
  IAPIAdminEntitiesListElement,
  IAPIEntitiesListElement,
} from 'types/entities/entities';
import { ChevronLeftIcon, ChevronRightIcon } from 'assets/icons';
import {
  ELoaderPalette,
  H3,
  H4,
  Loader,
  Rating,
  Status,
  Text,
} from 'components/kit';
import { ChangeEvent, useEffect, useState } from 'react';
import { combineClasses } from 'utils/common';
import { EProposalStatus } from 'types/enums';
import { formatDate } from 'utils/format';
import { Link } from 'react-router-dom';
import { ILibraryWord } from 'types/admin/library';

type Props = {
  data: ILibraryWord[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  sortBy: string;
  sortDirection: string;
  onColumnHeaderClick: (columnHeader: string) => void;
  onUpdatePage: (page: number) => void;
};

export const LibraryTable = ({
  data,
  total,
  page,
  limit,
  isLoading,
  sortBy,
  sortDirection,
  onColumnHeaderClick,
  onUpdatePage,
}: Props) => {
  const COLUMNS = [
    {
      title: 'Слово',
      dataIndex: 'word',
      key: 'word',
    },
    {
      title: 'Значение',
      dataIndex: 'meaning',
      key: 'meaning',
    },
  ];

  const SORTING_COLUMNS: string[] = [];

  const [localPageState, setLocalPageState] = useState(page);

  useEffect(() => {
    if (localPageState !== page) setLocalPageState(page);
  }, [page]);

  const totalNumber = total;
  const maxPagesNumber = Math.ceil(total / limit);

  let startNumber = (page - 1) * limit + 1;
  startNumber = totalNumber === 0 ? 0 : startNumber;
  let endNumber = startNumber + limit - 1;
  endNumber = endNumber > total ? total : endNumber;

  const handleSafeUpdatePage = (newPage: number) => {
    if (newPage < 1 || newPage > maxPagesNumber) return;
    if (newPage === page) {
      setLocalPageState(newPage);
      return;
    }

    setLocalPageState(newPage);
    onUpdatePage(newPage);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalPageState(+e.target.value);
  };

  const handleBlur = () => {
    let pageToCheck = localPageState;

    if (isNaN(pageToCheck)) pageToCheck = page;
    if (pageToCheck < 0) pageToCheck = 1;
    if (pageToCheck > maxPagesNumber) pageToCheck = maxPagesNumber;

    handleSafeUpdatePage(pageToCheck);
  };

  const handleBindFilter = (columnName: string) => () =>
    onColumnHeaderClick(columnName);

  //simple switch for cells type rendering
  const getCellContent = (row: ILibraryWord, dataIndex: string) => {
    return <Text>{row[dataIndex as keyof typeof row]}</Text>;
  };

  const tableHeader = (
    <div className={styles.table__header}>
      {COLUMNS.map((column, index) => {
        const withSorting = SORTING_COLUMNS.includes(column.dataIndex);

        const isSortedByThisColumn = sortBy === column.dataIndex;
        const sortingOrder = sortDirection === 'desc' ? '⯆' : '⯅';
        const sortingContent = isSortedByThisColumn ? sortingOrder : null;

        return (
          <div
            className={combineClasses(
              withSorting ? styles.table__columnHeader_sorting : '',
              index
                ? styles.table__columnHeader_secondary
                : styles.table__columnHeader_main
            )}
            onClick={
              withSorting ? handleBindFilter(column.dataIndex) : undefined
            }
            key={column.key}
          >
            <H4 className={styles.table__columnHeader_label}>
              {column.title.toUpperCase()} {sortingContent}
            </H4>
          </div>
        );
      })}
    </div>
  );

  const tableContent = (
    <div className={styles.table__content}>
      {data?.map((row, rowIndex) => (
        <Link className={styles.link} to={`/library/${row.id}`}>
          <div className={styles.table__row} key={row.id}>
            {Object.values(COLUMNS).map((value, columnIndex) => (
              <div
                className={
                  columnIndex
                    ? styles.table__row_secondary
                    : styles.table__row_main
                }
                key={value.key}
              >
                {getCellContent(row, value.dataIndex)}
              </div>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );

  const tableFooter = (
    <div className={styles.table__footer}>
      <div className={styles.table__footerInfo}>
        <H4>
          Показано: {startNumber} - {endNumber} из {totalNumber}
        </H4>
      </div>
      {!!totalNumber && (
        <div className={styles.table__footerPagination}>
          <ChevronLeftIcon
            className={styles.table__footerControl}
            onClick={() => handleSafeUpdatePage(page - 1)}
          />
          <div className={styles.table__footerPaginationController}>
            <input
              type="number"
              className={styles.table__paginator}
              value={localPageState}
              onChange={handleChange}
              onBlur={handleBlur}
            />{' '}
            <H3 className={styles.table__paginatorHeading}>
              из {maxPagesNumber}
            </H3>
          </div>
          <ChevronRightIcon
            className={styles.table__footerControl}
            onClick={() => handleSafeUpdatePage(page + 1)}
          />
        </div>
      )}
    </div>
  );

  const selectedContent = isLoading ? (
    <div className={styles.table__loader}>
      <Loader palette={ELoaderPalette.DARK} />
    </div>
  ) : totalNumber ? (
    tableContent
  ) : (
    <div className={styles.table__loader}>
      <H4>По вашему запросу ничего не найдено</H4>
    </div>
  );

  return (
    <div className={styles.table__wrapper}>
      {tableHeader}
      {selectedContent}
      {tableFooter}
    </div>
  );
};
