import { FC, HTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import styles from './H2.module.scss';

export const H2: FC<HTMLAttributes<HTMLHeadingElement>> = (props) => {
  const { children, className } = props;

  return <h2 className={combineClasses(styles.styled, className ?? '')}>{children}</h2>;
};
