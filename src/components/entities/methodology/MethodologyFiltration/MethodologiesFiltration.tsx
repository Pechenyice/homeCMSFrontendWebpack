import { ChevronLeftIcon, SearchIcon } from 'assets/icons';
import {
  Button,
  ESkeletonMode,
  Input,
  MultipleSelect,
  Select,
  Skeleton,
  Text,
} from 'components/kit';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import styles from './MethodologiesFiltration.module.scss';
import { useSearchParams } from 'react-router-dom';
import { combineClasses } from 'utils/common';
import {
  RATING_OPTIONS,
  STATUS_OPTIONS,
  YES_NO_OPTIONS,
} from './../../../../constants';
import { useCategories } from 'hooks/queries/useCategories';
import { parseFilterParams } from 'utils/parse';
import { useGroups } from 'hooks/queries/useGroups';
import { useCategoriesToGroups } from 'hooks/queries/categoriesRelations/useCategoriesToGroups';
import { getRelatedCategoriesOptions } from 'utils/entities/common';
import { useRnsuCategory } from 'hooks/queries/useRnsuCategory';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { useAttractingVolunteer } from 'hooks/queries/useAttractingVolunteer';
import { useRealizationLevels } from 'hooks/queries/useRealizationLevels';
import { useCircumstancesRecognitionNeed } from 'hooks/queries/useCircumstancesRecognitionNeed';
import { useGosWorkNames } from 'hooks/queries/useGosWorkNames';
import { useWorksKinds } from 'hooks/queries/useWorksKinds';
import { useWorksNames } from 'hooks/queries/useWorksNames';
import { useWorksKindsToWorksNames } from 'hooks/queries/categoriesRelations/useWorksKindsToWorksNames';
import { useEntitiesYears } from 'hooks/queries/useEntitiesYears';
import { useDirections } from 'hooks/queries/useDirections';
import { usePrevalences } from 'hooks/queries/usePrevalences';
import { useApplicationPeriods } from 'hooks/queries/useApplicationPeriods';

type Props = {
  isAdmin?: boolean;
  onSearchClick: () => void;
  onClearClick: () => void;
};

const defaultState = {
  //common
  name: '',
  status: -1,
  rating: -1,
  year: -1,
  is_any_review: -1,
  is_approbation: -1,
  is_favorite: -1,
  is_publication: -1,
  is_remote_format: -1,
  is_practice_placed_in_asi_smarteka: -1,
  needy_category_ids: [],
  needy_category_target_group_ids: [],
  rnsu_category_ids: [],
  social_service_ids: [],
  need_recognition_ids: [],
  volunteer_id: -1,

  //specific
  public_work_ids: [],
  service_name_ids: [],
  service_type_ids: [],
  direction_id: -1,
  prevalence_id: -1,
  application_period_id: -1,
  is_effectiveness_study: -1,
};

const defaultAdminState = {
  ...defaultState,
  company: '',
};

export const MethodologiesFiltration = ({
  isAdmin,
  onSearchClick,
  onClearClick,
}: Props) => {
  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  // common
  const {
    apiData: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();
  const {
    apiData: groups,
    isLoading: groupsLoading,
    isError: groupsError,
  } = useGroups();
  const {
    apiData: categoriesToGroups,
    isLoading: categoriesToGroupsLoading,
    isError: categoriesToGroupsError,
  } = useCategoriesToGroups();

  const {
    apiData: rnsuCategory,
    isLoading: rnsuCategoryLoading,
    isError: rnsuCategoryError,
  } = useRnsuCategory();
  const {
    apiData: socialHelpForm,
    isLoading: socialHelpFormLoading,
    isError: socialHelpFormError,
  } = useSocialHelpForm();
  const {
    apiData: attractingVolunteer,
    isLoading: attractingVolunteerLoading,
    isError: attractingVolunteerError,
  } = useAttractingVolunteer();

  const {
    apiData: circumstancesRecognitionNeed,
    isLoading: circumstancesRecognitionNeedLoading,
    isError: circumstancesRecognitionNeedError,
  } = useCircumstancesRecognitionNeed();

  const {
    apiData: entitiesYears,
    isLoading: entitiesYearsLoading,
    isError: entitiesYearsError,
  } = useEntitiesYears();

  // specific
  const {
    apiData: prevalences,
    isLoading: prevalencesLoading,
    isError: prevalencesError,
  } = usePrevalences();
  const {
    apiData: applicationPeriods,
    isLoading: applicationPeriodsLoading,
    isError: applicationPeriodsError,
  } = useApplicationPeriods();

  const {
    apiData: directions,
    isLoading: directionsLoading,
    isError: directionsError,
  } = useDirections();
  const {
    apiData: gosWorkNames,
    isLoading: gosWorkNamesLoading,
    isError: gosWorkNamesError,
  } = useGosWorkNames();

  const {
    apiData: worksKinds,
    isLoading: worksKindsLoading,
    isError: worksKindsError,
  } = useWorksKinds();
  const {
    apiData: worksNames,
    isLoading: worksNamesLoading,
    isError: worksNamesError,
  } = useWorksNames();
  const {
    apiData: worksKindsToWorksNames,
    isLoading: worksKindsToWorksNamesLoading,
    isError: worksKindsToWorksNamesError,
  } = useWorksKindsToWorksNames();

  const [isOpened, setIsOpened] = useState(false);

  //default values for filtration
  const [state, setState] = useState({
    ...(isAdmin ? defaultAdminState : defaultState),
    ...parseFilterParams(params, [
      'needy_category_ids',
      'needy_category_target_group_ids',
      'rnsu_category_ids',
      'social_service_ids',
      'need_recognition_ids',
      'public_work_ids',
      'service_name_ids',
      'service_type_ids',
    ]),
  });

  const handleToggleIsOpened = () => {
    setIsOpened(!isOpened);
  };

  const getPreparedQueryParams = () => {
    const preparedQueryParams = {
      //common
      name: state.name || undefined,
      status: state.status === -1 ? undefined : state.status,

      year: state.year === -1 ? undefined : state.year,
      rating: state.rating === -1 ? undefined : state.rating,
      is_any_review:
        state.is_any_review === -1 ? undefined : state.is_any_review,
      is_approbation:
        state.is_approbation === -1 ? undefined : state.is_approbation,
      is_favorite: state.is_favorite === -1 ? undefined : state.is_favorite,
      is_publication:
        state.is_publication === -1 ? undefined : state.is_publication,
      is_remote_format:
        state.is_remote_format === -1 ? undefined : state.is_remote_format,
      is_practice_placed_in_asi_smarteka:
        state.is_practice_placed_in_asi_smarteka === -1
          ? undefined
          : state.is_practice_placed_in_asi_smarteka,
      rnsu_category_ids: !state.rnsu_category_ids.length
        ? undefined
        : state.rnsu_category_ids.join(','),
      social_service_ids: !state.social_service_ids.length
        ? undefined
        : state.social_service_ids.join(','),
      volunteer_id: state.volunteer_id === -1 ? undefined : state.volunteer_id,

      needy_category_ids: !state.needy_category_ids.length
        ? undefined
        : state.needy_category_ids.join(','),
      needy_category_target_group_ids: !state.needy_category_target_group_ids
        .length
        ? undefined
        : state.needy_category_target_group_ids.join(','),
      need_recognition_ids: !state.need_recognition_ids.length
        ? undefined
        : state.need_recognition_ids.join(','),

      //specific
      direction_id: state.direction_id === -1 ? undefined : state.direction_id,
      prevalence_id:
        state.prevalence_id === -1 ? undefined : state.prevalence_id,
      application_period_id:
        state.application_period_id === -1
          ? undefined
          : state.application_period_id,
      is_effectiveness_study:
        state.is_effectiveness_study === -1
          ? undefined
          : state.is_effectiveness_study,
      public_work_ids: !state.public_work_ids.length
        ? undefined
        : state.public_work_ids.join(','),
      service_name_ids: !state.service_name_ids.length
        ? undefined
        : state.service_name_ids.join(','),
      service_type_ids: !state.service_type_ids.length
        ? undefined
        : state.service_type_ids.join(','),
    };

    const adminAddon = isAdmin ? { company: state.company || undefined } : {};

    const withSortingPreparedQueryParams = {
      ...preparedQueryParams,
      ...adminAddon,
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

    setState(isAdmin ? defaultAdminState : defaultState);
    onClearClick();
  };

  const bindChange = (name: string) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setState({ ...state, [name]: e.target.value });

  const bindSelectChange = (name: string) => (id: number) =>
    setState({ ...state, [name]: id });

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
          <Input
            className={combineClasses(
              styles.filter,
              isAdmin ? styles.filter_small : ''
            )}
            leftIcon={<SearchIcon />}
            placeholder="Поиск..."
            value={state.name}
            heading="Поиск по наименованию"
            onChange={bindChange('name')}
          />

          {isAdmin && (
            <Input
              className={combineClasses(
                styles.filter,
                isAdmin ? styles.filter_small : ''
              )}
              leftIcon={<SearchIcon />}
              placeholder="Поиск..."
              value={state.company}
              heading="Поиск по организациям"
              onChange={bindChange('company')}
            />
          )}

          <Select
            className={combineClasses(
              styles.filter,
              isAdmin ? styles.filter_small : ''
            )}
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
        {/**
         *
         *
         * common
         *
         *
         */}
        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={isNaN(+state.rating) ? -1 : +state.rating}
          options={RATING_OPTIONS}
          heading="Рейтинг"
          onChangeOption={bindSelectChange('rating')}
        />
        <div className={styles.filter}>
          {entitiesYearsLoading ? (
            <Skeleton mode={ESkeletonMode.INPUT} withLoader heading="Год" />
          ) : entitiesYearsError ? (
            <Input value={''} heading="Год" readOnly />
          ) : (
            <Select
              className={styles.filter}
              withUnselect
              emptyText="Все"
              unselectedText="Все"
              value={isNaN(+state.year) ? -1 : +state.year}
              options={entitiesYears!}
              heading="Год"
              onChangeOption={bindSelectChange('year')}
            />
          )}
        </div>
        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={isNaN(+state.is_remote_format) ? -1 : +state.is_remote_format}
          options={YES_NO_OPTIONS}
          heading="Возможность реализации в дистанционном формате"
          onChangeOption={bindSelectChange('is_remote_format')}
        />
        <div className={styles.filter}>
          {rnsuCategoryLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Категории РНСУ"
            />
          ) : rnsuCategoryError ? (
            <Input value={''} heading="Категории РНСУ" readOnly />
          ) : (
            <MultipleSelect
              emptyText="Все"
              unselectedText="Все"
              values={state.rnsu_category_ids}
              options={rnsuCategory!}
              heading="Категории РНСУ"
              onChangeOption={bindMultipleSelectChange('rnsu_category_ids')}
            />
          )}
        </div>
        <div className={styles.filter}>
          {categoriesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Категории"
            />
          ) : categoriesError ? (
            <Input value={''} heading="Категории" readOnly />
          ) : (
            <MultipleSelect
              emptyText="Все"
              unselectedText="Все"
              values={state.needy_category_ids}
              options={categories!}
              heading="Категории"
              onChangeOption={bindMultipleSelectChange(
                'needy_category_ids',
                'needy_category_target_group_ids'
              )}
            />
          )}
        </div>
        <div className={styles.filter}>
          {groupsLoading || categoriesLoading || categoriesToGroupsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Целевые группы"
            />
          ) : groupsError || categoriesError || categoriesToGroupsError ? (
            <Input value={''} heading="Целевые группы" readOnly />
          ) : state.needy_category_ids.length ? (
            <MultipleSelect
              emptyText="Все"
              unselectedText="Все"
              values={state.needy_category_target_group_ids}
              options={getRelatedCategoriesOptions(
                state.needy_category_ids,
                groups!,
                categoriesToGroups!
              )}
              heading="Целевые группы"
              onChangeOption={bindMultipleSelectChange(
                'needy_category_target_group_ids'
              )}
            />
          ) : (
            <Input
              hint="Сначала выберите категории"
              value={''}
              placeholder="Все"
              heading="Целевые группы"
              readOnly
            />
          )}
        </div>

        {/**
         *
         *
         * specific
         *
         *
         */}
        <div className={styles.filter}>
          {directionsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Направленность"
            />
          ) : directionsError ? (
            <Input value={''} heading="Направленность" readOnly />
          ) : (
            <Select
              emptyText="Все"
              unselectedText="Все"
              value={isNaN(+state.direction_id) ? -1 : +state.direction_id}
              options={directions!}
              heading="Направленность"
              onChangeOption={bindSelectChange('direction_id')}
            />
          )}
        </div>
        <div className={styles.filter}>
          {prevalencesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Распространенность"
            />
          ) : prevalencesError ? (
            <Input value={''} heading="Распространенность" readOnly />
          ) : (
            <Select
              emptyText="Все"
              unselectedText="Все"
              value={isNaN(+state.prevalence_id) ? -1 : +state.prevalence_id}
              options={prevalences!}
              heading="Распространенность"
              onChangeOption={bindSelectChange('prevalence_id')}
            />
          )}
        </div>
        <div className={styles.filter}>
          {applicationPeriodsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Период применения"
            />
          ) : applicationPeriodsError ? (
            <Input value={''} heading="Период применения" readOnly />
          ) : (
            <Select
              emptyText="Все"
              unselectedText="Все"
              value={
                isNaN(+state.application_period_id)
                  ? -1
                  : +state.application_period_id
              }
              options={applicationPeriods!}
              heading="Период применения"
              onChangeOption={bindSelectChange('application_period_id')}
            />
          )}
        </div>

        <div className={styles.filter}>
          {worksKindsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Вид услуги"
            />
          ) : worksKindsError ? (
            <Input value={''} heading="Вид услуги" readOnly />
          ) : (
            <MultipleSelect
              emptyText="Все"
              unselectedText="Все"
              values={state.service_type_ids}
              options={worksKinds!}
              heading="Вид услуги"
              onChangeOption={bindMultipleSelectChange(
                'service_type_ids',
                'service_name_ids'
              )}
            />
          )}
        </div>
        <div className={styles.filter}>
          {worksKindsLoading ||
          worksNamesLoading ||
          worksKindsToWorksNamesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Наименование услуги"
            />
          ) : worksKindsError ||
            worksNamesError ||
            worksKindsToWorksNamesError ? (
            <Input value={''} heading="Наименование услуги" readOnly />
          ) : state.service_type_ids.length ? (
            <MultipleSelect
              emptyText="Все"
              unselectedText="Все"
              values={state.service_name_ids}
              options={getRelatedCategoriesOptions(
                state.service_type_ids,
                worksNames!,
                worksKindsToWorksNames!
              )}
              heading="Наименование услуги"
              onChangeOption={bindMultipleSelectChange('service_name_ids')}
            />
          ) : (
            <Input
              hint="Сначала выберите виды услуг"
              value={''}
              placeholder="Все"
              heading="Наименование услуги"
              readOnly
            />
          )}
        </div>

        <div className={styles.filter}>
          {gosWorkNamesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Наименование государственной работы"
            />
          ) : gosWorkNamesError ? (
            <Input
              value={''}
              heading="Наименование государственной работы"
              readOnly
            />
          ) : (
            <MultipleSelect
              emptyText="Все"
              unselectedText="Все"
              values={state.public_work_ids}
              options={gosWorkNames!}
              heading="Наименование государственной работы"
              onChangeOption={bindMultipleSelectChange('public_work_ids')}
            />
          )}
        </div>

        {/**
         *
         *
         * common
         *
         *
         */}
        <div className={styles.filter}>
          {circumstancesRecognitionNeedLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Обстоятельства признания нуждаемости"
            />
          ) : circumstancesRecognitionNeedError ? (
            <Input
              value={''}
              heading="Обстоятельства признания нуждаемости"
              readOnly
            />
          ) : (
            <MultipleSelect
              emptyText="Все"
              unselectedText="Все"
              values={state.need_recognition_ids}
              options={circumstancesRecognitionNeed!}
              heading="Обстоятельства признания нуждаемости"
              onChangeOption={bindMultipleSelectChange('need_recognition_ids')}
            />
          )}
        </div>
        <div className={styles.filter}>
          {socialHelpFormLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Форма социального обслуживания"
            />
          ) : socialHelpFormError ? (
            <Input
              value={''}
              heading="Форма социального обслуживания"
              readOnly
            />
          ) : (
            <MultipleSelect
              emptyText="Все"
              unselectedText="Все"
              values={state.social_service_ids}
              options={socialHelpForm!}
              heading="Форма социального обслуживания"
              onChangeOption={bindMultipleSelectChange('social_service_ids')}
            />
          )}
        </div>

        {/**
         *
         *
         * common
         *
         *
         */}
        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={isNaN(+state.is_favorite) ? -1 : +state.is_favorite}
          options={YES_NO_OPTIONS}
          heading="Включен в виртуальную гостиную"
          onChangeOption={bindSelectChange('is_favorite')}
        />
        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={isNaN(+state.is_publication) ? -1 : +state.is_publication}
          options={YES_NO_OPTIONS}
          heading="Наличие публикации"
          onChangeOption={bindSelectChange('is_publication')}
        />
        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={isNaN(+state.is_approbation) ? -1 : +state.is_approbation}
          options={YES_NO_OPTIONS}
          heading="Апробация на инновационной площадке/в ресурсном центре"
          onChangeOption={bindSelectChange('is_approbation')}
        />
        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={isNaN(+state.is_any_review) ? -1 : +state.is_any_review}
          options={YES_NO_OPTIONS}
          heading="Экспертное заключение, рецензия, отзыв"
          onChangeOption={bindSelectChange('is_any_review')}
        />
        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={
            isNaN(+state.is_practice_placed_in_asi_smarteka)
              ? -1
              : +state.is_practice_placed_in_asi_smarteka
          }
          options={YES_NO_OPTIONS}
          heading="Практика размещена в АСИ 'Смартека'"
          onChangeOption={bindSelectChange(
            'is_practice_placed_in_asi_smarteka'
          )}
        />
        <div className={styles.filter}>
          {attractingVolunteerLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Привлечение добровольцев/волонтеров"
            />
          ) : attractingVolunteerError ? (
            <Input
              value={''}
              heading="Привлечение добровольцев/волонтеров"
              readOnly
            />
          ) : (
            <Select
              emptyText="Все"
              unselectedText="Все"
              value={state.volunteer_id}
              options={attractingVolunteer!}
              heading="Привлечение добровольцев/волонтеров"
              onChangeOption={bindSelectChange('volunteer_id')}
            />
          )}
        </div>

        {/**
         *
         *
         * specific
         *
         *
         */}
        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={
            isNaN(+state.is_effectiveness_study)
              ? -1
              : +state.is_effectiveness_study
          }
          options={YES_NO_OPTIONS}
          heading={`Наличие исследования эффективности 
          и доказательности методики/технологии`}
          onChangeOption={bindSelectChange('is_effectiveness_study')}
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