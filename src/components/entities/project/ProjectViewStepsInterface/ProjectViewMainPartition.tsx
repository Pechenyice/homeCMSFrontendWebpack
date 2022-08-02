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
import { useAttractingVolunteer } from 'hooks/queries/useAttractingVolunteer';
import { useCategories } from 'hooks/queries/useCategories';
import { useCircumstancesRecognitionNeed } from 'hooks/queries/useCircumstancesRecognitionNeed';
import { useGosWorkNames } from 'hooks/queries/useGosWorkNames';
import { useGroups } from 'hooks/queries/useGroups';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { useRealizationLevels } from 'hooks/queries/useRealizationLevels';
import { useRnsuCategory } from 'hooks/queries/useRnsuCategory';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { useWorksKinds } from 'hooks/queries/useWorksKinds';
import { useWorksNames } from 'hooks/queries/useWorksNames';
import { IProjectData } from 'types/entities/entities';
import { combineClasses } from 'utils/common';
import { getRelatedCategoriesOptions } from 'utils/entities/common';
import styles from './ProjectViewMainPartition.module.scss';

type Props = {
  project: IProjectData;
};

export const ProjectViewMainPartition = ({ project }: Props) => {
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

  return (
    <div className={styles.wrapper}>
      <Input
        readOnly
        className={styles.full}
        heading="Наименование проекта"
        placeholder="Наименование проекта"
        value={project.name}
      />

      <Checkbox
        readOnly
        className={styles.full}
        label="Лучшая практика по мнению руководства организации"
        checked={project.bestPracticeForLeadership}
      />

      <TextArea
        readOnly
        className={styles.half}
        heading="Аннотация"
        placeholder="Аннотация"
        value={project.annotation}
      />
      <TextArea
        readOnly
        className={styles.half}
        heading="Цель"
        placeholder="Цель"
        value={project.purpose}
      />

      <div className={combineClasses(styles.full, styles.flex)}>
        <TextArea
          readOnly
          className={styles.half}
          heading="Основные задачи"
          placeholder="Основные задачи"
          value={project.tasks}
        />
        <HelperEnableSelect
          readOnly
          className={styles.half}
          heading="Организатор"
          value={!!project.organisator}
          onChangeOption={() => {}}
        >
          <TextArea
            readOnly
            value={project.organisator!}
            placeholder="Организатор"
          />
        </HelperEnableSelect>
      </div>

      <TextArea
        readOnly
        className={styles.half}
        heading="Период реализации проекта"
        placeholder="Период реализации проекта"
        value={project.period}
      />
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
              value={project.realisationForCitizen}
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
          checked={project.canBeDistant}
        />
      </div>

      <div className={styles.half}>
        {realizationLevelsLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Уровень реализации проекта"
          />
        ) : realizationLevelsError ? (
          <Input value={''} heading="Уровень реализации проекта" readOnly />
        ) : (
          <Select
            viewMode
            value={project.organizationLevel}
            options={realizationLevels!}
            heading="Уровень реализации проекта"
            onChangeOption={() => {}}
          />
        )}
      </div>
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Взаимодействие, партнерство с другими организациями"
        value={!!project.partnership}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="partnership"
          value={project.partnership!}
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
            value={project.attractingVolunteer}
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
            values={project.rnsuCategories}
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
              values={project.categories}
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
          ) : project.categories.length ? (
            <MultipleSelect
              viewMode
              values={project.groups}
              options={getRelatedCategoriesOptions(
                project.categories,
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
              values={project.worksKinds}
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
          ) : project.worksKinds?.length ? (
            <MultipleSelect
              viewMode
              values={project.worksNames}
              options={getRelatedCategoriesOptions(
                project.worksKinds,
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
            values={project.gosWorkNames}
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
            values={project.circumstancesRecognitionNeed}
            options={circumstancesRecognitionNeed!}
            heading="Обстоятельства признания нуждаемости"
            onChangeOption={() => {}}
          />
        )}
      </div>

      <div className={styles.full}>
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
              values={project.socialHelpForm}
              options={socialHelpForm!}
              heading="Формы социального обслуживания (сопровождения)"
              onChangeOption={() => {}}
            />
          )}
        </div>
      </div>

      <TextArea
        readOnly
        className={styles.half}
        name="basicQualityResults"
        value={project.basicQualityResults}
        onChange={() => {}}
        heading="Основные качественные результаты"
        placeholder="Основные качественные результаты"
      />
      <TextArea
        readOnly
        className={styles.half}
        name="socialResults"
        value={project.socialResults}
        onChange={() => {}}
        heading="Социальные результаты"
        placeholder="Социальные результаты"
      />

      <TextArea
        readOnly
        className={styles.half}
        name="replicability"
        value={project.replicability || '-'}
        onChange={() => {}}
        heading="Тиражируемость"
        placeholder="Тиражируемость"
      />
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Апробация на инновационной площадке/в ресурсном центре"
        value={!!project.innovationGround}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="innovationGround"
          value={project.innovationGround!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Наличие экспертного заключения"
        value={!!project.hasExpertOpinion}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="hasExpertOpinion"
          value={project.hasExpertOpinion!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Наличие рецензии"
        value={!!project.hasExpertReview}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="hasExpertReview"
          value={project.hasExpertReview!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>

      <div className={styles.full}>
        <HelperEnableSelect
          readOnly
          className={styles.half}
          heading="Наличие отзыва"
          value={!!project.hasExpertMention}
          onChangeOption={() => {}}
        >
          <TextArea
            readOnly
            name="hasExpertMention"
            value={project.hasExpertMention!}
            onChange={() => {}}
            placeholder="Описание"
          />
        </HelperEnableSelect>
      </div>

      <div className={styles.half}>
        <PhotoInput
          viewMode
          name="photo"
          category="job-primary-photo"
          photoId={project.photo?.id ?? -1}
          photoPath={project.photo?.path ?? ''}
          photoName={project.photo?.name ?? ''}
          onPhotoChange={() => {}}
          heading="Фотография"
        />
      </div>
      <div className={styles.half}>
        <GalleryInput
          viewMode
          name="gallery"
          category="job-primary-gallery"
          gallery={project.gallery ?? []}
          heading="Галерея"
          onGalleryPhotosAdd={() => {}}
          onGalleryPhotoDelete={() => {}}
        />
      </div>

      <TextArea
        readOnly
        className={styles.half}
        name="video"
        value={project.video || '-'}
        onChange={() => {}}
        heading="Видео ролик"
        placeholder="Видео ролик"
      />
      <TextArea
        readOnly
        className={styles.half}
        name="resourcesDescription"
        value={project.resourcesDescription}
        onChange={() => {}}
        heading="Краткое описание необходимого ресурсного обеспечения"
        placeholder="Краткое описание необходимого ресурсного обеспечения"
      />
    </div>
  );
};
