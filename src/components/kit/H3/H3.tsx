import { FC, HTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import styles from './H3.module.scss';

interface Props {
  isMedium?: boolean;
}

export const H3: FC<HTMLAttributes<HTMLHeadingElement> & Props> = (props) => {
  const { children, className, isMedium } = props;

  return (
    <h3
      className={combineClasses(
        styles.styled,
        isMedium ? styles.styled_medium : styles.styled_regular,
        className ?? ''
      )}
    >
      {children}
    </h3>
  );
};
