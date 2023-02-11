import {
  Button,
  ESkeletonMode,
  Input,
  MultipleSelect,
  Skeleton,
  Text,
} from 'components/kit';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import styles from './StatisticFiltration.module.scss';
import { useSearchParams } from 'react-router-dom';
import { combineClasses, getValueByIdFromSelect } from 'utils/common';
import { useDistricts } from 'hooks/queries/useDistricts';
import { parseFilterParams } from 'utils/parse';

type Props = {
  onSearchClick: () => void;
  onClearClick: () => void;
};

const defaultState = {
  organization_type_ids: [],
};

export const StatisticFiltration = ({ onSearchClick, onClearClick }: Props) => {
  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  const {
    apiData: districts,
    apiError: districtsApiError,
    isLoading: districtsLoading,
    isError: districtsError,
  } = useDistricts();

  const [isOpened, setIsOpened] = useState(false);

  //default values for filtration
  const [state, setState] = useState({
    ...defaultState,
    ...parseFilterParams(params, ['organization_type_ids']),
  });

  const getPreparedQueryParams = () => {
    const preparedQueryParams = {
      organization_type_ids: !state.organization_type_ids.length
        ? undefined
        : state.organization_type_ids.join(','),
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

  const bindMultipleSelectChange = (name: string, clearName?: string) => (
    id: number
  ) => {
    const isIdSelected = (state as any)[name].includes(id);

    const newMultipleSelect = isIdSelected
      ? (state as any)[name].filter((elem: number) => elem !== id)
      : [...(state as any)[name], id];

    if (clearName) {
      setState({
        ...state,
        [name]: newMultipleSelect,
        [clearName]: [],
      });
    } else {
      setState({ ...state, [name]: newMultipleSelect });
    }
  };

  return (
    <div
      className={combineClasses(
        styles.wrapper,
        isOpened ? styles.wrapper_opened : ''
      )}
    >
      <div className={styles.inner}>
        <div className={styles.mainFiltration}>
          {districtsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Категории РНСУ"
            />
          ) : districtsError ? (
            <Input value={''} heading="Категории РНСУ" readOnly />
          ) : (
            <MultipleSelect
              emptyText="Не выбрано"
              unselectedText="Не выбрано"
              values={state.organization_type_ids}
              options={districts!}
              heading="Подведомственное КСП, администрации района или СО НКО"
              onChangeOption={bindMultipleSelectChange('organization_type_ids')}
            />
          )}
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
    </div>
  );
};
