import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
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
  readOnly?: boolean;
};

export const HelperEnableSelect: FC<Props & HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const {
    heading,
    value,
    hint,
    onChangeOption,
    readOnly,
    children,
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

  return (
    <div className={styles.wrapper} ref={wrapperRef} {...rest}>
      {heading && (
        <div className={styles.heading}>
          <H3 className={styles.heading__content}>{heading}</H3>
          {hint && <Hint text={hint} />}
        </div>
      )}
      <div
        className={combineClasses(
          styles.inner,
          opened ? styles.inner_active : ''
        )}
        onClick={readOnly ? undefined : toggle}
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
