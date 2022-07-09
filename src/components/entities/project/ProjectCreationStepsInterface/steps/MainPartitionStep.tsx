import {
  Checkbox,
  ESkeletonMode,
  HelperEnableSelect,
  Input,
  MultipleSelect,
  Select,
  Skeleton,
  Text,
  TextArea,
} from 'components/kit';
import { useDistricts } from 'hooks';
import { ChangeEvent } from 'react';
import { IMainHelpers } from 'types/entities/entities';
import { IProjectState } from 'types/entities/states';
import styles from './PartitionStep.module.scss';

type Props = {
  mainPartition: IProjectState['mainPartition'];
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onHelperChange: (helperName: string, value: boolean) => void;
  onSelect: (name: string, option: number) => void;
  onMultipleSelect: (name: string, option: number) => void;
  onCheckToggle: (name: string) => void;
};

export const MainPartitionStep = ({
  mainPartition,
  onChange,
  onHelperChange,
  onSelect,
  onMultipleSelect,
  onCheckToggle,
}: Props) => {
  //TODO: replace with right hooks
  const {
    apiData: realisationForCitizen,
    isLoading: realisationForCitizenLoading,
    isError: realisationForCitizenError,
  } = useDistricts();
  const {
    apiData: attractingVolunteer,
    isLoading: attractingVolunteerLoading,
    isError: attractingVolunteerError,
  } = useDistricts();

  const {
    apiData: status,
    isLoading: statusLoading,
    isError: statusError,
  } = useDistricts();
  const {
    apiData: category,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useDistricts();

  const {
    apiData: groups,
    isLoading: groupsLoading,
    isError: groupsError,
  } = useDistricts();
  const {
    apiData: kind,
    isLoading: kindLoading,
    isError: kindError,
  } = useDistricts();

  const {
    apiData: worksName,
    isLoading: worksNameLoading,
    isError: worksNameError,
  } = useDistricts();
  const {
    apiData: partners,
    isLoading: partnersLoading,
    isError: partnersError,
  } = useDistricts();

  const {
    apiData: circumstancesRecognitionNeed,
    isLoading: circumstancesRecognitionNeedLoading,
    isError: circumstancesRecognitionNeedError,
  } = useDistricts();
  const {
    apiData: socialHelpForm,
    isLoading: socialHelpFormLoading,
    isError: socialHelpFormError,
  } = useDistricts();

  const {
    apiData: rnsuCategory,
    isLoading: rnsuCategoryLoading,
    isError: rnsuCategoryError,
  } = useDistricts();

  /**
   * binders
   */
  const bindHelperChange = (helperName: string) => {
    return (value: boolean) => onHelperChange(helperName, value);
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
      />
      <TextArea
        className={styles.half}
        name="period"
        value={mainPartition.period.value}
        onChange={onChange}
        error={mainPartition.period.error}
        heading="Период реализации проекта *"
        placeholder="Период реализации проекта"
      />
      <TextArea
        className={styles.half}
        name="technologies"
        value={mainPartition.technologies.value}
        onChange={onChange}
        error={mainPartition.technologies.error}
        heading="Технологии, формы, методы *"
        placeholder="Технологии, формы, методы"
      />
      <TextArea
        className={styles.half}
        name="annotation"
        value={mainPartition.annotation.value}
        onChange={onChange}
        error={mainPartition.annotation.error}
        heading="Аннотация *"
        placeholder="Аннотация"
      />
      <HelperEnableSelect
        className={styles.half}
        heading="Вы участник, а не организатор *"
        value={mainPartition.isMemberAndNotOrganisator}
        onChangeOption={bindHelperChange('isMemberAndNotOrganisator')}
      >
        <Input
          name="organisator"
          value={mainPartition.organisator.value}
          onChange={onChange}
          error={mainPartition.organisator.error}
          placeholder="Организатор"
        />
      </HelperEnableSelect>
      <div className={styles.half}>
        {realisationForCitizenLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Реализация для гражданина *"
          />
        ) : realisationForCitizenError ? (
          <Input value={''} heading="Реализация для гражданина *" readOnly />
        ) : (
          <Select
            withUnselect
            value={mainPartition.realisationForCitizen}
            options={realisationForCitizen!}
            heading="Реализация для гражданина *"
            onChangeOption={bindSelect('realisationForCitizen')}
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
            heading="Привлечение добровольцев и волонтеров *"
            onChangeOption={bindSelect('attractingVolunteer')}
          />
        )}
      </div>
      <div className={styles.half}>
        {statusLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Статус проекта *"
          />
        ) : statusError ? (
          <Input value={''} heading="Статус проекта *" readOnly />
        ) : (
          <Select
            withUnselect
            value={mainPartition.projectStatus}
            options={status!}
            heading="Статус проекта *"
            onChangeOption={bindSelect('projectStatus')}
          />
        )}
      </div>
      <div className={styles.half}>
        {categoryLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Категория *"
          />
        ) : categoryError ? (
          <Input value={''} heading="Категория *" readOnly />
        ) : (
          <Select
            withUnselect
            value={mainPartition.category}
            options={category!}
            heading="Категория *"
            onChangeOption={bindSelect('category')}
          />
        )}
      </div>
      <div className={styles.half}>
        {groupsLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Целевые группы *"
          />
        ) : groupsError ? (
          <Input value={''} heading="Целевые группы *" readOnly />
        ) : (
          <MultipleSelect
            values={mainPartition.groups}
            options={groups!}
            heading="Целевые группы *"
            onChangeOption={bindMultipleSelect('groups')}
          />
        )}
      </div>
      <div className={styles.half}>
        {kindLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Вид услуги *"
          />
        ) : kindError ? (
          <Input value={''} heading="Вид услуги *" readOnly />
        ) : (
          <Select
            withUnselect
            value={mainPartition.kind}
            options={kind!}
            heading="Вид услуги *"
            onChangeOption={bindSelect('kind')}
          />
        )}
      </div>
      <div className={styles.half}>
        {worksNameLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Наименование работ *"
          />
        ) : worksNameError ? (
          <Input value={''} heading="Наименование работ *" readOnly />
        ) : (
          <Select
            withUnselect
            value={mainPartition.worksName}
            options={worksName!}
            heading="Наименование работ *"
            onChangeOption={bindSelect('worksName')}
          />
        )}
      </div>
      <div className={styles.half}>
        {partnersLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Партнеры *"
          />
        ) : partnersError ? (
          <Input value={''} heading="Партнеры *" readOnly />
        ) : (
          <MultipleSelect
            values={mainPartition.partners}
            options={partners!}
            heading="Партнеры *"
            onChangeOption={bindMultipleSelect('partners')}
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
          <Select
            withUnselect
            value={mainPartition.circumstancesRecognitionNeed}
            options={circumstancesRecognitionNeed!}
            heading="Обстоятельства признания нуждаемости *"
            onChangeOption={bindSelect('circumstancesRecognitionNeed')}
          />
        )}
      </div>
      <div className={styles.half}>
        {socialHelpFormLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Форма социального обслуживания (сопровождения) *"
          />
        ) : socialHelpFormError ? (
          <Input
            value={''}
            heading="Форма социального обслуживания (сопровождения) *"
            readOnly
          />
        ) : (
          <Select
            withUnselect
            value={mainPartition.socialHelpForm}
            options={socialHelpForm!}
            heading="Форма социального обслуживания (сопровождения) *"
            onChangeOption={bindSelect('socialHelpForm')}
          />
        )}
      </div>
      <div className={styles.half}>
        {rnsuCategoryLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="Категория по РНСУ *"
          />
        ) : rnsuCategoryError ? (
          <Input value={''} heading="Категория по РНСУ *" readOnly />
        ) : (
          <Select
            withUnselect
            value={mainPartition.rnsuCategory}
            options={rnsuCategory!}
            heading="Категория по РНСУ *"
            onChangeOption={bindSelect('rnsuCategory')}
          />
        )}
      </div>
      <div className={styles.half}>
        {
          //TODO: photo
        }
      </div>
      <TextArea
        className={styles.half}
        name="basicQualityResults"
        value={mainPartition.basicQualityResults.value}
        onChange={onChange}
        error={mainPartition.basicQualityResults.error}
        heading="Основные качественные результаты реализации проекта *"
        placeholder="Основные качественные результаты реализации проекта"
      />
      <TextArea
        className={styles.half}
        name="basicAmountResults"
        value={mainPartition.basicAmountResults.value}
        onChange={onChange}
        error={mainPartition.basicAmountResults.error}
        heading="Основные количественные результаты *"
        placeholder="Основные количественные результаты"
      />
      <TextArea
        className={styles.half}
        name="diagnosticInstruments"
        value={mainPartition.diagnosticInstruments.value}
        onChange={onChange}
        error={mainPartition.diagnosticInstruments.error}
        heading="Диагностический инструментарий оценки результатов *"
        placeholder="Диагностический инструментарий оценки результатов"
      />
      <TextArea
        className={styles.half}
        name="briefResourcesDescription"
        value={mainPartition.briefResourcesDescription.value}
        onChange={onChange}
        error={mainPartition.briefResourcesDescription.error}
        heading="Краткое описание необходимого ресурсного обеспечения *"
        placeholder="Краткое описание необходимого ресурсного обеспечения"
      />
      <TextArea
        className={styles.half}
        name="bestPractiseForLeadership"
        value={mainPartition.bestPractiseForLeadership.value}
        onChange={onChange}
        error={mainPartition.bestPractiseForLeadership.error}
        heading="Лучшая практика по мнению руководства организации *"
        placeholder="Лучшая практика по мнению руководства организации"
      />
      <TextArea
        className={styles.half}
        name="socialResult"
        value={mainPartition.socialResult.value}
        onChange={onChange}
        error={mainPartition.socialResult.error}
        heading="Социальный результат *"
        placeholder="Социальный результат"
      />
      <TextArea
        className={styles.half}
        name="video"
        value={mainPartition.video.value}
        onChange={onChange}
        error={mainPartition.video.error}
        heading="Видео ролик *"
        placeholder="Видео ролик"
      />
      <TextArea
        className={styles.half}
        name="prevalence"
        value={mainPartition.prevalence.value}
        onChange={onChange}
        error={mainPartition.prevalence.error}
        heading="Распространенность *"
        placeholder="Распространенность"
      />

      <Checkbox
        checked={mainPartition.canBeDistant}
        onToggle={bindCheckToggle('canBeDistant')}
        label={<Text>Возможность реализации в дистанционном формате</Text>}
      />
      <Checkbox
        checked={mainPartition.innovationGround}
        onToggle={bindCheckToggle('innovationGround')}
        label={<Text>Апробация на инновационной площадке</Text>}
      />
      <Checkbox
        checked={mainPartition.hasExpertOpinion}
        onToggle={bindCheckToggle('hasExpertOpinion')}
        label={<Text>Наличие экспертного заключения</Text>}
      />
      <Checkbox
        checked={mainPartition.hasExpertReview}
        onToggle={bindCheckToggle('hasExpertReview')}
        label={<Text>Наличие экспертной рецензии</Text>}
      />
      <Checkbox
        checked={mainPartition.hasExpertMention}
        onToggle={bindCheckToggle('hasExpertMention')}
        label={<Text>Наличие экспертного отзыва</Text>}
      />
    </div>
  );
};
