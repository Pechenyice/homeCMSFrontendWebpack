import { FC, HTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import styles from './H4.module.scss';

export const H4: FC<HTMLAttributes<HTMLHeadingElement>> = (props) => {
  const { children, className } = props;

  return <h4 className={combineClasses(styles.styled, className ?? '')}>{children}</h4>;
};
