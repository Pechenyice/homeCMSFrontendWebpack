import { CloseIcon } from 'assets/icons';
import { HTMLAttributes, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { combineClasses } from 'utils';
import styles from './Event.module.scss';

interface Props {
  isError?: boolean;
}

export const Event = (props: HTMLAttributes<HTMLDivElement> & Props) => {
  const { className, children, onClick, isError, ...rest } = props;

  const [showCloser, setShowCloser] = useState(false);

  const nodeRef = useRef(null);

  return (
    <div
      className={combineClasses(
        styles.styled,
        isError ? styles.styled_error : styles.styled_info,
        className ?? ''
      )}
      onClick={onClick}
      onMouseEnter={() => setShowCloser(true)}
      onMouseLeave={() => setShowCloser(false)}
      {...rest}
    >
      <CSSTransition
        in={showCloser}
        nodeRef={nodeRef}
        timeout={200}
        classNames="closer"
        unmountOnExit
      >
        <div ref={nodeRef} className={styles.closer}>
          <CloseIcon width={12} height={12} />
        </div>
      </CSSTransition>
      {children}
    </div>
  );
};
