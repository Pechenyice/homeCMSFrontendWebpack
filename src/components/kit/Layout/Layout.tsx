import { HTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import styles from './Layout.module.scss';

export const Layout = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, children, onClick, ...rest } = props;

  return (
    <section className={combineClasses(styles.styled, className ?? '')} {...rest}>
      {children}
    </section>
  );
};
