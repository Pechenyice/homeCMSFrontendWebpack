import { HelperEnableSelect, Input, TextArea } from 'components/kit';
import { IMembersPartition } from 'types/entities/entities';
import { combineClasses } from 'utils/common';
import styles from './common.module.scss';

type Props = {
  data: IMembersPartition;
};

export const MembersView = ({ data }: Props) => {
  return (
    <div className={styles.wrapper}>
      {data.membersInfo.map((memberInfo, i) => (
        <div className={styles.flex} key={i}>
          <Input
            readOnly
            className={styles.half}
            value={memberInfo.year}
            heading="Отчётный период"
            placeholder="Отчётный период"
          />
          <Input
            readOnly
            className={styles.half}
            value={memberInfo.commonMembersCount}
            heading="Общее количество участников за отчетный период"
            placeholder="Общее количество участников за отчетный период"
          />

          <Input
            readOnly
            className={styles.half}
            value={memberInfo.familiesCount ?? '-'}
            heading="Количество семей"
            placeholder="Количество семей"
          />
          <Input
            readOnly
            className={styles.half}
            value={memberInfo.childrenCount ?? '-'}
            heading="Количество детей"
            placeholder="Количество детей"
          />

          <Input
            readOnly
            className={styles.half}
            value={memberInfo.menCount ?? '-'}
            heading="Количество мужчин"
            placeholder="Количество мужчин"
          />
          <Input
            readOnly
            className={styles.half}
            value={memberInfo.womenCount ?? '-'}
            heading="Количество женщин"
            placeholder="Количество женщин"
          />
        </div>
      ))}
    </div>
  );
};
