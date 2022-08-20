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
import { ICommonContactsPartitionState } from 'types/entities/states';
import styles from './PartitionStep.module.scss';

type Props = {
  contactsPartition: ICommonContactsPartitionState;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const ContactsPartitionStep = ({
  contactsPartition,
  onChange,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <Input
        className={styles.half}
        name="responsible"
        value={contactsPartition.responsible.value}
        onChange={onChange}
        error={contactsPartition.responsible.error}
        heading="ФИО ответственного лица *"
        placeholder="ФИО ответственного лица"
      />
      <Input
        className={styles.half}
        name="contactNumber"
        value={contactsPartition.contactNumber.value}
        onChange={onChange}
        error={contactsPartition.contactNumber.error}
        heading="Контактный телефон *"
        placeholder="Контактный телефон"
      />
      <Input
        className={styles.half}
        name="email"
        value={contactsPartition.email.value}
        onChange={onChange}
        error={contactsPartition.email.error}
        heading="Электронная почта *"
        placeholder="Электронная почта"
      />
    </div>
  );
};
