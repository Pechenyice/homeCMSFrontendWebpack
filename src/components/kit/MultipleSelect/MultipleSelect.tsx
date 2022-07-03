import { HTMLAttributes, useRef, useState } from 'react';
import { ISelectValue } from 'types/interfaces';
import { combineClasses } from 'utils';
import { Checkbox, Text } from 'components/kit';
import styles from './MultipleSelect.module.scss';
import { ChevronVerticalIcon } from 'assets/icons';
import { CSSTransition } from 'react-transition-group';
import { H3 } from '../H3/H3';

type Props = {
  emptyText?: string;
  heading?: string;
  values?: ISelectValue['id'][] | null;
  options: ISelectValue[];
  onChangeOption: (option: ISelectValue['id']) => void;
};

export const MultipleSelect = (
  props: Props & HTMLAttributes<HTMLDivElement>
) => {
  const {
    heading,
    values,
    options,
    onChangeOption,
    emptyText,
    ...rest
  } = props;

  const [opened, setOpened] = useState(false);

  const nodeRef = useRef(null);

  const toggle = () => setOpened(!opened);

  return (
    <div className={styles.wrapper} {...rest}>
      {heading && <H3 className={styles.heading}>{heading}</H3>}
      <div
        className={combineClasses(
          styles.inner,
          opened ? styles.inner_active : '',
          values?.length ? '' : styles.inner_empty
        )}
        onClick={toggle}
      >
        <Text>
          {values?.length ? `Выбрано (${values.length})` : 'Выберите категории'}
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
