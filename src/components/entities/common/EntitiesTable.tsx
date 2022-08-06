import styles from './common.module.scss';
import { IAPIEntitiesListElement } from 'types/entities/entities';
import { ChevronLeftIcon, ChevronRightIcon } from 'assets/icons';
import {
  ELoaderPalette,
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
    title: 'Дата создания',
    dataIndex: 'created_at',
    key: 'creation',
  },
  {
    title: 'Дата изменения',
    dataIndex: 'updated_at',
    key: 'edition',
  },
  {
    title: 'Рейтинг',
    dataIndex: 'rating',
    key: 'rating',
  },
];

const SORTING_COLUMNS = ['created_at', 'updated_at', 'rating'];

type Props = {
  data: IAPIEntitiesListElement[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  sortBy: string;
  sortDirection: string;
  onColumnHeaderClick: (columnHeader: string) => void;
  onUpdatePage: (page: number) => void;
};

export const EntitiesTable = ({
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
  const getCellContent = (row: IAPIEntitiesListElement, dataIndex: string) => {
    return dataIndex === 'name' ? (
      <Text>{row[dataIndex as keyof typeof row]}</Text>
    ) : dataIndex === 'status' ? (
      <Status
        className={styles.fit}
        status={
          EProposalStatus[
            row[dataIndex as keyof typeof row]
              .toString()
              .toUpperCase() as keyof typeof EProposalStatus
          ]
        }
      />
    ) : dataIndex === 'rating' ? (
      <Rating stars={row[dataIndex as keyof typeof row] as any} />
    ) : (
      <Text>{formatDate(new Date(row[dataIndex as keyof typeof row]))}</Text>
    );
  };

  const tableHeader = (
    <div className={styles.table__header}>
      {COLUMNS.map((column, index) => {
        const withSorting = SORTING_COLUMNS.includes(column.dataIndex);

        const isSortedByThisColumn = sortBy === column.dataIndex;
        const sortingOrder = sortDirection === 'DESC' ? '⯆' : '⯅';
        const sortingContent = isSortedByThisColumn ? sortingOrder : null;

        return (
          <div
            className={combineClasses(
              withSorting ? styles.table__columnHeader_sorting : '',
              index
                ? styles.table__columnHeader_main
                : styles.table__columnHeader_secondary
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
      {data.map((row, rowIndex) => (
        <div className={styles.table__row} key={row.id}>
          {Object.values(COLUMNS).map((value, columnIndex) => (
            <div
              className={
                columnIndex
                  ? styles.table__row_main
                  : styles.table__row_secondary
              }
              key={value.key}
            >
              {getCellContent(row, value.dataIndex)}
            </div>
          ))}
        </div>
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
            <H4>/ {maxPagesNumber}</H4>
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
      <H4>С данными фильтрами ничего не найдено</H4>
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
