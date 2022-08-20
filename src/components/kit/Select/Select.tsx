import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { ISelectValue } from 'types/interfaces';
import { combineClasses } from 'utils';
import { Text, TextArea } from 'components/kit';
import styles from './Select.module.scss';
import { ChevronVerticalIcon } from 'assets/icons';
import { CSSTransition } from 'react-transition-group';
import { H3 } from '../H3/H3';

type Props = {
  viewMode?: boolean;
  withUnselect?: boolean;
  unselectedText?: string;
  emptyText?: string;
  heading?: string;
  value?: ISelectValue['id'] | null;
  options: ISelectValue[];
  onChangeOption: (option: ISelectValue['id']) => void;
};

export const Select = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const {
    viewMode,
    heading,
    value,
    options,
    onChangeOption,
    withUnselect,
    unselectedText,
    emptyText,
    ...rest
  } = props;

  const [opened, setOpened] = useState(false);

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

  const nodeRef = useRef(null);

  const toggle = () => setOpened(!opened);

  const valueIsSelected = value !== null && value !== undefined;

  if (viewMode) {
    const selectedValue: any = options
      .filter((option) => option.id === value)
      .map((option) => option.label);

    return (
      <TextArea
        readOnly
        heading={heading}
        value={selectedValue.length ? selectedValue.join(', ') : '-'}
      />
    );
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef} {...rest}>
      {heading && <H3 className={styles.heading}>{heading}</H3>}
      <div
        className={combineClasses(
          styles.inner,
          opened ? styles.inner_active : '',
          valueIsSelected && value !== -1 ? '' : styles.inner_empty
        )}
        onClick={toggle}
      >
        <Text>
          {valueIsSelected && value !== -1
            ? options.find((option) => option.id === value)?.label
            : emptyText || 'Выберите категорию'}
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
            {[
              withUnselect
                ? { id: -1, label: unselectedText || 'Не выбрано' }
                : null,
              ...options,
            ]
              .filter((option) => option)
              .map((option) => (
                <div
                  key={option!.id}
                  onClick={(e) => onChangeOption(option!.id)}
                  className={styles.option}
                >
                  <Text>{option!.label}</Text>
                </div>
              ))}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};
