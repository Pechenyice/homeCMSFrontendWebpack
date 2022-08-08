import { SearchIcon } from 'assets/icons';
import { Button, Input, Select, Text } from 'components/kit';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import styles from './ProjectsFiltration.module.scss';
import { useSearchParams } from 'react-router-dom';

type Props = {
  isAdmin?: boolean;
  onSearchClick: () => void;
  onClearClick: () => void;
};

const STATUS_OPTIONS = [
  { id: 0, label: 'Подтвержден' },
  { id: 1, label: 'На рассмотрении' },
  { id: 2, label: 'Отклонен' },
];

const defaultState = {
  name: '',
  status: -1,
};

export const ProjectsFiltration = ({
  isAdmin,
  onSearchClick,
  onClearClick,
}: Props) => {
  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  //default values for filtration
  const [state, setState] = useState({
    ...defaultState,
    ...params,
  });

  const getPreparedQueryParams = () => {
    const preparedQueryParams = {
      name: state.name || undefined,
      status: state.status === -1 ? undefined : state.status,
    };

    const withSortingPreparedQueryParams = {
      ...preparedQueryParams,
      sortBy: params.sortBy || undefined,
      sortDirection: params.sortDirection || undefined,
    };

    return JSON.parse(JSON.stringify(withSortingPreparedQueryParams));
  };

  const getPreparedQueryParamsKeysWithoutSorting = () => {
    let queryParams = getPreparedQueryParams();
    queryParams = Object.keys(queryParams)
      .map((key) =>
        key === 'sortBy' || key === 'sortDirection' ? undefined : key
      )
      .filter((key) => !!key);

    return queryParams;
  };

  useEffect(() => {
    const preparedQueryParams = getPreparedQueryParams();

    setSearchParams(preparedQueryParams as any);
  }, [state]);

  const notEmptyFiltersCount = useMemo(
    () => getPreparedQueryParamsKeysWithoutSorting().length,
    [state]
  );

  const clearFilters = () => {
    if (!getPreparedQueryParamsKeysWithoutSorting().length) return;

    setState(defaultState);
    onClearClick();
  };

  const bindChange = (name: string) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setState({ ...state, [name]: e.target.value });

  const bindSelectChange = (name: string) => (id: number) =>
    setState({ ...state, [name]: id });

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainFiltration}>
        <Input
          className={styles.search}
          leftIcon={<SearchIcon />}
          placeholder="Поиск..."
          value={state.name}
          heading="Поиск по наименованию"
          onChange={bindChange('name')}
        />

        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={isNaN(+state.status) ? -1 : +state.status}
          options={STATUS_OPTIONS}
          heading="Статус"
          onChangeOption={bindSelectChange('status')}
        />
      </div>

      <div className={styles.actionsFiltration}>
        <Text className={styles.clear} isMedium onClick={clearFilters}>
          Сбросить ({notEmptyFiltersCount})
        </Text>
        <Button onClick={onSearchClick} className={styles.action}>
          <Text isMedium>Поиск</Text>
        </Button>
      </div>
    </div>
  );
};
