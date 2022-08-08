import { CloseIcon } from 'assets/icons';
import { HTMLAttributes, ReactNode } from 'react';
import { combineClasses } from 'utils';
import { Action } from '../Action/Action';
import { Button } from '../Button/Button';
import { H2 } from '../H2/H2';
import { Text } from '../Text/Text';
import styles from './Modal.module.scss';

type Props = {
  text: string;
  cancelText: string;
  submitText: string;
  onSubmit: () => void;
  onCancel: () => void;
  isOpen: boolean;
  isNegative?: boolean;
  isPositive?: boolean;
  content?: ReactNode;
};

export const Modal = (props: HTMLAttributes<HTMLDivElement> & Props) => {
  const {
    text,
    cancelText,
    submitText,
    onCancel,
    onSubmit,
    isOpen,
    isNegative,
    isPositive,
    content,
    className,
    ...rest
  } = props;

  if (!isOpen) return null;

  return (
    <div className={combineClasses(styles.wrapper, className ?? '')} {...rest}>
      <div className={styles.styled}>
        <div className={styles.closer} onClick={onCancel}>
          <CloseIcon />
        </div>
        <div className={styles.content}>
          <H2>{text}</H2>
        </div>
        {content}
        <div className={styles.actions}>
          <Action text={cancelText} onClick={onCancel} />
          <Button
            className={combineClasses(
              styles.actions__button,
              isNegative ? styles.actions__button_negative : '',
              isPositive ? styles.actions__button_positive : ''
            )}
            onClick={onSubmit}
          >
            <Text>{submitText}</Text>
          </Button>
        </div>
      </div>
    </div>
  );
};
