import { FC, HTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import styles from './H1.module.scss';

export const H1: FC<HTMLAttributes<HTMLHeadingElement>> = (props) => {
  const { children, className } = props;

  return <h1 className={combineClasses(styles.styled, className ?? '')}>{children}</h1>;
};
