import { HelperEnableSelect, Input, TextArea } from 'components/kit';
import { IContactsPartition } from 'types/entities/entities';
import styles from './common.module.scss';

type Props = {
  data: IContactsPartition;
};

export const ContactsView = ({ data }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Input
        readOnly
        className={styles.half}
        value={data.responsible}
        heading="ФИО ответственного лица"
        placeholder="ФИО ответственного лица"
      />
      <Input
        readOnly
        className={styles.half}
        value={data.contactNumber}
        heading="Контактный телефон"
        placeholder="Контактный телефон"
      />

      <Input
        readOnly
        className={styles.half}
        value={data.email}
        heading="Электронная почта"
        placeholder="Электронная почта"
      />
    </div>
  );
};
