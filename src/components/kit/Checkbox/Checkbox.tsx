import { InputHTMLAttributes, ReactNode } from 'react';
import { combineClasses, simpleUuid } from 'utils';
import { H3 } from '../H3/H3';
import styles from './Checkbox.module.scss';

interface Props {
  heading?: string | ReactNode;
  label?: string | ReactNode;
  onToggle?: () => void;
}

export const Checkbox = (props: Props & InputHTMLAttributes<HTMLInputElement>) => {
  const {
    heading,
    label,
    name = simpleUuid(),
    placeholder,
    onChange,
    onBlur,
    onFocus,
    onToggle,
    className,
    readOnly,
    value,
    checked,
    ...rest
  } = props;

  return (
    <div
      className={combineClasses(styles.wrapper, readOnly ? styles.readonly : '', className ?? '')}
      {...rest}
    >
      {heading && <H3 className={styles.heading}>{heading}</H3>}
      <div className={styles.inner}>
        <input
          readOnly={readOnly}
          type={'checkbox'}
          value={value}
          checked={checked}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={styles.input}
        />
        <label onClick={onToggle} htmlFor={name}>
          {label}
        </label>
      </div>
    </div>
  );
};
