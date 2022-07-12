import { LoaderDarkIcon, LoaderLightIcon } from 'assets/icons';
import { HTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import styles from './Loader.module.scss';

export enum ELoaderPalette {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

interface Props {
  palette: ELoaderPalette;
}

export const Loader = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const { palette, className, ...rest } = props;

  return (
    <div className={combineClasses(styles.styled, className ?? '')} {...rest}>
      {palette === ELoaderPalette.LIGHT ? (
        <LoaderLightIcon />
      ) : (
        <LoaderDarkIcon />
      )}
    </div>
  );
};
