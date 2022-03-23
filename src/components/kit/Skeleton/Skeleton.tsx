import { HTMLAttributes, ReactNode } from 'react';
import { combineClasses } from 'utils';
import { H3 } from '../H3/H3';
import { Loader, ELoaderPalette } from '../Loader/Loader';
import styles from './Skeleton.module.scss';

export enum ESkeletonMode {
  INPUT = 'INPUT',
}

interface Props {
  mode: ESkeletonMode;
  withLoader?: boolean;
  heading?: string | ReactNode;
}

export const Skeleton = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const { mode, withLoader, heading, className, ...rest } = props;

  return (
    <div className={styles.wrapper} {...rest}>
      {heading && <H3 className={styles.heading}>{heading}</H3>}
      <div
        className={combineClasses(
          styles.styled,
          mode === ESkeletonMode.INPUT ? styles.styled_input : '',
          className ?? ''
        )}
      >
        {withLoader && <Loader palette={ELoaderPalette.LIGHT} />}
      </div>
    </div>
  );
};
