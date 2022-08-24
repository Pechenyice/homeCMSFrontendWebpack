import { KebabIcon, LogoIcon } from 'assets/icons';
import { Button, Text } from 'components/kit';
import { FC, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { combineClasses } from 'utils/common';
import styles from './Dropdown.module.scss';

interface Props {
  placement?: string;
  customControl?: ReactNode;
}

export const Dropdown: FC<Props> = ({
  placement = 'left',
  customControl,
  children,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleSwitchIsOpened = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className={styles.wrapper} onClick={handleSwitchIsOpened}>
      {customControl ? (
        customControl
      ) : (
        <div className={styles.button}>
          <KebabIcon />
        </div>
      )}
      {isOpened && (
        <div
          className={combineClasses(
            styles.content,
            placement === 'right' ? styles.content_right : styles.content_left
          )}
          onClick={handleSwitchIsOpened}
        >
          {children}
        </div>
      )}
    </div>
  );
};
