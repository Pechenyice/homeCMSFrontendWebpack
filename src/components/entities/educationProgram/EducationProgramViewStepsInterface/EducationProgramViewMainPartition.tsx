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
import { useConductingClassesForm } from 'hooks/queries/useConductingClassesForm';
import { useDirections } from 'hooks/queries/useDirections';
import { useGosWorkNames } from 'hooks/queries/useGosWorkNames';
import { useGroups } from 'hooks/queries/useGroups';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { useRealizationLevels } from 'hooks/queries/useRealizationLevels';
import { useRnsuCategory } from 'hooks/queries/useRnsuCategory';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { useWorksKinds } from 'hooks/queries/useWorksKinds';
import { useWorksNames } from 'hooks/queries/useWorksNames';
import { IEducationProgramData } from 'types/entities/educationProgram';
import { IProjectData } from 'types/entities/project';
import { combineClasses } from 'utils/common';
import { getRelatedCategoriesOptions } from 'utils/entities/common';
import styles from './EducationProgramViewMainPartition.module.scss';

type Props = {
  data: IEducationProgramData;
};

export const EducationProgramViewMainPartition = ({ data }: Props) => {
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
    apiData: conductingClassesForm,
    isLoading: conductingClassesFormLoading,
    isError: conductingClassesFormError,
  } = useConductingClassesForm();

  return (
    <div className={styles.wrapper}>
      <Input
        readOnly
        className={styles.full}
        heading="Наименование программы"
        placeholder="Наименование программы"
        value={data.name}
      />

      <Checkbox
        readOnly
        className={styles.full}
        label="Лучшая практика по мнению руководства организации"
        checked={data.bestPracticeForLeadership}
      />

      <TextArea
        readOnly
        className={styles.half}
        heading="Аннотация"
        placeholder="Аннотация"
        value={data.annotation}
      />
      <TextArea
        readOnly
        className={styles.half}
        heading="Цель"
        placeholder="Цель"
        value={data.purpose}
      />

      <div className={combineClasses(styles.full, styles.flex)}>
        <TextArea
          readOnly
          className={styles.half}
          heading="Основные задачи"
          placeholder="Основные задачи"
          value={data.tasks}
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
              value={data.direction}
              options={directions!}
              heading="Направленность"
              onChangeOption={() => {}}
            />
          )}
        </div>
      </div>

      <div className={combineClasses(styles.full, styles.flex)}>
        <div className={styles.half}>
          {conductingClassesFormLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Форма проведения занятий"
            />
          ) : conductingClassesFormError ? (
            <Input value={''} heading="Форма проведения занятий" readOnly />
          ) : (
            <Select
              viewMode
              value={data.conductingClassesForm}
              options={conductingClassesForm!}
              heading="Форма проведения занятий"
              onChangeOption={() => {}}
            />
          )}
        </div>
        <TextArea
          readOnly
          className={styles.half}
          heading="Сроки, режим занятий"
          placeholder="Сроки, режим занятий"
          value={data.datesAndModeOfStudy}
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
              value={data.realisationForCitizen}
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
          checked={data.canBeDistant}
        />
      </div>

      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Взаимодействие, партнерство с другими организациями"
        value={!!data.partnership}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="partnership"
          value={data.partnership!}
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
            value={data.attractingVolunteer}
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
            values={data.rnsuCategories}
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
              values={data.categories}
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
          ) : data.categories.length ? (
            <MultipleSelect
              viewMode
              values={data.groups}
              options={getRelatedCategoriesOptions(
                data.categories,
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

      <div className={combineClasses(styles.full, styles.flex)}>
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
              values={data.circumstancesRecognitionNeed}
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
              values={data.socialHelpForm}
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
        value={data.basicQualityResults}
        onChange={() => {}}
        heading="Основные качественные результаты"
        placeholder="Основные качественные результаты"
      />
      <TextArea
        readOnly
        className={styles.half}
        name="socialResults"
        value={data.socialResults}
        onChange={() => {}}
        heading="Социальные результаты"
        placeholder="Социальные результаты"
      />

      <TextArea
        readOnly
        className={styles.half}
        name="replicability"
        value={data.replicability || '-'}
        onChange={() => {}}
        heading="Тиражируемость"
        placeholder="Тиражируемость"
      />
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Апробация на инновационной площадке/в ресурсном центре"
        value={!!data.innovationGround}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="innovationGround"
          value={data.innovationGround!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Наличие экспертного заключения"
        value={!!data.hasExpertOpinion}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="hasExpertOpinion"
          value={data.hasExpertOpinion!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Наличие рецензии"
        value={!!data.hasExpertReview}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="hasExpertReview"
          value={data.hasExpertReview!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>

      <div className={styles.full}>
        <HelperEnableSelect
          readOnly
          className={combineClasses(styles.half, styles.leadHelper)}
          heading="Наличие отзыва"
          value={!!data.hasExpertMention}
          onChangeOption={() => {}}
        >
          <TextArea
            readOnly
            name="hasExpertMention"
            value={data.hasExpertMention!}
            onChange={() => {}}
            placeholder="Описание"
          />
        </HelperEnableSelect>
        <Checkbox
          readOnly
          className={styles.half}
          label="Практика размещена в АСИ 'Смартека'"
          checked={data.isInASI}
        />
      </div>

      <div className={styles.half}>
        <PhotoInput
          viewMode
          name="photo"
          category="job-primary-photo"
          photoId={data.photo?.id ?? -1}
          photoPath={data.photo?.path ?? ''}
          photoName={data.photo?.name ?? ''}
          onPhotoChange={() => {}}
          heading="Фотография"
        />
      </div>
      <div className={styles.half}>
        <GalleryInput
          viewMode
          name="gallery"
          category="job-primary-gallery"
          gallery={data.gallery ?? []}
          heading="Галерея"
          onGalleryPhotosAdd={() => {}}
          onGalleryPhotoDelete={() => {}}
        />
      </div>

      <TextArea
        readOnly
        className={styles.half}
        name="video"
        value={data.video || '-'}
        onChange={() => {}}
        heading="Видео ролик"
        placeholder="Видео ролик"
      />
      <TextArea
        readOnly
        className={styles.half}
        name="resourcesDescription"
        value={data.resourcesDescription}
        onChange={() => {}}
        heading="Краткое описание необходимого ресурсного обеспечения"
        placeholder="Краткое описание необходимого ресурсного обеспечения"
      />
    </div>
  );
};
