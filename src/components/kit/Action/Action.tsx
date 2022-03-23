import { HTMLAttributes, ReactNode } from 'react';
import { combineClasses } from 'utils';
import { Text } from '../Text/Text';
import styles from './Action.module.scss';

interface Props {
  text: string;
  isDeleteMode?: boolean;
  icon?: ReactNode;
}

export const Action = (props: HTMLAttributes<HTMLDivElement> & Props) => {
  const { text, isDeleteMode, icon, className, onClick, ...rest } = props;

  return (
    <div
      className={combineClasses(
        styles.styled,
        isDeleteMode ? styles.styled_delete : '',
        className ?? ''
      )}
      onClick={onClick}
      {...rest}
    >
      <Text isMedium>{text}</Text>
      {icon && icon}
    </div>
  );
};
