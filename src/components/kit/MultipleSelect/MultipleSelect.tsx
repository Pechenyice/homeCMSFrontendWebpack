import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { ISelectValue } from 'types/interfaces';
import { combineClasses } from 'utils';
import { Checkbox, Hint, Text, TextArea } from 'components/kit';
import styles from './MultipleSelect.module.scss';
import { ChevronVerticalIcon } from 'assets/icons';
import { CSSTransition } from 'react-transition-group';
import { H3 } from '../H3/H3';

type Props = {
  emptyText?: string;
  unselectedText?: string;
  heading?: string;
  hint?: string;
  values?: ISelectValue['id'][] | null;
  options: ISelectValue[];
  onChangeOption: (option: ISelectValue['id']) => void;
  viewMode?: boolean;
};

export const MultipleSelect = (
  props: Props & HTMLAttributes<HTMLDivElement>
) => {
  const {
    heading,
    hint,
    values,
    options,
    onChangeOption,
    emptyText,
    unselectedText,
    viewMode,
    ...rest
  } = props;

  const [opened, setOpened] = useState(false);

  const nodeRef = useRef(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (opened && !wrapperRef.current?.contains(e.target)) {
        setOpened(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [opened]);

  const toggle = () => setOpened(!opened);

  if (viewMode) {
    const value = options
      .filter((option) => values?.includes(option.id))
      .map((option) => option.label);

    return (
      <TextArea
        readOnly
        heading={heading}
        value={value.length ? value.join(', ') : '-'}
      />
    );
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef} {...rest}>
      <div className={styles.heading}>
        <H3>{heading}</H3>
        {hint && <Hint text={hint} />}
      </div>
      <div
        className={combineClasses(
          styles.inner,
          opened ? styles.inner_active : '',
          values?.length ? '' : styles.inner_empty
        )}
        onClick={toggle}
      >
        <Text>
          {values?.length
            ? `Выбрано (${values.length})`
            : unselectedText || 'Выберите категории'}
        </Text>
        <ChevronVerticalIcon
          className={combineClasses(
            styles.chevron,
            opened ? styles.chevron_inverted : ''
          )}
        />
        <CSSTransition
          in={opened}
          nodeRef={nodeRef}
          timeout={200}
          classNames="dropdown"
          unmountOnExit
        >
          <div ref={nodeRef} className={styles.dropdown}>
            {options.map((option) => (
              <div
                key={option.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeOption(option.id);
                }}
                className={styles.option}
              >
                <Checkbox
                  className={styles.option__checkbox}
                  checked={values?.includes(option.id)}
                />
                <Text className={styles.option__text}>{option.label}</Text>
              </div>
            ))}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};
