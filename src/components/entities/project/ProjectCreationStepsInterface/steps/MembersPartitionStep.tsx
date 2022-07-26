import { MinusIcon, PlusIcon } from 'assets/icons';
import {
  Action,
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
import { ChangeEvent } from 'react';
import { IMainHelpers } from 'types/entities/entities';
import { IProjectState } from 'types/entities/states';
import styles from './PartitionStep.module.scss';

type Props = {
  membersPartition: IProjectState['membersPartition'];
  onMembersEntryChange: (
    id: any,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onAddMembersEntry: () => void;
  onRemoveMembersEntry: (id: any) => void;
};

export const MembersPartitionStep = ({
  membersPartition,
  onMembersEntryChange,
  onAddMembersEntry,
  onRemoveMembersEntry,
}: Props) => {
  /**
   * binders
   */
  const bindRemoveMembersEntry = (id: any) => () => {
    onRemoveMembersEntry(id);
  };

  const bindChangeMembersEntry = (id: any) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onMembersEntryChange(id, e);
  };

  return (
    <div className={styles.wrapper}>
      {membersPartition.membersInfo.map((entry, index) => (
        <div className={styles.membersEntry} key={entry.id}>
          {!!index && (
            <div className={styles.membersDeleteAction__wrapper}>
              <Action
                className={styles.membersDeleteAction}
                text="Удалить отчётный период"
                icon={<MinusIcon />}
                onClick={bindRemoveMembersEntry(entry.id)}
              />
            </div>
          )}
          <Input
            className={styles.half}
            name="commonMembersCount"
            value={String(entry.commonMembersCount.value ?? '')}
            onChange={bindChangeMembersEntry(entry.id)}
            error={entry.commonMembersCount.error}
            heading="Общее количество участников за отчетный период *"
            placeholder="Количество участников за отчетный период"
          />
          <Input
            className={styles.half}
            name="year"
            value={String(entry.year.value ?? '')}
            onChange={bindChangeMembersEntry(entry.id)}
            error={entry.year.error}
            heading="Отчётный период *"
            placeholder="Отчётный период"
          />

          <Input
            className={styles.half}
            name="familiesCount"
            value={String(entry.familiesCount.value ?? '')}
            onChange={bindChangeMembersEntry(entry.id)}
            error={entry.familiesCount.error}
            heading="Количество семей"
            placeholder="Количество семей"
          />
          <Input
            className={styles.half}
            name="childrenCount"
            value={String(entry.childrenCount.value ?? '')}
            onChange={bindChangeMembersEntry(entry.id)}
            error={entry.childrenCount.error}
            heading="Количество детей"
            placeholder="Количество детей"
          />

          <Input
            className={styles.half}
            name="menCount"
            value={String(entry.menCount.value ?? '')}
            onChange={bindChangeMembersEntry(entry.id)}
            error={entry.menCount.error}
            heading="Количество мужчин"
            placeholder="Количество мужчин"
          />
          <Input
            className={styles.half}
            name="womenCount"
            value={String(entry.womenCount.value ?? '')}
            onChange={bindChangeMembersEntry(entry.id)}
            error={entry.womenCount.error}
            heading="Количество женщин"
            placeholder="Количество женщин"
          />
        </div>
      ))}

      <div className={styles.actionWrapper}>
        <Action
          text="Добавить отчётный период"
          icon={<PlusIcon />}
          onClick={onAddMembersEntry}
        />
      </div>
    </div>
  );
};
