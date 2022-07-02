import { Text } from 'components/kit';
import { HTMLAttributes } from 'react';
import { combineClasses } from 'utils/common';
import styles from './EntityCreationSteps.module.scss';

type Props = {
  active: number;
};

export const EntityCreationSteps = ({
  active,
}: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={combineClasses(
          styles.step,
          active === 0 ? styles.step__active : ''
        )}
      >
        <Text isMedium>1. Основная информация</Text>
      </div>
      <div
        className={combineClasses(
          styles.step,
          active === 1 ? styles.step__active : ''
        )}
      >
        <Text isMedium>2. Опыт</Text>
      </div>
      <div
        className={combineClasses(
          styles.step,
          active === 2 ? styles.step__active : ''
        )}
      >
        <Text isMedium>3. Контакты</Text>
      </div>
      <div
        className={combineClasses(
          styles.step,
          active === 3 ? styles.step__active : ''
        )}
      >
        <Text isMedium>4. Количество участников</Text>
      </div>
    </div>
  );
};
