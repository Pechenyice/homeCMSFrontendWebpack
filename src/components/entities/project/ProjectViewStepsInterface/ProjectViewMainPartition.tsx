import {
  Checkbox,
  ESkeletonMode,
  Input,
  Select,
  Skeleton,
  Text,
  TextArea,
} from 'components/kit';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { IProjectData } from 'types/entities/entities';
import { combineClasses } from 'utils/common';
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
        {project.organisator && (
          <TextArea
            readOnly
            className={styles.half}
            heading="Организатор"
            placeholder="Организатор"
            value={project.organisator}
          />
        )}
      </div>

      <TextArea
        readOnly
        className={styles.half}
        heading="Период реализации проекта"
        placeholder="Период реализации проекта"
        value={project.period}
      />
      <div className={styles.half}>
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
    </div>
  );
};
