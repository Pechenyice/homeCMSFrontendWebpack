import styles from './common.module.scss';
import {
  IAPIAdminEntitiesArchiveListElement,
  IAPIAdminEntitiesListElement,
  IAPIEntitiesListElement,
} from 'types/entities/entities';
import { ChevronLeftIcon, ChevronRightIcon } from 'assets/icons';
import {
  Checkbox,
  ELoaderPalette,
  H2,
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
import {
  IStatisticOrganizationBlockCamel,
  IStatisticOrganizationCamel,
} from 'types/admin/statistic';

type Props = {
  data: IStatisticOrganizationCamel[];
  total: IStatisticOrganizationBlockCamel;
  isLoading: boolean;
  sortBy: string;
  sortDirection: string;
  onColumnHeaderClick: (columnHeader: string) => void;
};

const rowMapper = (row: IStatisticOrganizationCamel) => ({
  name: row.name,

  project_count: row.jobs.project.count,
  project_membersCount: row.jobs.project.membersCount,

  educationProgram_count: row.jobs.educationProgram.count,
  educationProgram_membersCount: row.jobs.educationProgram.membersCount,

  club_count: row.jobs.club.count,
  club_membersCount: row.jobs.club.membersCount,

  socialWork_count: row.jobs.socialWork.count,
  socialWork_membersCount: row.jobs.socialWork.membersCount,

  methodology_count: row.jobs.methodology.count,
  methodology_membersCount: row.jobs.methodology.membersCount,
});

export const StatisticOrganizationsTable = ({
  data,
  total,
  isLoading,
  sortBy,
  sortDirection,
  onColumnHeaderClick,
}: Props) => {
  const [filteredColumns, setFilteredColumns] = useState<string[]>([]);

  const COLUMNS = [
    {
      title: 'Название организации',
      dataIndex: 'name',
      group: 'company',
      key: 'name',
    },

    {
      title: 'Проекты',
      dataIndex: 'project_count',
      sortIndex: 'social_project.count',
      group: 'project',
      key: 'project_count',
    },
    {
      title: 'Кол-во уч.',
      dataIndex: 'project_membersCount',
      sortIndex: 'social_project.member_count',
      group: 'project',
      key: 'project_membersCount',
    },

    {
      title: 'Програм. ДО',
      dataIndex: 'educationProgram_count',
      sortIndex: 'edu_program.count',
      group: 'education',
      key: 'educationProgram_count',
    },
    {
      title: 'Кол-во уч.',
      dataIndex: 'educationProgram_membersCount',
      sortIndex: 'edu_program.member_count',
      group: 'education',
      key: 'educationProgram_membersCount',
    },

    {
      title: 'Клубы',
      dataIndex: 'club_count',
      sortIndex: 'club.count',
      group: 'club',
      key: 'club_count',
    },
    {
      title: 'Кол-во уч.',
      dataIndex: 'club_membersCount',
      sortIndex: 'club.member_count',
      group: 'club',
      key: 'club_membersCount',
    },

    {
      title: 'Соц. работы',
      dataIndex: 'socialWork_count',
      sortIndex: 'social_work.count',
      group: 'socialWork',
      key: 'socialWork_count',
    },
    {
      title: 'Кол-во уч.',
      dataIndex: 'socialWork_membersCount',
      sortIndex: 'social_work.member_count',
      group: 'socialWork',
      key: 'socialWork_membersCount',
    },

    {
      title: 'Метод. и техн.',
      dataIndex: 'methodology_count',
      sortIndex: 'methodology.count',
      group: 'methodology',
      key: 'methodology_count',
    },
    {
      title: 'Кол-во уч.',
      dataIndex: 'methodology_membersCount',
      sortIndex: 'methodology.member_count',
      group: 'methodology',
      key: 'methodology_membersCount',
    },
  ];

  //simple switch for cells type rendering
  const getCellContent = (
    row: ReturnType<typeof rowMapper>,
    dataIndex: string
  ) => {
    return <Text>{row[dataIndex as keyof typeof row]}</Text>;
  };

  const getFinalCellsContent = (row: ReturnType<typeof rowMapper>) => {
    return (
      <>
        <div className={styles.table__row_secondary}>
          <Text>
            {String(
              row.project_count +
                row.club_count +
                row.educationProgram_count +
                row.methodology_count +
                row.socialWork_count
            )}
          </Text>
        </div>
        <div className={styles.table__row_secondary}>
          <Text>
            {String(
              row.project_membersCount +
                row.club_membersCount +
                row.educationProgram_membersCount +
                row.methodology_membersCount +
                row.socialWork_membersCount
            )}
          </Text>
        </div>
      </>
    );
  };

  const handleBindFilter = (columnName: string) => () =>
    onColumnHeaderClick(columnName);

  const tableHeader = (
    <div className={styles.table__header}>
      {COLUMNS.filter((column) => !filteredColumns.includes(column.group)).map(
        (column, index) => {
          const withSorting = !!column.sortIndex;

          const isSortedByThisColumn = sortBy === column.sortIndex;
          const sortingOrder = sortDirection === 'DESC' ? '⯆' : '⯅';
          const sortingContent = isSortedByThisColumn ? sortingOrder : null;

          return (
            <div
              className={combineClasses(
                styles.table__columnHeader,
                withSorting ? styles.table__columnHeader_sorting : '',
                index
                  ? styles.table__columnHeader_secondary
                  : styles.table__columnHeader_main
              )}
              onClick={
                withSorting ? handleBindFilter(column.sortIndex) : undefined
              }
              key={column.key}
            >
              <H4 className={styles.table__columnHeader_label}>
                {column.title.toUpperCase()} {sortingContent}
              </H4>
            </div>
          );
        }
      )}

      <div
        className={combineClasses(
          styles.table__columnHeader,
          styles.table__columnHeader_secondary
        )}
      >
        <H4 className={styles.table__columnHeader_label}>ВСЕГО ПРАКТИК</H4>
      </div>
      <div
        className={combineClasses(
          styles.table__columnHeader,
          styles.table__columnHeader_secondary
        )}
      >
        <H4 className={styles.table__columnHeader_label}>ВСЕГО УЧ.</H4>
      </div>
    </div>
  );

  const tableContent = (
    <div className={styles.table__content}>
      {data?.map(rowMapper).map((row, rowIndex) => (
        <div className={styles.table__row} key={row.name}>
          {Object.values(COLUMNS)
            .filter((column) => !filteredColumns.includes(column.group))
            .map((value, columnIndex) => (
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

          {getFinalCellsContent(row)}
        </div>
      ))}

      <div
        className={combineClasses(styles.table__row, styles.table__row_total)}
        key="total"
      >
        {Object.values(COLUMNS)
          .filter((column) => !filteredColumns.includes(column.group))
          .map((value, columnIndex) => (
            <div
              className={
                columnIndex
                  ? styles.table__row_secondary
                  : styles.table__row_main
              }
              key={value.key}
            >
              {getCellContent(
                rowMapper({
                  jobs: { ...total },
                  name: 'Итого: ',
                  fullName: 'Итого: ',
                }),
                value.dataIndex
              )}
            </div>
          ))}

        {getFinalCellsContent(
          rowMapper({
            jobs: { ...total },
            name: 'Итого: ',
            fullName: 'Итого: ',
          })
        )}
      </div>
    </div>
  );

  const tableFooter = (
    <div className={styles.table__footer}>
      <div className={styles.table__footerInfo}>
        <H4>Показано: {data.length} организаций</H4>
      </div>
    </div>
  );

  const selectedContent = isLoading ? (
    <div className={styles.table__loader}>
      <Loader palette={ELoaderPalette.DARK} />
    </div>
  ) : (
    tableContent
  );

  const bindSwitchColumn = (columnKey: string) => () => {
    setFilteredColumns((oldValue) =>
      oldValue.includes(columnKey)
        ? oldValue.filter((entry) => entry !== columnKey)
        : [...oldValue, columnKey]
    );
  };

  const groups = ['project', 'education', 'club', 'socialWork', 'methodology'];

  const translateGroup = (group: string) => {
    if (group === 'project') return 'Проекты';
    if (group === 'education') return 'Программы ДО';
    if (group === 'club') return 'Клубы';
    if (group === 'socialWork') return 'Социальные работы';
    if (group === 'methodology') return 'Методики и технологии';

    return '';
  };

  return (
    <div className={styles.box}>
      <div className={styles.group}>
        <H3>Отображение столбцов:</H3>
        {groups.map((group) => (
          <div
            className={styles.group__item}
            key={`enableColumn_${group}`}
            onClick={bindSwitchColumn(group)}
          >
            {translateGroup(group)}
            <Checkbox
              className={styles.group__item_checkbox}
              checked={!filteredColumns.includes(group)}
            />
          </div>
        ))}
      </div>
      <div className={styles.table__wrapper}>
        {tableHeader}
        {selectedContent}
        {tableFooter}
      </div>
    </div>
  );
};
