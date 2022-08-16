import { H1, Status, Label, H3 } from 'components/kit';
import styles from './PageHeading.module.scss';
import { ReactNode } from 'react';
import { EProposalStatus } from 'types/enums';

interface Props {
  heading: string;
  status?: EProposalStatus | number;
  cause?: ReactNode | string;
  action?: ReactNode;
  menu?: ReactNode;
  isDeleted?: boolean;
  isBest?: boolean;
}

export const PageHeading = (props: Props) => {
  const { heading, status, cause, action, menu, isDeleted, isBest } = props;

  return (
    <div className={styles.styled}>
      <div className={styles.line}>
        <div className={styles.lineMain}>
          <H1>{heading}</H1>
          {status !== undefined && <Status status={status} />}
        </div>
        <div className={styles.metaWrapper}>
          {action}
          {menu}
        </div>
      </div>
      {status === EProposalStatus.REJECTED && (
        <div className={styles.errorText}>{cause}</div>
      )}
      <div className={styles.metadata}>
        {isDeleted && (
          <Label palette="red">
            <H3 isMedium>Удален</H3>
          </Label>
        )}
        {isBest && (
          <Label palette="green">
            <H3 isMedium>Один из лучших</H3>
          </Label>
        )}
      </div>
    </div>
  );
};
