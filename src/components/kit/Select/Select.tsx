import { HTMLAttributes, useRef, useState } from 'react';
import { ISelectValue } from 'types/interfaces';
import { combineClasses } from 'utils';
import { Text } from 'components/kit';
import styles from './Select.module.scss';
import { ChevronVerticalIcon } from 'assets/icons';
import { CSSTransition } from 'react-transition-group';
import { H3 } from '../H3/H3';

type Props = {
  heading?: string;
  value?: ISelectValue['id'] | null;
  options: ISelectValue[];
  onChangeOption: (option: ISelectValue['id']) => void;
};

export const Select = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const { heading, value, options, onChangeOption, ...rest } = props;

  const [opened, setOpened] = useState(false);

  const nodeRef = useRef(null);

  const toggle = () => setOpened(!opened);

  const valueIsSelected = value !== null && value !== undefined;

  return (
    <div className={styles.wrapper} {...rest}>
      {heading && <H3 className={styles.heading}>{heading}</H3>}
      <div
        className={combineClasses(
          styles.inner,
          opened ? styles.inner_active : '',
          valueIsSelected ? '' : styles.inner_empty
        )}
        onClick={toggle}
      >
        <Text>
          {valueIsSelected
            ? options.find((option) => option.id === value)?.value
            : 'Выберите категорию'}
        </Text>
        <ChevronVerticalIcon
          className={combineClasses(styles.chevron, opened ? styles.chevron_inverted : '')}
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
                onClick={(e) => onChangeOption(option.id)}
                className={styles.option}
              >
                <Text>{option.value}</Text>
              </div>
            ))}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};
