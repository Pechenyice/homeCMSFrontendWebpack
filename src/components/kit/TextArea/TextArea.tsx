import { LockHiddenIcon } from 'assets/icons';
import { ReactNode, TextareaHTMLAttributes } from 'react';
import { IInputError } from 'types/interfaces';
import { combineClasses } from 'utils';
import { Hint } from '../Hint/Hint';
import { H3 } from '../H3/H3';
import { H5 } from '../H5/H5';
import styles from './TextArea.module.scss';

interface Props {
  heading?: string | ReactNode;
  error?: IInputError;
  hint?: string;
}

export const TextArea = (
  props: Props & TextareaHTMLAttributes<HTMLTextAreaElement>
) => {
  const {
    heading,
    error,
    hint,
    name,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    className,
    readOnly,
    value,
    ...rest
  } = props;

  return (
    <div className={combineClasses(styles.wrapper, className ?? '')}>
      {heading && (
        <div className={styles.heading}>
          <H3 className={styles.heading__content}>{heading}</H3>{' '}
          {hint && <Hint text={hint} />}
        </div>
      )}
      <div className={styles.inner}>
        <textarea
          readOnly={readOnly}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={combineClasses(
            styles.textarea,
            error?.exist ? styles.textarea_error : '',
            readOnly ? styles.textarea_readonly : ''
          )}
          {...rest}
        />
        {error?.exist && <H5 className={styles.error}>{error.text}</H5>}
        {readOnly && (
          <div className={styles.icon}>
            <LockHiddenIcon />
          </div>
        )}
      </div>
    </div>
  );
};
