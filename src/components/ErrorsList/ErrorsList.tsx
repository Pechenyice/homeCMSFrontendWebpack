import { Event } from 'components/kit';
import styles from './ErrorsList.module.scss';
import { useErrors } from 'hooks';
import { IEvent } from 'types/interfaces';

const ErrorsList = () => {
  const { errors, removeError } = useErrors();

  return (
    <section className={styles.wrapper}>
      {errors.map((e: IEvent, i: number) => (
        <Event isError onClick={() => removeError(e.id)} key={i}>
          {e.text}
        </Event>
      ))}
    </section>
  );
};

export default ErrorsList;
