import { HTMLAttributes, ReactNode } from 'react';
import { combineClasses } from 'utils';
import { ELoaderPalette, Loader } from '../Loader/Loader';
import { Text } from '../Text/Text';
import styles from './Action.module.scss';

interface Props {
  text: string;
  isDeleteMode?: boolean;
  icon?: ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export const Action = (props: HTMLAttributes<HTMLDivElement> & Props) => {
  const {
    text,
    isDeleteMode,
    icon,
    isDisabled,
    isLoading,
    className,
    onClick,
    ...rest
  } = props;

  return (
    <div
      className={combineClasses(
        styles.styled,
        isDeleteMode ? styles.styled_delete : '',
        isDisabled ? styles.styled_disabled : '',
        className ?? ''
      )}
      onClick={isDisabled ? undefined : onClick}
      {...rest}
    >
      {isLoading ? (
        <Loader palette={ELoaderPalette.DARK} />
      ) : (
        <>
          <Text isMedium>{text}</Text>
          {icon && icon}
        </>
      )}
    </div>
  );
};
