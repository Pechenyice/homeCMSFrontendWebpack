import { H1, Status } from 'components/kit';
import styles from './PageHeading.module.scss';
import { ReactNode } from 'react';
import { EProposalStatus } from 'types/enums';

interface Props {
  heading: string;
  status?: EProposalStatus | number;
  cause?: ReactNode | string;
  action?: ReactNode;
}

export const PageHeading = (props: Props) => {
  const { heading, status, cause, action } = props;

  return (
    <div className={styles.styled}>
      <div className={styles.line}>
        <div className={styles.lineMain}>
          <H1>{heading}</H1>
          {status !== undefined && <Status status={status} />}
        </div>
        {action && action}
      </div>
      {status === EProposalStatus.REJECTED && <div className={styles.errorText}>{cause}</div>}
    </div>
  );
};
