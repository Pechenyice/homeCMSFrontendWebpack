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
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onHelperChange: (helperName: string, value: boolean) => void;
  onSelect: (name: string, option: number) => void;
  onMultipleSelect: (name: string, option: number) => void;
  onCheckToggle: (name: string) => void;
  onMembersEntryChange: (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onAddMembersEntry: () => void;
  onRemoveMembersEntry: (index: number) => void;
};

export const MembersPartitionStep = ({
  membersPartition,
  onChange,
  onHelperChange,
  onSelect,
  onMultipleSelect,
  onCheckToggle,
  onMembersEntryChange,
  onAddMembersEntry,
  onRemoveMembersEntry,
}: Props) => {
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

  const bindRemoveMembersEntry = (index: number) => () => {
    onRemoveMembersEntry(index);
  };

  const bindChangeMembersEntry = (index: number) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onMembersEntryChange(index, e);
  };

  return (
    <div className={styles.wrapper}>
      {membersPartition.membersInfo.map((entry, index) => (
        <div className={styles.membersEntry}>
          {!!index && (
            <div className={styles.membersDeleteAction__wrapper}>
              <Action
                className={styles.membersDeleteAction}
                text="Удалить отчётный период"
                icon={<MinusIcon />}
                onClick={bindRemoveMembersEntry(index)}
              />
            </div>
          )}
          <Input
            className={styles.half}
            name="commonMembersCount"
            value={String(entry.commonMembersCount.value ?? '')}
            onChange={bindChangeMembersEntry(index)}
            error={entry.commonMembersCount.error}
            heading="Общее количество участников за отчетный период *"
            placeholder="Количество участников за отчетный период"
          />
          <Input
            className={styles.half}
            name="year"
            value={String(entry.year.value ?? '')}
            onChange={bindChangeMembersEntry(index)}
            error={entry.year.error}
            heading="Отчётный период *"
            placeholder="Отчётный период"
          />

          <Input
            className={styles.half}
            name="familiesCount"
            value={String(entry.familiesCount.value ?? '')}
            onChange={bindChangeMembersEntry(index)}
            error={entry.familiesCount.error}
            heading="Количество семей *"
            placeholder="Количество семей"
          />
          <Input
            className={styles.half}
            name="childrenCount"
            value={String(entry.childrenCount.value ?? '')}
            onChange={bindChangeMembersEntry(index)}
            error={entry.childrenCount.error}
            heading="Количество детей *"
            placeholder="Количество детей"
          />

          <Input
            className={styles.half}
            name="menCount"
            value={String(entry.menCount.value ?? '')}
            onChange={bindChangeMembersEntry(index)}
            error={entry.menCount.error}
            heading="Количество мужчин *"
            placeholder="Количество мужчин"
          />
          <Input
            className={styles.half}
            name="womenCount"
            value={String(entry.womenCount.value ?? '')}
            onChange={bindChangeMembersEntry(index)}
            error={entry.womenCount.error}
            heading="Количество женщин *"
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
