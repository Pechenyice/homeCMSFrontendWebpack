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
import { GalleryInput } from 'components/kit/GalleryInput/GalleryInput';
import { useCategoriesToGroups } from 'hooks/queries/categoriesRelations/useCategoriesToGroups';
import { useWorksKindsToWorksNames } from 'hooks/queries/categoriesRelations/useWorksKindsToWorksNames';
import { useActivityOrganizationForms } from 'hooks/queries/useActivityOrganizationForms';
import { useApplicationPeriods } from 'hooks/queries/useApplicationPeriods';
import { useAttractingVolunteer } from 'hooks/queries/useAttractingVolunteer';
import { useCategories } from 'hooks/queries/useCategories';
import { useCircumstancesRecognitionNeed } from 'hooks/queries/useCircumstancesRecognitionNeed';
import { useConductingClassesForm } from 'hooks/queries/useConductingClassesForm';
import { useDirections } from 'hooks/queries/useDirections';
import { useGosWorkNames } from 'hooks/queries/useGosWorkNames';
import { useGroups } from 'hooks/queries/useGroups';
import { usePrevalences } from 'hooks/queries/usePrevalences';
import { useProgramTypes } from 'hooks/queries/useProgramTypes';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { useRealizationLevels } from 'hooks/queries/useRealizationLevels';
import { useRnsuCategory } from 'hooks/queries/useRnsuCategory';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { useWorksKinds } from 'hooks/queries/useWorksKinds';
import { useWorksNames } from 'hooks/queries/useWorksNames';
import { IMethodologyData } from 'types/entities/methodology';
import { IProjectData } from 'types/entities/project';
import { ISocialWorkData } from 'types/entities/socialWork';
import { combineClasses } from 'utils/common';
import { getRelatedCategoriesOptions } from 'utils/entities/common';
import styles from './MethodologyViewStepsInterface.module.scss';

type Props = {
  methodology: IMethodologyData;
};

export const MethodologyViewStepsInterface = ({ methodology }: Props) => {
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

  return (
    <div className={styles.wrapper}>
      <Input
        readOnly
        className={styles.full}
        heading="Наименование программы"
        placeholder="Наименование программы"
        value={methodology.name}
      />

      <Checkbox
        readOnly
        className={styles.full}
        label="Лучшая практика по мнению руководства организации"
        checked={methodology.bestPracticeForLeadership}
      />

      <TextArea
        readOnly
        className={styles.half}
        heading="Аннотация"
        placeholder="Аннотация"
        value={methodology.annotation}
      />
      <TextArea
        readOnly
        className={styles.half}
        heading="Цель"
        placeholder="Цель"
        value={methodology.purpose}
      />

      <div className={combineClasses(styles.full, styles.flex)}>
        <TextArea
          readOnly
          className={styles.half}
          heading="Основные задачи"
          placeholder="Основные задачи"
          value={methodology.tasks}
        />
        <div className={styles.half}>
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
              viewMode
              value={methodology.direction}
              options={directions!}
              heading="Направленность"
              onChangeOption={() => {}}
            />
          )}
        </div>
      </div>

      <div className={styles.half}>
        <div className={combineClasses(styles.full, styles.leadHelper)}>
          {prevalencesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Распространенность методики"
            />
          ) : prevalencesError ? (
            <Input value={''} heading="Распространенность методики" readOnly />
          ) : (
            <Select
              viewMode
              value={methodology.prevalence}
              options={prevalences!}
              heading="Распространенность методики"
              onChangeOption={() => {}}
            />
          )}
        </div>
        <TextArea
          readOnly
          className={combineClasses(styles.full, styles.leadHelper)}
          heading="Автор(ы) (составитель) технологии/методики, информация о согласовании (при наличии)"
          placeholder="Автор(ы) (составитель) технологии/методики, информация о согласовании (при наличии)"
          value={methodology.authors || '-'}
        />
        <Input
          readOnly
          className={styles.full}
          heading="Ссылка на публикацию"
          placeholder="Ссылка на публикацию"
          value={methodology.publicationLink || '-'}
        />
      </div>

      <div className={styles.half}>
        <TextArea
          readOnly
          className={combineClasses(styles.full, styles.leadHelper)}
          heading="Исследование эффективности или доказательности методики/технологии"
          placeholder="Исследование эффективности или доказательности методики/технологии"
          value={methodology.effectivenessStudy || '-'}
        />
        <Input
          readOnly
          className={styles.full}
          heading="Ссылка на исследование эффективности или доказательности методики/технологии"
          placeholder="Ссылка на исследование эффективности или доказательности методики/технологии"
          value={methodology.effectivenessStudyLink || '-'}
        />
      </div>

      <div className={styles.half}>
        <div className={combineClasses(styles.full, styles.leadHelper)}>
          {activityOrganizationFormsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Форма организации деятельности при реализации технологии/методики"
            />
          ) : activityOrganizationFormsError ? (
            <Input
              value={''}
              heading="Форма организации деятельности при реализации технологии/методики"
              readOnly
            />
          ) : (
            <Select
              viewMode
              value={methodology.activityOrganizationForm}
              options={activityOrganizationForms!}
              heading="Форма организации деятельности при реализации технологии/методики"
              onChangeOption={() => {}}
            />
          )}
        </div>
        <TextArea
          readOnly
          className={styles.full}
          heading="Количество реализованных полных циклов"
          placeholder="Количество реализованных полных циклов"
          value={methodology.realizedCycles}
        />
      </div>

      <div className={styles.half}>
        <div className={combineClasses(styles.full, styles.leadHelper)}>
          {applicationPeriodsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Период применения (продолжительность реализации)"
            />
          ) : applicationPeriodsError ? (
            <Input
              value={''}
              heading="Период применения (продолжительность реализации)"
              readOnly
            />
          ) : (
            <Select
              viewMode
              value={methodology.applicationPeriod}
              options={applicationPeriods!}
              heading="Период применения (продолжительность реализации)"
              onChangeOption={() => {}}
            />
          )}
        </div>
        <TextArea
          readOnly
          className={styles.full}
          heading="Продолжительность одного цикла"
          placeholder="Продолжительность одного цикла"
          value={methodology.cycleDuration}
        />
      </div>

      <div className={styles.half}>
        <div className={styles.leadHelper}>
          {realisationForCitizenLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Реализация для гражданина бесплатно/платно"
            />
          ) : realisationForCitizenError ? (
            <Input
              value={''}
              heading="Реализация для гражданина бесплатно/платно"
              readOnly
            />
          ) : (
            <Select
              viewMode
              value={methodology.realisationForCitizen}
              options={realisationForCitizen!}
              heading="Реализация для гражданина бесплатно/платно"
              onChangeOption={() => {}}
            />
          )}
        </div>
        <Checkbox
          readOnly
          className={styles.full}
          label="Возможность реализации в дистанционном формате"
          checked={methodology.canBeDistant}
        />
      </div>

      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Взаимодействие, партнерство с другими организациями"
        value={!!methodology.partnership}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="partnership"
          value={methodology.partnership!}
          onChange={() => {}}
          placeholder="Укажите партнеров"
        />
      </HelperEnableSelect>

      <div className={styles.half}>
        {attractingVolunteerLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Привлечение добровольцев и волонтеров"
          />
        ) : attractingVolunteerError ? (
          <Input
            value={''}
            heading="Привлечение добровольцев и волонтеров"
            readOnly
          />
        ) : (
          <Select
            viewMode
            value={methodology.attractingVolunteer}
            options={attractingVolunteer!}
            heading="Привлечение добровольцев и волонтеров"
            onChangeOption={() => {}}
          />
        )}
      </div>
      <div className={styles.half}>
        {rnsuCategoryLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Категории по РНСУ"
          />
        ) : rnsuCategoryError ? (
          <Input value={''} heading="Категории по РНСУ" readOnly />
        ) : (
          <MultipleSelect
            viewMode
            values={methodology.rnsuCategories}
            options={rnsuCategory!}
            heading="Категории по РНСУ"
            onChangeOption={() => {}}
          />
        )}
      </div>

      <div className={styles.half}>
        <div className={styles.leadHelper}>
          {categoriesLoading || categoriesToGroupsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Категории"
            />
          ) : categoriesError || categoriesToGroupsError ? (
            <Input value={''} heading="Категории" readOnly />
          ) : (
            <MultipleSelect
              viewMode
              values={methodology.categories}
              options={categories!}
              heading="Категории"
              onChangeOption={() => {}}
            />
          )}
        </div>
        <div>
          {groupsLoading || categoriesLoading || categoriesToGroupsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Целевые группы"
            />
          ) : groupsError || categoriesError || categoriesToGroupsError ? (
            <Input value={''} heading="Целевые группы" readOnly />
          ) : methodology.categories.length ? (
            <MultipleSelect
              viewMode
              values={methodology.groups}
              options={getRelatedCategoriesOptions(
                methodology.categories,
                groups!,
                categoriesToGroups!
              )}
              heading="Целевые группы"
              onChangeOption={() => {}}
            />
          ) : (
            <Input
              value={'-'}
              placeholder="Сначала выберите категории нуждающихся"
              heading="Целевые группы"
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
              viewMode
              values={methodology.worksKinds}
              options={worksKinds!}
              heading="Виды услуг"
              onChangeOption={() => {}}
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
          ) : methodology.worksKinds?.length ? (
            <MultipleSelect
              viewMode
              values={methodology.worksNames}
              options={getRelatedCategoriesOptions(
                methodology.worksKinds,
                worksNames!,
                worksKindsToWorksNames!
              )}
              heading="Наименования услуг"
              onChangeOption={() => {}}
            />
          ) : (
            <TextArea
              value={'-'}
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
            viewMode
            values={methodology.gosWorkNames}
            options={gosWorkNames!}
            heading="Наименования государственной работы"
            onChangeOption={() => {}}
          />
        )}
      </div>

      <div className={styles.half}>
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
            viewMode
            values={methodology.circumstancesRecognitionNeed}
            options={circumstancesRecognitionNeed!}
            heading="Обстоятельства признания нуждаемости"
            onChangeOption={() => {}}
          />
        )}
      </div>

      <div className={styles.half}>
        {socialHelpFormLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Формы социального обслуживания (сопровождения)"
          />
        ) : socialHelpFormError ? (
          <Input
            value={''}
            heading="Формы социального обслуживания (сопровождения)"
            readOnly
          />
        ) : (
          <MultipleSelect
            viewMode
            values={methodology.socialHelpForm}
            options={socialHelpForm!}
            heading="Формы социального обслуживания (сопровождения)"
            onChangeOption={() => {}}
          />
        )}
      </div>

      <TextArea
        readOnly
        className={styles.half}
        name="basicQualityResults"
        value={methodology.basicQualityResults}
        onChange={() => {}}
        heading="Основные качественные результаты"
        placeholder="Основные качественные результаты"
      />
      <TextArea
        readOnly
        className={styles.half}
        name="socialResults"
        value={methodology.socialResults}
        onChange={() => {}}
        heading="Социальные результаты"
        placeholder="Социальные результаты"
      />

      <TextArea
        readOnly
        className={styles.half}
        name="replicability"
        value={methodology.replicability || '-'}
        onChange={() => {}}
        heading="Тиражируемость"
        placeholder="Тиражируемость"
      />
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Апробация на инновационной площадке/в ресурсном центре"
        value={!!methodology.innovationGround}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="innovationGround"
          value={methodology.innovationGround!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Наличие экспертного заключения"
        value={!!methodology.hasExpertOpinion}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="hasExpertOpinion"
          value={methodology.hasExpertOpinion!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Наличие рецензии"
        value={!!methodology.hasExpertReview}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="hasExpertReview"
          value={methodology.hasExpertReview!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>

      <div className={styles.half}>
        <HelperEnableSelect
          readOnly
          className={combineClasses(styles.full, styles.leadHelper)}
          heading="Наличие отзыва"
          value={!!methodology.hasExpertMention}
          onChangeOption={() => {}}
        >
          <TextArea
            readOnly
            name="hasExpertMention"
            value={methodology.hasExpertMention!}
            onChange={() => {}}
            placeholder="Описание"
          />
        </HelperEnableSelect>
        <Checkbox
          readOnly
          className={styles.full}
          label="Практика размещена в АСИ 'Смартека'"
          checked={methodology.isInASI}
        />
      </div>

      <div className={styles.half}>
        <PhotoInput
          viewMode
          name="photo"
          category="job-primary-photo"
          photoId={methodology.photo?.id ?? -1}
          photoPath={methodology.photo?.path ?? ''}
          photoName={methodology.photo?.name ?? ''}
          onPhotoChange={() => {}}
          heading="Фотография"
        />
      </div>
      <div className={styles.half}>
        <GalleryInput
          viewMode
          name="gallery"
          category="job-primary-gallery"
          gallery={methodology.gallery ?? []}
          heading="Галерея"
          onGalleryPhotosAdd={() => {}}
          onGalleryPhotoDelete={() => {}}
        />
      </div>

      <TextArea
        readOnly
        className={styles.half}
        name="video"
        value={methodology.video || '-'}
        onChange={() => {}}
        heading="Видео ролик"
        placeholder="Видео ролик"
      />
      <TextArea
        readOnly
        className={styles.half}
        name="resourcesDescription"
        value={methodology.resourcesDescription}
        onChange={() => {}}
        heading="Краткое описание необходимого ресурсного обеспечения"
        placeholder="Краткое описание необходимого ресурсного обеспечения"
      />
    </div>
  );
};
