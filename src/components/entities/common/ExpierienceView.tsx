import { HelperEnableSelect, Input, TextArea } from 'components/kit';
import { IExpieriencePartition } from 'types/entities/entities';
import styles from './common.module.scss';

type Props = {
  data: IExpieriencePartition;
};

export const ExpierienceView = ({ data }: Props) => {
  return (
    <div className={styles.wrapper}>
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Описание результатов в виде статьи, опубликованной в сборнике, журнале"
        value={
          !!data.resultsDescriptionInJournal ||
          !!data.resultsDescriptionInJournalLink
        }
        onChangeOption={() => {}}
      >
        <TextArea
          className={styles.leadHelper}
          readOnly
          value={data.resultsDescriptionInJournal ?? '-'}
          placeholder="Описание"
        />
        <Input
          readOnly
          value={data.resultsDescriptionInJournalLink ?? '-'}
          placeholder="Ссылка"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Представление информации о результатах в СМИ"
        value={
          !!data.resultsInformationInMassMedia ||
          !!data.resultsInformationInMassMediaLink
        }
        onChangeOption={() => {}}
      >
        <TextArea
          className={styles.leadHelper}
          readOnly
          value={data.resultsInformationInMassMedia ?? '-'}
          placeholder="Описание"
        />
        <Input
          readOnly
          value={data.resultsInformationInMassMediaLink ?? '-'}
          placeholder="Ссылка"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Представление результатов на мероприятиях различного уровня"
        value={
          !!data.resultsInformationInDifferentLevelsEvents ||
          !!data.resultsInformationInDifferentLevelsEventsLink
        }
        onChangeOption={() => {}}
      >
        <TextArea
          className={styles.leadHelper}
          readOnly
          value={data.resultsInformationInDifferentLevelsEvents ?? '-'}
          placeholder="Описание"
        />
        <Input
          readOnly
          value={data.resultsInformationInDifferentLevelsEventsLink ?? '-'}
          placeholder="Ссылка"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Проведение мастер-классов (семинаров) по результатам"
        value={!!data.resultsMasterClasses || !!data.resultsMasterClassesLink}
        onChangeOption={() => {}}
      >
        <TextArea
          className={styles.leadHelper}
          readOnly
          value={data.resultsMasterClasses ?? '-'}
          placeholder="Описание"
        />
        <Input
          readOnly
          value={data.resultsMasterClassesLink ?? '-'}
          placeholder="Ссылка"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        readOnly
        className={styles.half}
        heading="Представление информации о результатах на сайте организации"
        value={!!data.resultsOnWebsite || !!data.resultsOnWebsiteLink}
        onChangeOption={() => {}}
      >
        <TextArea
          className={styles.leadHelper}
          readOnly
          value={data.resultsOnWebsite ?? '-'}
          placeholder="Описание"
        />
        <Input
          readOnly
          value={data.resultsOnWebsiteLink ?? '-'}
          placeholder="Ссылка"
        />
      </HelperEnableSelect>
    </div>
  );
};
