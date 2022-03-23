import { FC, HTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import styles from './H5.module.scss';

export const H5: FC<HTMLAttributes<HTMLHeadingElement>> = (props) => {
  const { children, className } = props;

  return <h5 className={combineClasses(styles.styled, className ?? '')}>{children}</h5>;
};
