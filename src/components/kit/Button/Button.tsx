import { ButtonHTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import { ELoaderPalette, Loader } from '../Loader/Loader';
import styles from './Button.module.scss';

type Props = {
  isLoading?: boolean;
};

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement> & Props) => {
  const { isLoading, disabled, className, children, onClick, ...rest } = props;

  return (
    <button
      className={combineClasses(
        styles.styled,
        disabled ? styles.styled_disabled : '',
        className ?? ''
      )}
      onClick={!disabled && !isLoading ? onClick : undefined}
      {...rest}
    >
      {isLoading ? <Loader palette={ELoaderPalette.LIGHT} /> : children}
    </button>
  );
};
