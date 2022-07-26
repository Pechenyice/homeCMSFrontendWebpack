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
import { useDistricts } from 'hooks';
import { useAttractingVolunteer } from 'hooks/queries/useAttractingVolunteer';
import { useCategories } from 'hooks/queries/useCategories';
import { useCircumstancesRecognitionNeed } from 'hooks/queries/useCircumstancesRecognitionNeed';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { useRNSUCategories } from 'hooks/queries/useRNSUCategories';
import { useWorksNames } from 'hooks/queries/useWorksNames';
import { useTargetGroups } from 'hooks/queries/useTargetGroups';
import { ChangeEvent } from 'react';
import { IMainHelpers } from 'types/entities/entities';
import { IProjectState, IProjectSwitchers } from 'types/entities/states';
import styles from './PartitionStep.module.scss';
import { useStatuses } from 'hooks/queries/useStatuses';
import { useSocialHelpForms } from 'hooks/queries/useSocialHelpForms';
import { useKinds } from 'hooks/queries/useKinds';
import { GalleryInput } from 'components/kit/GalleryInput/GalleryInput';

type Props = {
  switchers: IProjectSwitchers;
  mainPartition: IProjectState['mainPartition'];
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitcherChange: (switcherName: string, value: boolean) => void;
  onSelect: (name: string, option: number) => void;
  onMultipleSelect: (name: string, option: number) => void;
  onCheckToggle: (name: string) => void;
  onPhotoChange: (
    name: string,
    photoPath: string | null,
    photoName: string | null
  ) => void;
};

export const MainPartitionStep = ({
  switchers,
  mainPartition,
  onChange,
  onSwitcherChange,
  onSelect,
  onMultipleSelect,
  onCheckToggle,
  onPhotoChange,
}: Props) => {
  //TODO: replace useDistricts with right hooks
  const {
    apiData: realisationForCitizen,
    isLoading: realisationForCitizenLoading,
    isError: realisationForCitizenError,
  } = useRealisationForCitizen();
  const {
    apiData: attractingVolunteer,
    isLoading: attractingVolunteerLoading,
    isError: attractingVolunteerError,
  } = useAttractingVolunteer();

  const {
    apiData: status,
    isLoading: statusLoading,
    isError: statusError,
  } = useStatuses();
  const {
    apiData: category,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useCategories();

  const {
    apiData: groups,
    isLoading: groupsLoading,
    isError: groupsError,
  } = useTargetGroups();
  const {
    apiData: kind,
    isLoading: kindLoading,
    isError: kindError,
  } = useKinds();

  const {
    apiData: worksName,
    isLoading: worksNameLoading,
    isError: worksNameError,
  } = useWorksNames();
  const {
    apiData: partners,
    isLoading: partnersLoading,
    isError: partnersError,
  } = useDistricts();

  const {
    apiData: circumstancesRecognitionNeed,
    isLoading: circumstancesRecognitionNeedLoading,
    isError: circumstancesRecognitionNeedError,
  } = useCircumstancesRecognitionNeed();
  const {
    apiData: socialHelpForm,
    isLoading: socialHelpFormLoading,
    isError: socialHelpFormError,
  } = useSocialHelpForms();

  const {
    apiData: rnsuCategory,
    isLoading: rnsuCategoryLoading,
    isError: rnsuCategoryError,
  } = useRNSUCategories();

  const {
    apiData: realizationLevels,
    isLoading: realizationLevelsLoading,
    isError: realizationLevelsError,
  } = useDistricts();
  const {
    apiData: worksKinds,
    isLoading: worksKindsLoading,
    isError: worksKindsError,
  } = useDistricts();

  const {
    apiData: worksNames,
    isLoading: worksNamesLoading,
    isError: worksNamesError,
  } = useDistricts();
  const {
    apiData: gosWorkNames,
    isLoading: gosWorkNamesLoading,
    isError: gosWorkNamesError,
  } = useDistricts();

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

  const bindCheckToggle = (name: string) => () => {
    onCheckToggle(name);
  };

  const bindPhotoChange = (name: string) => (
    photoPath: string | null,
    photoName: string | null
  ) => {
    onPhotoChange(name, photoPath, photoName);
  };

  return (
    <div className={styles.wrapper}>
      <Input
        name="name"
        value={mainPartition.name.value}
        onChange={onChange}
        error={mainPartition.name.error}
        heading="Наименование проекта *"
        placeholder="Наименование проекта"
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
        hint="Опишите проект, не более 2500 знаков без пробелов"
      />
      <TextArea
        className={styles.half}
        name="purpose"
        value={mainPartition.purpose.value}
        onChange={onChange}
        error={mainPartition.purpose.error}
        heading="Цель проекта *"
        placeholder="Цель проекта"
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
      <HelperEnableSelect
        className={styles.half}
        heading="Вы участник, а не организатор *"
        value={switchers.organisator}
        onChangeOption={bindSwitcherChange('organisator')}
        hint="Можно указать несколько организаций-организаторов проекта"
      >
        <TextArea
          name="organisator"
          value={mainPartition.organisator.value}
          onChange={onChange}
          error={mainPartition.organisator.error}
          placeholder="Укажите организаторов"
        />
      </HelperEnableSelect>

      <TextArea
        className={styles.half}
        name="period"
        value={mainPartition.period.value}
        onChange={onChange}
        error={mainPartition.period.error}
        heading="Период реализации проекта *"
        placeholder="Период реализации проекта"
        hint="Укажите дату начала и предполагаемого окончания проекта"
      />
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

      <div className={styles.half}>
        {realizationLevelsLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Уровень реализации проекта *"
          />
        ) : realizationLevelsError ? (
          <Input value={''} heading="Уровень реализации проекта *" readOnly />
        ) : (
          <Select
            withUnselect
            value={mainPartition.organizationLevel}
            options={realizationLevels!}
            heading="Уровень реализации проекта *"
            onChangeOption={bindSelect('organizationLevel')}
          />
        )}
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
            heading="Категории по РНСУ *"
            onChangeOption={bindMultipleSelect('rnsuCategories')}
          />
        )}
      </div>

      <div className={styles.half}>
        <div className={styles.leadHelper}>
          {categoryLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Категории *"
            />
          ) : categoryError ? (
            <Input value={''} heading="Категории *" readOnly />
          ) : (
            <MultipleSelect
              values={mainPartition.categories}
              options={category!}
              heading="Категории *"
              onChangeOption={bindMultipleSelect('categories')}
            />
          )}
        </div>
        <div>
          {groupsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Целевые группы *"
            />
          ) : groupsError ? (
            <Input value={''} heading="Целевые группы *" readOnly />
          ) : mainPartition.categories.length ? (
            <MultipleSelect
              values={mainPartition.groups}
              options={groups!}
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
          {worksKindsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Виды услуг"
            />
          ) : worksKindsError ? (
            <Input value={''} heading="Виды услуг" readOnly />
          ) : (
            <MultipleSelect
              values={mainPartition.worksKinds}
              options={worksKinds!}
              heading="Виды услуг"
              onChangeOption={bindMultipleSelect('worksKinds')}
            />
          )}
        </div>
        <div>
          {worksNamesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Наименования услуг"
            />
          ) : worksNamesError ? (
            <Input value={''} heading="Наименования услуг" readOnly />
          ) : mainPartition.worksKinds.length ? (
            <MultipleSelect
              values={mainPartition.worksNames}
              options={worksNames!}
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
            heading="Обстоятельства признания нуждаемости *"
            onChangeOption={bindMultipleSelect('circumstancesRecognitionNeed')}
          />
        )}
      </div>

      <div className={styles.full}>
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
        hint="Укажите, когда и какая организация внедрила Ваш проект в свою работу"
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
          className={styles.half}
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
      </div>

      <div className={styles.half}>
        {
          <PhotoInput
            name="photo"
            category="job_project_photo"
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
            category="job_project_gallery"
            gallery={mainPartition.gallery}
            heading="Галерея"
            hint="Характеристики фото галереи"
          />
        }
      </div>

      <TextArea
        className={styles.half}
        name="video"
        value={mainPartition.video.value}
        onChange={onChange}
        error={mainPartition.video.error}
        heading="Видео ролик"
        placeholder="Видео ролик"
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
