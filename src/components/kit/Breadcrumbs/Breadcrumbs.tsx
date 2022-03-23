import { ChevronRightIcon } from 'assets/icons';
import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { IBreadcrumbsPath } from 'types/interfaces';
import { combineClasses } from 'utils';
import { H4 } from '../H4/H4';
import styles from './Breadcrumbs.module.scss';

interface Props {
  paths: IBreadcrumbsPath[];
}

export const Breadcrumbs = (props: HTMLAttributes<HTMLDivElement> & Props) => {
  const { paths, className, children, onClick, ...rest } = props;

  return (
    <div className={combineClasses(styles.styled, className ?? '')} {...rest}>
      <H4>Главная</H4>
      {paths.map((path) => (
        <div className={styles.linkWrapper} key={path.link}>
          <ChevronRightIcon />
          {path.link ? (
            <Link to={path.link}>
              <H4 className={styles.path}>{path.alias}</H4>
            </Link>
          ) : (
            <H4 className={styles.path}>{path.alias}</H4>
          )}
        </div>
      ))}
    </div>
  );
};
