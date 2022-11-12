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
import { useProgramTypes } from 'hooks/queries/useProgramTypes';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { useRealizationLevels } from 'hooks/queries/useRealizationLevels';
import { useRnsuCategory } from 'hooks/queries/useRnsuCategory';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { useWorksKinds } from 'hooks/queries/useWorksKinds';
import { useWorksNames } from 'hooks/queries/useWorksNames';
import { IClubData } from 'types/entities/club';
import { IProjectData } from 'types/entities/project';
import { ISocialWorkData } from 'types/entities/socialWork';
import { combineClasses } from 'utils/common';
import { getRelatedCategoriesOptions } from 'utils/entities/common';
import styles from './ClubViewMainPartition.module.scss';

type Props = {
  club: IClubData;
};

export const ClubViewMainPartition = ({ club }: Props) => {
  //[Removed 12.10.2022 by clients correction]
  // const {
  //   apiData: realisationForCitizen,
  //   isLoading: realisationForCitizenLoading,
  //   isError: realisationForCitizenError,
  // } = useRealisationForCitizen();
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

  const {
    apiData: programTypes,
    isLoading: programTypesLoading,
    isError: programTypesError,
  } = useProgramTypes();

  return (
    <div className={styles.wrapper}>
      <Input
        readOnly
        className={styles.full}
        heading="Наименование клуба"
        placeholder="Наименование клуба"
        value={club.name}
      />

      <Checkbox
        readOnly
        className={styles.full}
        label="Лучшая практика по мнению руководства организации"
        checked={club.bestPracticeForLeadership}
      />

      <TextArea
        readOnly
        className={styles.half}
        heading="Аннотация"
        placeholder="Аннотация"
        value={club.annotation}
      />
      <TextArea
        readOnly
        className={styles.half}
        heading="Цель"
        placeholder="Цель"
        value={club.purpose}
      />

      <TextArea
        readOnly
        className={styles.half}
        heading="Основные задачи"
        placeholder="Основные задачи"
        value={club.tasks}
      />

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
            value={club.conductingClassesForm}
            options={conductingClassesForm!}
            heading="Форма проведения занятий"
            onChangeOption={() => {}}
          />
        )}
      </div>

      {
        //[Removed 12.10.2022 by clients correction]
      }
      {/* <TextArea
        readOnly
        className={styles.half}
        heading="График"
        placeholder="График"
        value={club.schedule}
      /> */}

      <div className={styles.half}>
        {
          //[Removed 12.10.2022 by clients correction]
        }
        {/* <div className={styles.leadHelper}>
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
              value={club.realisationForCitizen}
              options={realisationForCitizen!}
              heading="Реализация для гражданина бесплатно/платно"
              onChangeOption={() => {}}
            />
          )}
        </div> */}
        <Checkbox
          readOnly
          className={styles.full}
          label="Возможность реализации в дистанционном формате"
          checked={club.canBeDistant}
        />
      </div>

      {
        //[Just hidden 12.10.2022 by clients correction]
      }
      {/* <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Взаимодействие, партнерство с другими организациями"
        value={!!club.partnership}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="partnership"
          value={club.partnership!}
          onChange={() => {}}
          placeholder="Укажите партнеров"
        />
      </HelperEnableSelect> */}

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
            value={club.attractingVolunteer}
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
            values={club.rnsuCategories}
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
              values={club.categories}
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
          ) : club.categories.length ? (
            <MultipleSelect
              viewMode
              values={club.groups}
              options={getRelatedCategoriesOptions(
                club.categories,
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
              values={club.worksKinds}
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
          ) : club.worksKinds?.length ? (
            <MultipleSelect
              viewMode
              values={club.worksNames}
              options={getRelatedCategoriesOptions(
                club.worksKinds,
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
            values={club.gosWorkNames}
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
            values={club.circumstancesRecognitionNeed}
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
            values={club.socialHelpForm}
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
        value={club.basicQualityResults}
        onChange={() => {}}
        heading="Основные качественные результаты"
        placeholder="Основные качественные результаты"
      />
      <TextArea
        readOnly
        className={styles.half}
        name="socialResults"
        value={club.socialResults}
        onChange={() => {}}
        heading="Социальные результаты"
        placeholder="Социальные результаты"
      />

      <TextArea
        readOnly
        className={styles.half}
        name="replicability"
        value={club.replicability || '-'}
        onChange={() => {}}
        heading="Тиражируемость"
        placeholder="Тиражируемость"
      />
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Апробация на инновационной площадке/в ресурсном центре"
        value={!!club.innovationGround}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="innovationGround"
          value={club.innovationGround!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Наличие экспертного заключения"
        value={!!club.hasExpertOpinion}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="hasExpertOpinion"
          value={club.hasExpertOpinion!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Наличие рецензии"
        value={!!club.hasExpertReview}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="hasExpertReview"
          value={club.hasExpertReview!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>

      <div className={styles.full}>
        <HelperEnableSelect
          readOnly
          className={combineClasses(styles.half, styles.leadHelper)}
          heading="Наличие отзыва"
          value={!!club.hasExpertMention}
          onChangeOption={() => {}}
        >
          <TextArea
            readOnly
            name="hasExpertMention"
            value={club.hasExpertMention!}
            onChange={() => {}}
            placeholder="Описание"
          />
        </HelperEnableSelect>
        <Checkbox
          readOnly
          className={styles.half}
          label="Практика размещена в АСИ «Смартека»"
          checked={club.isInASI}
        />
      </div>

      <div className={styles.half}>
        <PhotoInput
          viewMode
          name="photo"
          category="job-primary-photo"
          photoId={club.photo?.id ?? -1}
          photoPath={club.photo?.path ?? ''}
          photoName={club.photo?.name ?? ''}
          onPhotoChange={() => {}}
          heading="Фотография"
        />
      </div>
      <div className={styles.half}>
        <GalleryInput
          viewMode
          name="gallery"
          category="job-primary-gallery"
          gallery={club.gallery ?? []}
          heading="Галерея"
          onGalleryPhotosAdd={() => {}}
          onGalleryPhotoDelete={() => {}}
        />
      </div>

      <TextArea
        readOnly
        className={styles.half}
        name="video"
        value={club.video || '-'}
        onChange={() => {}}
        heading="Видеоролик"
        placeholder="Видеоролик"
      />
      <TextArea
        readOnly
        className={styles.half}
        name="resourcesDescription"
        value={club.resourcesDescription}
        onChange={() => {}}
        heading="Краткое описание необходимого ресурсного обеспечения"
        placeholder="Краткое описание необходимого ресурсного обеспечения"
      />
    </div>
  );
};
