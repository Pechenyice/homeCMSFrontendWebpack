import { HTMLAttributes } from 'react';
import { EProposalStatus } from 'types/enums';
import { combineClasses } from 'utils';
import { H3 } from '../H3/H3';
import styles from './Status.module.scss';

interface Props {
  status: number;
}

export const Status = (props: HTMLAttributes<HTMLDivElement> & Props) => {
  const { status, className, children, ...rest } = props;

  const prefabs: { [key: number]: any } = {
    [EProposalStatus.ACCEPTED]: {
      class: styles.styled_accepted,
      content: 'Подтверждено',
    },
    [EProposalStatus.PENDING]: {
      class: styles.styled_confirmation,
      content: 'На рассмотрении',
    },
    [EProposalStatus.REJECTED]: {
      class: styles.styled_rejected,
      content: 'Отклонено',
    },
  };

  return (
    <div
      className={combineClasses(
        styles.styled,
        prefabs[status].class,
        className ?? ''
      )}
      {...rest}
    >
      <H3 isMedium>{prefabs[status].content}</H3>
    </div>
  );
};
