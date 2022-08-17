import { FilledStarIcon, EmptyStarIcon } from 'assets/icons';
import { HTMLAttributes } from 'react';
import { IAPIRating } from 'types/entities/entities';
import { EStarsColor } from 'types/enums';
import { combineClasses } from 'utils';
import styles from './Rating.module.scss';

interface Props {
  stars: IAPIRating;
}

export const Rating = (props: HTMLAttributes<HTMLDivElement> & Props) => {
  const { stars, className, children, ...rest } = props;

  console.log(stars);

  return (
    <div className={combineClasses(styles.styled, className ?? '')} {...rest}>
      <div title="Одна из лучших практик">
        {stars.fields.is_favorite ? (
          <FilledStarIcon fill={EStarsColor['is_favorite']} />
        ) : (
          <EmptyStarIcon />
        )}
      </div>
      <div title="Имеется отзыв">
        {stars.fields.is_has_any_review ? (
          <FilledStarIcon fill={EStarsColor['is_has_any_review']} />
        ) : (
          <EmptyStarIcon />
        )}
      </div>
      <div title="Имеется апробация">
        {stars.fields.is_has_approbation ? (
          <FilledStarIcon fill={EStarsColor['is_has_approbation']} />
        ) : (
          <EmptyStarIcon />
        )}
      </div>
      <div title="Имеется публикация">
        {stars.fields.is_has_publication ? (
          <FilledStarIcon fill={EStarsColor['is_has_publication']} />
        ) : (
          <EmptyStarIcon />
        )}
      </div>
      <div title="Растиражирована">
        {stars.fields.is_has_replicability ? (
          <FilledStarIcon fill={EStarsColor['is_has_replicability']} />
        ) : (
          <EmptyStarIcon />
        )}
      </div>
    </div>
  );
};
