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
import { IProjectData } from 'types/entities/project';
import { ISocialWorkData } from 'types/entities/socialWork';
import { combineClasses } from 'utils/common';
import { getRelatedCategoriesOptions } from 'utils/entities/common';
import styles from './SocialWorkViewMainPartition.module.scss';

type Props = {
  socialWork: ISocialWorkData;
};

export const SocialWorkViewMainPartition = ({ socialWork }: Props) => {
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
        heading="Наименование программы"
        placeholder="Наименование программы"
        value={socialWork.name}
      />

      <Checkbox
        readOnly
        className={styles.full}
        label="Лучшая практика по мнению руководства организации"
        checked={socialWork.bestPracticeForLeadership}
      />

      <TextArea
        readOnly
        className={styles.half}
        heading="Аннотация"
        placeholder="Аннотация"
        value={socialWork.annotation}
      />
      <TextArea
        readOnly
        className={styles.half}
        heading="Цель"
        placeholder="Цель"
        value={socialWork.purpose}
      />

      <div className={combineClasses(styles.full, styles.flex)}>
        <TextArea
          readOnly
          className={styles.half}
          heading="Основные задачи"
          placeholder="Основные задачи"
          value={socialWork.tasks}
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
              value={socialWork.direction}
              options={directions!}
              heading="Направленность"
              onChangeOption={() => {}}
            />
          )}
        </div>
      </div>

      <div className={styles.half}>
        {programTypesLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Вид программы"
          />
        ) : programTypesError ? (
          <Input value={''} heading="Вид программы" readOnly />
        ) : (
          <Select
            viewMode
            value={socialWork.programType}
            options={programTypes!}
            heading="Вид программы"
            onChangeOption={() => {}}
          />
        )}
      </div>

      <div className={styles.half}>
        {conductingClassesFormLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Форма проведения мероприятий"
          />
        ) : conductingClassesFormError ? (
          <Input value={''} heading="Форма проведения мероприятий" readOnly />
        ) : (
          <Select
            viewMode
            value={socialWork.conductingClassesForm}
            options={conductingClassesForm!}
            heading="Форма проведения мероприятий"
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
        heading="Сроки, режим занятий"
        placeholder="Сроки, режим занятий"
        value={socialWork.datesAndModeOfStudy}
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
              value={socialWork.realisationForCitizen}
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
          checked={socialWork.canBeDistant}
        />
      </div>

      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Взаимодействие, партнерство с другими организациями"
        value={!!socialWork.partnership}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="partnership"
          value={socialWork.partnership!}
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
            value={socialWork.attractingVolunteer}
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
            values={socialWork.rnsuCategories}
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
              values={socialWork.categories}
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
          ) : socialWork.categories.length ? (
            <MultipleSelect
              viewMode
              values={socialWork.groups}
              options={getRelatedCategoriesOptions(
                socialWork.categories,
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
              values={socialWork.worksKinds}
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
          ) : socialWork.worksKinds?.length ? (
            <MultipleSelect
              viewMode
              values={socialWork.worksNames}
              options={getRelatedCategoriesOptions(
                socialWork.worksKinds,
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
            values={socialWork.gosWorkNames}
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
            values={socialWork.circumstancesRecognitionNeed}
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
            values={socialWork.socialHelpForm}
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
        value={socialWork.basicQualityResults}
        onChange={() => {}}
        heading="Основные качественные результаты"
        placeholder="Основные качественные результаты"
      />
      <TextArea
        readOnly
        className={styles.half}
        name="socialResults"
        value={socialWork.socialResults}
        onChange={() => {}}
        heading="Социальные результаты"
        placeholder="Социальные результаты"
      />

      <TextArea
        readOnly
        className={styles.half}
        name="replicability"
        value={socialWork.replicability || '-'}
        onChange={() => {}}
        heading="Тиражируемость"
        placeholder="Тиражируемость"
      />
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Апробация на инновационной площадке/в ресурсном центре"
        value={!!socialWork.innovationGround}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="innovationGround"
          value={socialWork.innovationGround!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Наличие экспертного заключения"
        value={!!socialWork.hasExpertOpinion}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="hasExpertOpinion"
          value={socialWork.hasExpertOpinion!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Наличие рецензии"
        value={!!socialWork.hasExpertReview}
        onChangeOption={() => {}}
      >
        <TextArea
          readOnly
          name="hasExpertReview"
          value={socialWork.hasExpertReview!}
          onChange={() => {}}
          placeholder="Описание"
        />
      </HelperEnableSelect>

      <div className={styles.full}>
        <HelperEnableSelect
          readOnly
          className={combineClasses(styles.half, styles.leadHelper)}
          heading="Наличие отзыва"
          value={!!socialWork.hasExpertMention}
          onChangeOption={() => {}}
        >
          <TextArea
            readOnly
            name="hasExpertMention"
            value={socialWork.hasExpertMention!}
            onChange={() => {}}
            placeholder="Описание"
          />
        </HelperEnableSelect>
        <Checkbox
          readOnly
          className={styles.half}
          label="Практика размещена в АСИ «Смартека»"
          checked={socialWork.isInASI}
        />
      </div>

      <div className={styles.half}>
        <PhotoInput
          viewMode
          name="photo"
          category="job-primary-photo"
          photoId={socialWork.photo?.id ?? -1}
          photoPath={socialWork.photo?.path ?? ''}
          photoName={socialWork.photo?.name ?? ''}
          onPhotoChange={() => {}}
          heading="Фотография"
        />
      </div>
      <div className={styles.half}>
        <GalleryInput
          viewMode
          name="gallery"
          category="job-primary-gallery"
          gallery={socialWork.gallery ?? []}
          heading="Галерея"
          onGalleryPhotosAdd={() => {}}
          onGalleryPhotoDelete={() => {}}
        />
      </div>

      <TextArea
        readOnly
        className={styles.half}
        name="video"
        value={socialWork.video || '-'}
        onChange={() => {}}
        heading="Видеоролик"
        placeholder="Видеоролик"
      />
      <TextArea
        readOnly
        className={styles.half}
        name="resourcesDescription"
        value={socialWork.resourcesDescription}
        onChange={() => {}}
        heading="Краткое описание необходимого ресурсного обеспечения"
        placeholder="Краткое описание необходимого ресурсного обеспечения"
      />
    </div>
  );
};
