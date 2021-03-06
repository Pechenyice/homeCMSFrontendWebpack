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
import { ChangeEvent } from 'react';
import { IMainHelpers } from 'types/entities/entities';
import { IProjectState } from 'types/entities/states';
import styles from './PartitionStep.module.scss';

type Props = {
  contactsPartition: IProjectState['contactsPartition'];
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onHelperChange: (helperName: string, value: boolean) => void;
  onSelect: (name: string, option: number) => void;
  onMultipleSelect: (name: string, option: number) => void;
  onCheckToggle: (name: string) => void;
};

export const ContactsPartitionStep = ({
  contactsPartition,
  onChange,
  onHelperChange,
  onSelect,
  onMultipleSelect,
  onCheckToggle,
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

  return (
    <div className={styles.wrapper}>
      <Input
        className={styles.half}
        name="responsible"
        value={contactsPartition.responsible.value}
        onChange={onChange}
        error={contactsPartition.responsible.error}
        heading="ФИО ответственного лица"
        placeholder="ФИО ответственного лица"
      />
      <Input
        className={styles.half}
        name="contactNumber"
        value={contactsPartition.contactNumber.value}
        onChange={onChange}
        error={contactsPartition.contactNumber.error}
        heading="Контактный телефон"
        placeholder="Контактный телефон"
      />
      <Input
        className={styles.half}
        name="email"
        value={contactsPartition.email.value}
        onChange={onChange}
        error={contactsPartition.email.error}
        heading="Электронная почта"
        placeholder="Электронная почта"
      />
    </div>
  );
};
