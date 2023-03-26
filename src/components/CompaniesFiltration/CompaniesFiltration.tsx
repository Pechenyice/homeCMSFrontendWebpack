import { ChevronLeftIcon, SearchIcon } from 'assets/icons';
import {
  Button,
  ESkeletonMode,
  Input,
  Select,
  Skeleton,
  Text,
} from 'components/kit';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import styles from './CompaniesFiltration.module.scss';
import { useSearchParams } from 'react-router-dom';
import { combineClasses, getValueByIdFromSelect } from 'utils/common';
import { STATUS_OPTIONS, YES_NO_OPTIONS } from './../../constants';
import { useDistricts } from 'hooks/queries/useDistricts';

type Props = {
  isAdmin?: boolean;
  onSearchClick: () => void;
  onClearClick: () => void;
};

const defaultState = {
  name: '',
  status: -1,
  district_id: -1,

  is_education_license: -1,
  is_medical_license: -1,
  is_has_innovative_platform: -1,
};

export const CompaniesFiltration = ({
  isAdmin,
  onSearchClick,
  onClearClick,
}: Props) => {
  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  const {
    apiData: districts,
    isLoading: districtsLoading,
    isError: districtsError,
  } = useDistricts();

  const [isOpened, setIsOpened] = useState(false);

  //default values for filtration
  const [state, setState] = useState({
    ...defaultState,
    ...params,
  });

  const handleToggleIsOpened = () => {
    setIsOpened(!isOpened);
  };

  const getPreparedQueryParams = () => {
    const preparedQueryParams = {
      name: state.name || undefined,
      status: state.status === -1 ? undefined : state.status,

      district_id: state.district_id === -1 ? undefined : state.district_id,

      is_education_license:
        state.is_education_license === -1
          ? undefined
          : state.is_education_license,
      is_medical_license:
        state.is_medical_license === -1 ? undefined : state.is_medical_license,
      is_has_innovative_platform:
        state.is_has_innovative_platform === -1
          ? undefined
          : state.is_has_innovative_platform,
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
    <div
      className={combineClasses(
        styles.wrapper,
        isOpened ? styles.wrapper_opened : ''
      )}
    >
      <div className={styles.inner}>
        <div className={styles.mainFiltration}>
          <Input
            className={styles.search}
            leftIcon={<SearchIcon />}
            placeholder="Поиск..."
            value={state.name}
            heading="Поиск по наименованию"
            onChange={bindChange('name')}
          />

          <div className={styles.filter}>
            {districtsLoading ? (
              <Skeleton
                mode={ESkeletonMode.INPUT}
                withLoader
                heading="Принадлежность"
              />
            ) : districtsError ? (
              <Input value={''} heading="Принадлежность" readOnly />
            ) : (
              <Select
                withUnselect
                emptyText="Все"
                unselectedText="Все"
                value={isNaN(+state.district_id) ? -1 : +state.district_id}
                options={districts!}
                heading="Принадлежность"
                onChangeOption={bindSelectChange('district_id')}
              />
            )}
          </div>

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

      <div
        className={combineClasses(
          styles.filtrationAddon,
          isOpened ? styles.filtrationAddon_opened : ''
        )}
      >
        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={
            isNaN(+state.is_education_license)
              ? -1
              : +state.is_education_license
          }
          options={YES_NO_OPTIONS}
          heading="Наличие лицензии на образ. деятельность"
          onChangeOption={bindSelectChange('is_education_license')}
        />
        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={
            isNaN(+state.is_medical_license) ? -1 : +state.is_medical_license
          }
          options={YES_NO_OPTIONS}
          heading="Наличие лицензии на мед. деятельность"
          onChangeOption={bindSelectChange('is_medical_license')}
        />
        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={
            isNaN(+state.is_has_innovative_platform)
              ? -1
              : +state.is_has_innovative_platform
          }
          options={YES_NO_OPTIONS}
          heading="Наличие иновационной площадки"
          onChangeOption={bindSelectChange('is_has_innovative_platform')}
        />
      </div>

      <div className={styles.openedBlock}>
        <div
          className={styles.openedBlock__control}
          onClick={handleToggleIsOpened}
        >
          {isOpened ? (
            <Text isMedium>Скрыть</Text>
          ) : (
            <Text isMedium>Показать</Text>
          )}
          <div
            className={
              isOpened ? styles.chevron_rotatedReverse : styles.chevron_rotated
            }
          >
            <ChevronLeftIcon className={styles.chevron} />
          </div>
        </div>
      </div>
    </div>
  );
};
