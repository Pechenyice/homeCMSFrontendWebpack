import { Event } from 'components/kit';
import styles from './InfosList.module.scss';
import { useInfos } from 'hooks';
import { IEvent } from 'types/interfaces';

const InfosList = () => {
  const { infos, removeInfo } = useInfos();

  return (
    <section className={styles.wrapper}>
      {infos.map((e: IEvent, i: number) => (
        <Event onClick={() => removeInfo(e.id)} key={i}>
          {e.text}
        </Event>
      ))}
    </section>
  );
};

export default InfosList;
