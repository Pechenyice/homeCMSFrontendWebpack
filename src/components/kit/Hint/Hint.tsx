import { LockHiddenIcon, QuestionIcon } from 'assets/icons';
import { HTMLAttributes, useState } from 'react';
import { combineClasses } from 'utils';
import { H3 } from '../H3/H3';
import { H5 } from '../H5/H5';
import styles from './Hint.module.scss';

interface Props {
  text: string;
}

export const Hint = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const { text, className, ...rest } = props;

  const [isHintVisible, setIsHintVisible] = useState(false);

  const bindHintVisibility = (state: boolean) => () => setIsHintVisible(state);

  return (
    <div className={combineClasses(styles.wrapper, className ?? '')}>
      <QuestionIcon
        className={styles.cursor}
        onMouseEnter={bindHintVisibility(true)}
        onMouseLeave={bindHintVisibility(false)}
      />
      {isHintVisible && <div className={styles.hint}>{text}</div>}
    </div>
  );
};
