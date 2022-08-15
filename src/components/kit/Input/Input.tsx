import { EyeCrossedIcon, EyeIcon, LockHiddenIcon } from 'assets/icons';
import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { IInputError } from 'types/interfaces';
import { combineClasses } from 'utils';
import { H3 } from '../H3/H3';
import { H5 } from '../H5/H5';
import { Hint } from '../Hint/Hint';
import styles from './Input.module.scss';

interface Props {
  heading?: string | ReactNode;
  error?: IInputError;
  leftIcon?: ReactNode;
  hint?: string;
}

export const Input = (props: Props & InputHTMLAttributes<HTMLInputElement>) => {
  const {
    heading,
    hint,
    error,
    leftIcon,
    type = 'text',
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

  const [isHidden, setIsHidden] = useState(true);

  const handleNewMode = () => {
    setIsHidden(!isHidden);
  };

  const isPassword = type === 'password' || !isHidden;

  return (
    <div className={combineClasses(styles.wrapper, className ?? '')} {...rest}>
      {heading && (
        <div className={styles.heading}>
          <H3 className={styles.heading__content}>{heading}</H3>{' '}
          {hint && <Hint text={hint} />}
        </div>
      )}
      <div className={styles.inner}>
        <div className={styles.asideIcon}>{leftIcon}</div>
        <input
          readOnly={readOnly}
          type={isHidden ? type : 'text'}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={combineClasses(
            styles.input,
            error?.exist ? styles.input_error : '',
            readOnly ? styles.input_readonly : '',
            isPassword ? styles.input_password : '',
            leftIcon ? styles.withLeftIcon : ''
          )}
        />
        {error?.exist && <H5 className={styles.error}>{error.text}</H5>}
        {isPassword && (
          <div className={styles.icon}>
            {isHidden ? (
              <EyeIcon onClick={() => handleNewMode()} />
            ) : (
              <EyeCrossedIcon onClick={() => handleNewMode()} />
            )}
          </div>
        )}
        {readOnly && (
          <div className={styles.icon}>
            <LockHiddenIcon />
          </div>
        )}
      </div>
    </div>
  );
};
