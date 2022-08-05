import { FC, HTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import styles from './Text.module.scss';

interface Props {
  isMedium?: boolean;
}

export const Text: FC<HTMLAttributes<HTMLHeadingElement> & Props> = (props) => {
  const { children, className, isMedium, ...rest } = props;

  return (
    <p
      className={combineClasses(
        styles.styled,
        isMedium ? styles.styled_medium : styles.styled_regular,
        className ?? ''
      )}
      {...rest}
    >
      {children}
    </p>
  );
};
