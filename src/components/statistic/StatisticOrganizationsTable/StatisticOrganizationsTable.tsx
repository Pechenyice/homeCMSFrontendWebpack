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
import {
  IStatisticOrganization,
  IStatisticOrganizationBlock,
} from 'types/admin/statistic';

type Props = {
  data: IStatisticOrganization[];
  total: IStatisticOrganizationBlock;
  isLoading: boolean;
};

const rowMapper = (row: IStatisticOrganization) => ({
  name: row.name,

  project_count: row.jobs.social_project.count,
  project_membersCount: row.jobs.social_project.member_count,

  educationProgram_count: row.jobs.edu_program.count,
  educationProgram_membersCount: row.jobs.edu_program.member_count,

  club_count: row.jobs.club.count,
  club_membersCount: row.jobs.club.member_count,

  socialWork_count: row.jobs.social_work.count,
  socialWork_membersCount: row.jobs.social_work.member_count,

  methodology_count: row.jobs.methodology.count,
  methodology_membersCount: row.jobs.methodology.member_count,
});

export const StatisticOrganizationsTable = ({
  data,
  total,
  isLoading,
}: Props) => {
  const COLUMNS = [
    {
      title: 'Название организации',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Проекты',
      dataIndex: 'project_count',
      key: 'project_count',
    },
    {
      title: 'Кол-во уч.',
      dataIndex: 'project_membersCount',
      key: 'project_membersCount',
    },

    {
      title: 'Программы ДО',
      dataIndex: 'educationProgram_count',
      key: 'educationProgram_count',
    },
    {
      title: 'Кол-во уч.',
      dataIndex: 'educationProgram_membersCount',
      key: 'educationProgram_membersCount',
    },

    {
      title: 'Клубы',
      dataIndex: 'club_count',
      key: 'club_count',
    },
    {
      title: 'Кол-во уч.',
      dataIndex: 'club_membersCount',
      key: 'club_membersCount',
    },

    {
      title: 'Программы СР',
      dataIndex: 'socialWork_count',
      key: 'socialWork_count',
    },
    {
      title: 'Кол-во уч.',
      dataIndex: 'socialWork_membersCount',
      key: 'socialWork_membersCount',
    },

    {
      title: 'Метод. и техн.',
      dataIndex: 'methodology_count',
      key: 'methodology_count',
    },
    {
      title: 'Кол-во уч.',
      dataIndex: 'methodology_membersCount',
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

  const tableHeader = (
    <div className={styles.table__header}>
      {COLUMNS.map((column, index) => {
        return (
          <div
            className={combineClasses(
              index
                ? styles.table__columnHeader_secondary
                : styles.table__columnHeader_main
            )}
            key={column.key}
          >
            <H4 className={styles.table__columnHeader_label}>
              {column.title.toUpperCase()}
            </H4>
          </div>
        );
      })}
    </div>
  );

  const tableContent = (
    <div className={styles.table__content}>
      {data?.map(rowMapper).map((row, rowIndex) => (
        <div className={styles.table__row} key={row.name}>
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
      ))}

      <div
        className={combineClasses(styles.table__row, styles.table__row_total)}
        key="total"
      >
        {Object.values(COLUMNS).map((value, columnIndex) => (
          <div
            className={
              columnIndex ? styles.table__row_secondary : styles.table__row_main
            }
            key={value.key}
          >
            {getCellContent(
              rowMapper({
                jobs: { ...total },
                name: 'Итого: ',
                full_name: 'Итого: ',
              }),
              value.dataIndex
            )}
          </div>
        ))}
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

  return (
    <div className={styles.table__wrapper}>
      {tableHeader}
      {selectedContent}
      {tableFooter}
    </div>
  );
};
