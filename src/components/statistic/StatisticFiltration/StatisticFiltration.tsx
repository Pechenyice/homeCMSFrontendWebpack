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
import { useOrganizationTypes } from 'hooks/queries/useOrganizationTypes';

type Props = {
  onSearchClick: () => void;
  onClearClick: () => void;
};

const defaultState = {
  district_ids: [],
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
  const {
    apiData: organizationTypes,
    apiError: organizationTypesApiError,
    isLoading: organizationTypesLoading,
    isError: organizationTypesError,
  } = useOrganizationTypes();

  const [isOpened, setIsOpened] = useState(false);

  //default values for filtration
  const [state, setState] = useState({
    ...defaultState,
    ...parseFilterParams(params, ['district_ids', 'organization_type_ids']),
  });

  const getPreparedQueryParams = () => {
    const preparedQueryParams = {
      district_ids: !state.district_ids.length
        ? undefined
        : state.district_ids.join(','),
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
          <div className={styles.mainFiltration__item}>
            {districtsLoading ? (
              <Skeleton
                mode={ESkeletonMode.INPUT}
                withLoader
                heading="Принадлежность"
              />
            ) : districtsError ? (
              <Input value={''} heading="Принадлежность" readOnly />
            ) : (
              <MultipleSelect
                emptyText="Не выбрано"
                unselectedText="Не выбрано"
                values={state.district_ids}
                options={districts!}
                heading="Принадлежность"
                onChangeOption={bindMultipleSelectChange('district_ids')}
              />
            )}
          </div>
          <div className={styles.mainFiltration__item}>
            {organizationTypesLoading ? (
              <Skeleton
                mode={ESkeletonMode.INPUT}
                withLoader
                heading="Тип организации"
              />
            ) : organizationTypesError ? (
              <Input value={''} heading="Тип организации" readOnly />
            ) : (
              <MultipleSelect
                emptyText="Не выбрано"
                unselectedText="Не выбрано"
                values={state.organization_type_ids}
                options={organizationTypes!}
                heading="Тип организации"
                onChangeOption={bindMultipleSelectChange(
                  'organization_type_ids'
                )}
              />
            )}
          </div>
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
