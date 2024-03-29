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
import { IEducationProgramState } from 'types/entities/educationProgram';
import { useDirections } from 'hooks/queries/useDirections';
import { useConductingClassesForm } from 'hooks/queries/useConductingClassesForm';

type Props = {
  switchers: IProjectSwitchers;
  mainPartition: IEducationProgramState['mainPartition'];
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
  selectsErrors: {
    [key in keyof IEducationProgramState['mainPartition']]: boolean;
  }; //not all, done just for selects tooltips
};

export const EducationProgramMainPartitionStep = ({
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
        {conductingClassesFormLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Форма проведения занятий *"
          />
        ) : conductingClassesFormError ? (
          <Input value={''} heading="Форма проведения занятий *" readOnly />
        ) : (
          <Select
            withUnselect
            value={mainPartition.conductingClassesForm}
            options={conductingClassesForm!}
            isError={selectsErrors.conductingClassesForm}
            heading="Форма проведения занятий *"
            onChangeOption={bindSelect('conductingClassesForm')}
          />
        )}
      </div>
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
      {
        //[Removed 12.10.2022 by clients correction]
      }
      {/* <TextArea
        className={styles.half}
        name="datesAndModeOfStudy"
        value={mainPartition.datesAndModeOfStudy.value}
        onChange={onChange}
        error={mainPartition.datesAndModeOfStudy.error}
        heading="Сроки, режим занятий *"
        placeholder="Сроки, режим занятий"
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
        </div> */}
        <Checkbox
          checked={mainPartition.canBeDistant}
          onToggle={bindCheckToggle('canBeDistant')}
          label={<Text>Возможность реализации в дистанционном формате</Text>}
        />
      </div>

      {
        //[Just hidden 12.10.2022 by clients correction]
      }
      {/* <HelperEnableSelect
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
      </HelperEnableSelect> */}

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
              onChangeOption={bindMultipleSelect(
                'circumstancesRecognitionNeed'
              )}
            />
          )}
        </div>
        <div>
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

      <div className={styles.full}>
        <HelperEnableSelect
          className={combineClasses(styles.half, styles.leadHelper)}
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
          className={styles.half}
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
            hint={
              'Желаемые характеристики:\nразрешение: 16:9,\nразмер: ~250кб,\nформат: jpg, png, gif'
            }
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
            hint={
              'Желаемые характеристики:\nразрешение: 16:9,\nразмер: ~250кб,\nформат: jpg, png, gif'
            }
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
