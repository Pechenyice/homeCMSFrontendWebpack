import { FC, HTMLAttributes, useRef, useState } from 'react';
import { combineClasses } from 'utils';
import { Hint, Text } from 'components/kit';
import styles from './HelperEnableSelect.module.scss';
import { ChevronVerticalIcon } from 'assets/icons';
import { CSSTransition } from 'react-transition-group';
import { H3 } from '../H3/H3';

type Props = {
  heading?: string;
  value: boolean;
  onChangeOption: (option: boolean) => void;
  hint?: string;
};

export const HelperEnableSelect: FC<Props & HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const { heading, value, hint, onChangeOption, children, ...rest } = props;

  const [opened, setOpened] = useState(false);

  const nodeRef = useRef(null);

  const toggle = () => setOpened(!opened);

  return (
    <div className={styles.wrapper} {...rest}>
      {heading && (
        <H3 className={styles.heading}>
          {heading} {hint && <Hint text={hint} />}
        </H3>
      )}
      <div
        className={combineClasses(
          styles.inner,
          opened ? styles.inner_active : ''
        )}
        onClick={toggle}
      >
        <Text>{value ? 'Да' : 'Нет'}</Text>
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
            <div
              onClick={() => onChangeOption(false)}
              className={styles.option}
            >
              <Text>Нет</Text>
            </div>
            <div onClick={() => onChangeOption(true)} className={styles.option}>
              <Text>Да</Text>
            </div>
          </div>
        </CSSTransition>
      </div>
      {value && children}
    </div>
  );
};
