import {
  Checkbox,
  ESkeletonMode,
  HelperEnableSelect,
  Input,
  MultipleSelect,
  PhotoInput,
  Select,
  Skeleton,
  Text,
  TextArea,
} from 'components/kit';
import { useDistricts } from 'hooks/queries/useDistricts';
import { ChangeEvent } from 'react';
import { IProjectState, IProjectSwitchers } from 'types/entities/project';
import styles from './PartitionStep.module.scss';
import { GalleryInput } from 'components/kit/GalleryInput/GalleryInput';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { useRealizationLevels } from 'hooks/queries/useRealizationLevels';
import { useAttractingVolunteer } from 'hooks/queries/useAttractingVolunteer';
import { useRnsuCategory } from 'hooks/queries/useRnsuCategory';
import { useCategories } from 'hooks/queries/useCategories';
import { useGroups } from 'hooks/queries/useGroups';
import { useCircumstancesRecognitionNeed } from 'hooks/queries/useCircumstancesRecognitionNeed';
import { useWorksKinds } from 'hooks/queries/useWorksKinds';
import { useWorksNames } from 'hooks/queries/useWorksNames';
import { useGosWorkNames } from 'hooks/queries/useGosWorkNames';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { useWorksKindsToWorksNames } from 'hooks/queries/categoriesRelations/useWorksKindsToWorksNames';
import { useCategoriesToGroups } from 'hooks/queries/categoriesRelations/useCategoriesToGroups';
import { getRelatedCategoriesOptions } from 'utils/entities/common';
import { IFileInfo } from 'types/interfaces';
import { combineClasses } from 'utils/common';
import { useDirections } from 'hooks/queries/useDirections';
import { useConductingClassesForm } from 'hooks/queries/useConductingClassesForm';
import {
  ISocialWorkState,
  ISocialWorkSwitchers,
} from 'types/entities/socialWork';
import { useProgramTypes } from 'hooks/queries/useProgramTypes';
import {
  IMethodologyState,
  IMethodologySwitchers,
} from 'types/entities/methodology';
import { usePrevalences } from 'hooks/queries/usePrevalences';
import { useApplicationPeriods } from 'hooks/queries/useApplicationPeriods';
import { useActivityOrganizationForms } from 'hooks/queries/useActivityOrganizationForms';

type Props = {
  switchers: IMethodologySwitchers;
  mainPartition: IMethodologyState['mainPartition'];
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitcherChange: (switcherName: string, value: boolean) => void;
  onSelect: (name: string, option: number) => void;
  onMultipleSelect: (name: string, option: number) => void;
  onMultipleParentSelect: (name: string, child: string, option: number) => void;
  onCheckToggle: (name: string) => void;
  onPhotoChange: (
    name: string,
    photoId: number | null,
    photoPath: string | null,
    photoName: string | null
  ) => void;
  onGalleryPhotosAdd: (name: string, photos: IFileInfo['file'][]) => void;
  onGalleryPhotoDelete: (name: string, photoId: number) => void;
  selectsErrors: { [key in keyof IMethodologyState['mainPartition']]: boolean }; //not all, done just for selects tooltips
};

export const MethodologyMainPartitionStep = ({
  switchers,
  mainPartition,
  onChange,
  onSwitcherChange,
  onSelect,
  onMultipleSelect,
  onMultipleParentSelect,
  onCheckToggle,
  onPhotoChange,
  onGalleryPhotosAdd,
  onGalleryPhotoDelete,
  selectsErrors,
}: Props) => {
  const {
    apiData: realisationForCitizen,
    isLoading: realisationForCitizenLoading,
    isError: realisationForCitizenError,
  } = useRealisationForCitizen();
  const {
    apiData: realizationLevels,
    isLoading: realizationLevelsLoading,
    isError: realizationLevelsError,
  } = useRealizationLevels();

  const {
    apiData: attractingVolunteer,
    isLoading: attractingVolunteerLoading,
    isError: attractingVolunteerError,
  } = useAttractingVolunteer();
  const {
    apiData: rnsuCategory,
    isLoading: rnsuCategoryLoading,
    isError: rnsuCategoryError,
  } = useRnsuCategory();

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
    apiData: gosWorkNames,
    isLoading: gosWorkNamesLoading,
    isError: gosWorkNamesError,
  } = useGosWorkNames();
  const {
    apiData: circumstancesRecognitionNeed,
    isLoading: circumstancesRecognitionNeedLoading,
    isError: circumstancesRecognitionNeedError,
  } = useCircumstancesRecognitionNeed();

  const {
    apiData: socialHelpForm,
    isLoading: socialHelpFormLoading,
    isError: socialHelpFormError,
  } = useSocialHelpForm();

  const {
    apiData: worksKindsToWorksNames,
    isLoading: worksKindsToWorksNamesLoading,
    isError: worksKindsToWorksNamesError,
  } = useWorksKindsToWorksNames();
  const {
    apiData: categoriesToGroups,
    isLoading: categoriesToGroupsLoading,
    isError: categoriesToGroupsError,
  } = useCategoriesToGroups();

  const {
    apiData: directions,
    isLoading: directionsLoading,
    isError: directionsError,
  } = useDirections();
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
    apiData: activityOrganizationForms,
    isLoading: activityOrganizationFormsLoading,
    isError: activityOrganizationFormsError,
  } = useActivityOrganizationForms();

  /**
   * binders
   */
  const bindSwitcherChange = (switcherName: string) => {
    return (value: boolean) => onSwitcherChange(switcherName, value);
  };

  const bindSelect = (name: string) => (option: number) => {
    onSelect(name, option);
  };

  const bindMultipleSelect = (name: string) => (option: number) => {
    onMultipleSelect(name, option);
  };

  const bindMultipleParentSelect = (name: string, child: string) => (
    option: number
  ) => {
    onMultipleParentSelect(name, child, option);
  };

  const bindCheckToggle = (name: string) => () => {
    onCheckToggle(name);
  };

  const bindPhotoChange = (name: string) => (
    photoId: number | null,
    photoPath: string | null,
    photoName: string | null
  ) => {
    onPhotoChange(name, photoId, photoPath, photoName);
  };

  const bindGalleryPhotosAdd = (name: string) => (
    photos: IFileInfo['file'][]
  ) => {
    onGalleryPhotosAdd(name, photos);
  };

  const bindGalleryPhotoDelete = (name: string) => (photoId: number) => {
    onGalleryPhotoDelete(name, photoId);
  };

  return (
    <div className={styles.wrapper}>
      <Input
        name="name"
        value={mainPartition.name.value}
        onChange={onChange}
        error={mainPartition.name.error}
        heading="Наименование программы *"
        placeholder="Наименование программы"
      />

      <Checkbox
        checked={mainPartition.bestPracticeForLeadership}
        onToggle={bindCheckToggle('bestPracticeForLeadership')}
        label={<Text>Лучшая практика по мнению руководства организации</Text>}
      />

      <TextArea
        className={styles.half}
        name="annotation"
        value={mainPartition.annotation.value}
        onChange={onChange}
        error={mainPartition.annotation.error}
        heading="Аннотация *"
        placeholder="Аннотация"
        hint="Опишите программу, не более 2500 знаков без пробелов"
      />
      <TextArea
        className={styles.half}
        name="purpose"
        value={mainPartition.purpose.value}
        onChange={onChange}
        error={mainPartition.purpose.error}
        heading="Цель программы *"
        placeholder="Цель программы"
      />

      <TextArea
        className={styles.half}
        name="tasks"
        value={mainPartition.tasks.value}
        onChange={onChange}
        error={mainPartition.tasks.error}
        heading="Основные задачи *"
        placeholder="Основные задачи"
        hint="Укажите не более 7 задач"
      />
      <div className={styles.half}>
        {directionsLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Направленность *"
          />
        ) : directionsError ? (
          <Input value={''} heading="Направленность *" readOnly />
        ) : (
          <Select
            withUnselect
            value={mainPartition.direction}
            options={directions!}
            isError={selectsErrors.direction}
            heading="Направленность *"
            onChangeOption={bindSelect('direction')}
          />
        )}
      </div>

      <div className={styles.half}>
        <div className={combineClasses(styles.full, styles.leadHelper)}>
          {prevalencesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Распространенность методики *"
            />
          ) : prevalencesError ? (
            <Input
              value={''}
              heading="Распространенность методики *"
              readOnly
            />
          ) : (
            <Select
              value={mainPartition.prevalence}
              options={prevalences!}
              isError={selectsErrors.prevalence}
              heading="Распространенность методики *"
              onChangeOption={bindSelect('prevalence')}
            />
          )}
        </div>
        <TextArea
          className={combineClasses(styles.full, styles.leadHelper)}
          name="authors"
          value={mainPartition.authors.value}
          onChange={onChange}
          error={mainPartition.authors.error}
          heading="Автор(ы) (составитель) технологии/методики, информация о согласовании (при наличии)"
          placeholder="Автор(ы) (составитель) технологии/методики, информация о согласовании (при наличии)"
        />
        <Input
          className={combineClasses(styles.full, styles.leadHelper)}
          name="publicationLink"
          value={mainPartition.publicationLink.value}
          onChange={onChange}
          error={mainPartition.publicationLink.error}
          heading="Ссылка на публикацию"
          placeholder="Ссылка на публикацию"
        />
      </div>

      <div className={styles.half}>
        <TextArea
          className={combineClasses(styles.full, styles.leadHelper)}
          name="effectivenessStudy"
          value={mainPartition.effectivenessStudy.value}
          onChange={onChange}
          error={mainPartition.effectivenessStudy.error}
          heading="Исследование эффективности или доказательности методики/технологии"
          placeholder="Исследование эффективности или доказательности методики/технологии"
        />
        <Input
          className={combineClasses(styles.full, styles.leadHelper)}
          name="effectivenessStudyLink"
          value={mainPartition.effectivenessStudyLink.value}
          onChange={onChange}
          error={mainPartition.effectivenessStudyLink.error}
          heading="Ссылка на исследование эффективности или доказательности методики/технологии"
          placeholder="Ссылка на исследование эффективности или доказательности методики/технологии"
        />
      </div>

      <div className={styles.half}>
        <div className={combineClasses(styles.full, styles.leadHelper)}>
          {activityOrganizationFormsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Форма организации деятельности при реализации технологии/методики *"
            />
          ) : activityOrganizationFormsError ? (
            <Input
              value={''}
              heading="Форма организации деятельности при реализации технологии/методики *"
              readOnly
            />
          ) : (
            <Select
              value={mainPartition.activityOrganizationForm}
              options={activityOrganizationForms!}
              isError={selectsErrors.activityOrganizationForm}
              heading="Форма организации деятельности при реализации технологии/методики *"
              onChangeOption={bindSelect('activityOrganizationForm')}
            />
          )}
        </div>
        <TextArea
          className={combineClasses(styles.full, styles.leadHelper)}
          name="realizedCycles"
          value={mainPartition.realizedCycles.value}
          onChange={onChange}
          error={mainPartition.realizedCycles.error}
          heading="Количество реализованных полных циклов *"
          placeholder="Количество реализованных полных циклов"
        />
      </div>

      <div className={styles.half}>
        <div className={combineClasses(styles.full, styles.leadHelper)}>
          {applicationPeriodsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Период применения (продолжительность реализации) *"
            />
          ) : applicationPeriodsError ? (
            <Input
              value={''}
              heading="Период применения (продолжительность реализации) *"
              readOnly
            />
          ) : (
            <Select
              value={mainPartition.applicationPeriod}
              options={applicationPeriods!}
              isError={selectsErrors.applicationPeriod}
              heading="Период применения (продолжительность реализации) *"
              onChangeOption={bindSelect('applicationPeriod')}
            />
          )}
        </div>
        <TextArea
          className={combineClasses(styles.full, styles.leadHelper)}
          name="cycleDuration"
          value={mainPartition.cycleDuration.value}
          onChange={onChange}
          error={mainPartition.cycleDuration.error}
          heading="Продолжительность одного цикла *"
          placeholder="Продолжительность одного цикла"
        />
      </div>

      <div className={styles.half}>
        <div className={styles.leadHelper}>
          {realisationForCitizenLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Реализация для гражданина бесплатно/платно *"
            />
          ) : realisationForCitizenError ? (
            <Input
              value={''}
              heading="Реализация для гражданина бесплатно/платно *"
              readOnly
            />
          ) : (
            <Select
              withUnselect
              value={mainPartition.realisationForCitizen}
              options={realisationForCitizen!}
              isError={selectsErrors.realisationForCitizen}
              heading="Реализация для гражданина бесплатно/платно *"
              onChangeOption={bindSelect('realisationForCitizen')}
            />
          )}
        </div>
        <Checkbox
          checked={mainPartition.canBeDistant}
          onToggle={bindCheckToggle('canBeDistant')}
          label={<Text>Возможность реализации в дистанционном формате</Text>}
        />
      </div>

      <HelperEnableSelect
        className={styles.half}
        heading="Взаимодействие, партнерство с другими организациями"
        value={switchers.partnership}
        onChangeOption={bindSwitcherChange('partnership')}
        hint="Можно указать несколько организаций-партнеров"
      >
        <TextArea
          name="partnership"
          value={mainPartition.partnership.value}
          onChange={onChange}
          error={mainPartition.partnership.error}
          placeholder="Укажите партнеров"
        />
      </HelperEnableSelect>

      <div className={styles.half}>
        {attractingVolunteerLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Привлечение добровольцев и волонтеров *"
          />
        ) : attractingVolunteerError ? (
          <Input
            value={''}
            heading="Привлечение добровольцев и волонтеров *"
            readOnly
          />
        ) : (
          <Select
            withUnselect
            value={mainPartition.attractingVolunteer}
            options={attractingVolunteer!}
            isError={selectsErrors.attractingVolunteer}
            heading="Привлечение добровольцев и волонтеров *"
            onChangeOption={bindSelect('attractingVolunteer')}
          />
        )}
      </div>
      <div className={styles.half}>
        {rnsuCategoryLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Категории по РНСУ *"
          />
        ) : rnsuCategoryError ? (
          <Input value={''} heading="Категории по РНСУ *" readOnly />
        ) : (
          <MultipleSelect
            values={mainPartition.rnsuCategories}
            options={rnsuCategory!}
            isError={selectsErrors.rnsuCategories}
            heading="Категории по РНСУ *"
            onChangeOption={bindMultipleSelect('rnsuCategories')}
          />
        )}
      </div>

      <div className={styles.half}>
        <div className={styles.leadHelper}>
          {categoriesLoading || categoriesToGroupsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Категории *"
            />
          ) : categoriesError || categoriesToGroupsError ? (
            <Input value={''} heading="Категории *" readOnly />
          ) : (
            <MultipleSelect
              values={mainPartition.categories}
              options={categories!}
              isError={selectsErrors.categories}
              heading="Категории *"
              onChangeOption={bindMultipleParentSelect('categories', 'groups')}
            />
          )}
        </div>
        <div>
          {groupsLoading || categoriesLoading || categoriesToGroupsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Целевые группы *"
            />
          ) : groupsError || categoriesError || categoriesToGroupsError ? (
            <Input value={''} heading="Целевые группы *" readOnly />
          ) : mainPartition.categories.length ? (
            <MultipleSelect
              values={mainPartition.groups}
              options={getRelatedCategoriesOptions(
                mainPartition.categories,
                groups!,
                categoriesToGroups!
              )}
              isError={selectsErrors.groups}
              heading="Целевые группы *"
              onChangeOption={bindMultipleSelect('groups')}
            />
          ) : (
            <Input
              value={''}
              placeholder="Сначала выберите категории нуждающихся"
              heading="Целевые группы *"
              readOnly
            />
          )}
        </div>
      </div>

      <div className={styles.half}>
        <div className={styles.leadHelper}>
          {worksKindsLoading || worksKindsToWorksNamesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Виды услуг"
            />
          ) : worksKindsError || worksKindsToWorksNamesError ? (
            <Input value={''} heading="Виды услуг" readOnly />
          ) : (
            <MultipleSelect
              values={mainPartition.worksKinds}
              options={worksKinds!}
              heading="Виды услуг"
              onChangeOption={bindMultipleParentSelect(
                'worksKinds',
                'worksNames'
              )}
            />
          )}
        </div>
        <div>
          {worksNamesLoading ||
          worksKindsLoading ||
          worksKindsToWorksNamesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Наименования услуг"
            />
          ) : worksNamesError ||
            worksKindsError ||
            worksKindsToWorksNamesError ? (
            <Input value={''} heading="Наименования услуг" readOnly />
          ) : mainPartition.worksKinds.length ? (
            <MultipleSelect
              values={mainPartition.worksNames}
              options={getRelatedCategoriesOptions(
                mainPartition.worksKinds,
                worksNames!,
                worksKindsToWorksNames!
              )}
              isError={selectsErrors.worksNames}
              heading="Наименования услуг"
              onChangeOption={bindMultipleSelect('worksNames')}
            />
          ) : (
            <Input
              value={''}
              placeholder="Сначала выберите виды услуги"
              heading="Наименования услуг"
              readOnly
            />
          )}
        </div>
      </div>

      <div className={styles.half}>
        {gosWorkNamesLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Наименования государственной работы"
          />
        ) : gosWorkNamesError ? (
          <Input
            value={''}
            heading="Наименования государственной работы"
            readOnly
          />
        ) : (
          <MultipleSelect
            values={mainPartition.gosWorkNames}
            options={gosWorkNames!}
            heading="Наименования государственной работы"
            onChangeOption={bindMultipleSelect('gosWorkNames')}
          />
        )}
      </div>

      <div className={styles.half}>
        {circumstancesRecognitionNeedLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Обстоятельства признания нуждаемости *"
          />
        ) : circumstancesRecognitionNeedError ? (
          <Input
            value={''}
            heading="Обстоятельства признания нуждаемости *"
            readOnly
          />
        ) : (
          <MultipleSelect
            values={mainPartition.circumstancesRecognitionNeed}
            options={circumstancesRecognitionNeed!}
            isError={selectsErrors.circumstancesRecognitionNeed}
            heading="Обстоятельства признания нуждаемости *"
            onChangeOption={bindMultipleSelect('circumstancesRecognitionNeed')}
          />
        )}
      </div>
      <div className={styles.half}>
        {socialHelpFormLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Формы социального обслуживания (сопровождения) *"
          />
        ) : socialHelpFormError ? (
          <Input
            value={''}
            heading="Формы социального обслуживания (сопровождения) *"
            readOnly
          />
        ) : (
          <MultipleSelect
            values={mainPartition.socialHelpForm}
            options={socialHelpForm!}
            isError={selectsErrors.socialHelpForm}
            heading="Формы социального обслуживания (сопровождения) *"
            onChangeOption={bindMultipleSelect('socialHelpForm')}
          />
        )}
      </div>

      <TextArea
        className={styles.half}
        name="basicQualityResults"
        value={mainPartition.basicQualityResults.value}
        onChange={onChange}
        error={mainPartition.basicQualityResults.error}
        heading="Основные качественные результаты *"
        placeholder="Основные качественные результаты"
      />
      <TextArea
        className={styles.half}
        name="socialResults"
        value={mainPartition.socialResults.value}
        onChange={onChange}
        error={mainPartition.socialResults.error}
        heading="Социальные результаты *"
        placeholder="Социальные результаты"
        hint={`Укажите: группу благополучателей,\nпроблемы / потребности благополучателей,\nпланируемые позитивные изменения в ситуации благополучателей (социальные результаты практики)`}
      />

      <TextArea
        className={styles.half}
        name="replicability"
        value={mainPartition.replicability.value}
        onChange={onChange}
        error={mainPartition.replicability.error}
        heading="Тиражируемость"
        placeholder="Тиражируемость"
        hint="Укажите, когда и какая организация внедрила Вашу программу в свою работу"
      />
      <HelperEnableSelect
        className={styles.half}
        heading="Апробация на инновационной площадке/в ресурсном центре"
        value={switchers.innovationGround}
        onChangeOption={bindSwitcherChange('innovationGround')}
        hint="Укажите, где и когда проходила апробация"
      >
        <TextArea
          name="innovationGround"
          value={mainPartition.innovationGround.value}
          onChange={onChange}
          error={mainPartition.innovationGround.error}
          placeholder="Описание"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        className={styles.half}
        heading="Наличие экспертного заключения"
        value={switchers.hasExpertOpinion}
        onChangeOption={bindSwitcherChange('hasExpertOpinion')}
        hint="Укажите, кто и когда выдал экспертное заключение"
      >
        <TextArea
          name="hasExpertOpinion"
          value={mainPartition.hasExpertOpinion.value}
          onChange={onChange}
          error={mainPartition.hasExpertOpinion.error}
          placeholder="Описание"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        className={styles.half}
        heading="Наличие рецензии"
        value={switchers.hasExpertReview}
        onChangeOption={bindSwitcherChange('hasExpertReview')}
        hint="Укажите, кто и когда выдал рецензию"
      >
        <TextArea
          name="hasExpertReview"
          value={mainPartition.hasExpertReview.value}
          onChange={onChange}
          error={mainPartition.hasExpertReview.error}
          placeholder="Описание"
        />
      </HelperEnableSelect>

      <div className={styles.half}>
        <HelperEnableSelect
          className={combineClasses(styles.full, styles.leadHelper)}
          heading="Наличие отзыва"
          value={switchers.hasExpertMention}
          onChangeOption={bindSwitcherChange('hasExpertMention')}
          hint="Укажите, кто и когда выдал отзыв"
        >
          <TextArea
            name="hasExpertMention"
            value={mainPartition.hasExpertMention.value}
            onChange={onChange}
            error={mainPartition.hasExpertMention.error}
            placeholder="Описание"
          />
        </HelperEnableSelect>
        <Checkbox
          className={styles.full}
          checked={mainPartition.isInASI}
          onToggle={bindCheckToggle('isInASI')}
          label={<Text>Практика размещена в АСИ «Смартека»</Text>}
        />
      </div>

      <div className={styles.half}>
        {
          <PhotoInput
            name="photo"
            category="job-primary-photo"
            photoId={mainPartition.photo.id}
            photoPath={mainPartition.photo.path}
            photoName={mainPartition.photo.name}
            onPhotoChange={bindPhotoChange('photo')}
            heading="Фотография"
            hint="Характеристики фото"
          />
        }
      </div>
      <div className={styles.half}>
        {
          <GalleryInput
            name="gallery"
            category="job-primary-gallery"
            gallery={mainPartition.gallery}
            heading="Галерея"
            hint="Характеристики фото галереи"
            onGalleryPhotosAdd={bindGalleryPhotosAdd('gallery')}
            onGalleryPhotoDelete={bindGalleryPhotoDelete('gallery')}
          />
        }
      </div>

      <TextArea
        className={styles.half}
        name="video"
        value={mainPartition.video.value}
        onChange={onChange}
        error={mainPartition.video.error}
        heading="Видеоролик"
        placeholder="Видеоролик"
      />
      <TextArea
        className={styles.half}
        name="resourcesDescription"
        value={mainPartition.resourcesDescription.value}
        onChange={onChange}
        error={mainPartition.resourcesDescription.error}
        heading="Краткое описание необходимого ресурсного обеспечения *"
        placeholder="Краткое описание необходимого ресурсного обеспечения"
        hint="Кадровое обеспечение, специальное оборудование, материалы, помещение"
      />
    </div>
  );
};
