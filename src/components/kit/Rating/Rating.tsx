import { FilledStarIcon, EmptyStarIcon } from 'assets/icons';
import { HTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import styles from './Rating.module.scss';

interface Props {
  stars: number;
}

export const Rating = (props: HTMLAttributes<HTMLDivElement> & Props) => {
  const { stars, className, children, ...rest } = props;

  return (
    <div className={combineClasses(styles.styled, className ?? '')} {...rest}>
      {[...Array(stars)].map((star) => (
        <FilledStarIcon />
      ))}
      {[...Array(5 - stars)].map((star) => (
        <EmptyStarIcon />
      ))}
    </div>
  );
};
