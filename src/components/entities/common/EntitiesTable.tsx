import styles from './common.module.scss';
import { IAPIEntitiesListElement } from 'types/entities/entities';
import { ChevronLeftIcon, ChevronRightIcon } from 'assets/icons';
import { ELoaderPalette, H4, Loader, Text } from 'components/kit';
import { ChangeEvent, useState } from 'react';

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

type Props = {
  data: IAPIEntitiesListElement[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  onUpdatePage: (page: number) => void;
};

export const EntitiesTable = ({
  data,
  total,
  page,
  limit,
  isLoading,
  onUpdatePage,
}: Props) => {
  const [localPageState, setLocalPageState] = useState(page);

  const totalNumber = total;
  const maxPagesNumber = Math.ceil(total / limit);

  const startNumber = (page - 1) * limit + 1;
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

  const tableHeader = (
    <div className={styles.table__header}>
      {COLUMNS.map((column, index) => (
        <div
          className={
            index
              ? styles.table__columnHeader_main
              : styles.table__columnHeader_secondary
          }
          key={column.key}
        >
          <H4 className={styles.table__columnHeader_label}>
            {column.title.toUpperCase()}
          </H4>
        </div>
      ))}
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
              <Text>{row[value.dataIndex as keyof typeof row]}</Text>
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
    </div>
  );

  return (
    <div className={styles.table__wrapper}>
      {tableHeader}
      {isLoading ? (
        <div className={styles.table__loader}>
          <Loader palette={ELoaderPalette.DARK} />
        </div>
      ) : (
        tableContent
      )}
      {tableFooter}
    </div>
  );
};
