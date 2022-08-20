import { H1, Status, Label, H3 } from 'components/kit';
import styles from './PageHeading.module.scss';
import { ReactNode } from 'react';
import { EProposalStatus } from 'types/enums';
import { BestIcon, TrashIcon } from 'assets/icons';

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
          <H1 className={styles.heading}>{heading}</H1>
          <div className={styles.metadata__wrapper}>
            {status !== undefined && (
              <Status className={styles.lifted} status={status} />
            )}
            {isDeleted && (
              <Label className={styles.lifted} palette="red">
                <div className={styles.metadata}>
                  <H3 isMedium>Удален</H3>
                  <TrashIcon />
                </div>
              </Label>
            )}
            {isBest && (
              <Label className={styles.lifted} palette="yellow">
                <div className={styles.metadata}>
                  <H3 isMedium>Один из лучших</H3>
                  <BestIcon />
                </div>
              </Label>
            )}
          </div>
        </div>
        <div className={styles.metaWrapper}>
          {action}
          {menu}
        </div>
      </div>
      {status === EProposalStatus.REJECTED && (
        <div className={styles.errorText}>{cause}</div>
      )}
    </div>
  );
};
