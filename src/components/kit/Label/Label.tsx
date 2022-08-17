import { HTMLAttributes } from 'react';
import { EProposalStatus } from 'types/enums';
import { combineClasses } from 'utils';
import { H3 } from '../H3/H3';
import styles from './Label.module.scss';

interface Props {
  palette: 'yellow' | 'red';
}

export const Label = (props: HTMLAttributes<HTMLDivElement> & Props) => {
  const { palette, className, children, ...rest } = props;

  return (
    <div
      className={combineClasses(
        styles.styled,
        styles[palette],
        className ?? ''
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
