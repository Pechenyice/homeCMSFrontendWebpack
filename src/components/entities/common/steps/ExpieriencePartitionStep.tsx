import {
  Checkbox,
  ESkeletonMode,
  HelperEnableSelect,
  Input,
  MultipleSelect,
  Select,
  Skeleton,
  Text,
  TextArea,
} from 'components/kit';
import { ChangeEvent } from 'react';
import {
  ICommonExpieriencePartitionState,
  ICommonExpierienceSwitchers,
} from 'types/entities/states';
import styles from './PartitionStep.module.scss';

type Props = {
  switchers: ICommonExpierienceSwitchers;
  expieriencePartition: ICommonExpieriencePartitionState;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitcherChange: (switcherName: string, value: boolean) => void;
};

export const ExpieriencePartitionStep = ({
  switchers,
  expieriencePartition,
  onChange,
  onSwitcherChange,
}: Props) => {
  /**
   * binders
   */
  const bindSwitcherChange = (switcherName: string) => {
    return (value: boolean) => onSwitcherChange(switcherName, value);
  };

  return (
    <div className={styles.wrapper}>
      <HelperEnableSelect
        className={styles.half}
        heading="Описание результатов в виде статьи, опубликованной в сборнике, журнале"
        value={switchers.hasResultsDescriptionInJournal}
        onChangeOption={bindSwitcherChange('hasResultsDescriptionInJournal')}
      >
        <TextArea
          className={styles.leadHelper}
          name="resultsDescriptionInJournal"
          value={expieriencePartition.resultsDescriptionInJournal.value}
          onChange={onChange}
          error={expieriencePartition.resultsDescriptionInJournal.error}
          placeholder="Описание"
        />
        <Input
          name="resultsDescriptionInJournalLink"
          value={expieriencePartition.resultsDescriptionInJournalLink.value}
          onChange={onChange}
          error={expieriencePartition.resultsDescriptionInJournalLink.error}
          placeholder="Ссылка"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        className={styles.half}
        heading="Представление информации о результатах в СМИ"
        value={switchers.hasResultsInformationInMassMedia}
        onChangeOption={bindSwitcherChange('hasResultsInformationInMassMedia')}
      >
        <TextArea
          className={styles.leadHelper}
          name="resultsInformationInMassMedia"
          value={expieriencePartition.resultsInformationInMassMedia.value}
          onChange={onChange}
          error={expieriencePartition.resultsInformationInMassMedia.error}
          placeholder="Описание"
        />
        <Input
          name="resultsInformationInMassMediaLink"
          value={expieriencePartition.resultsInformationInMassMediaLink.value}
          onChange={onChange}
          error={expieriencePartition.resultsInformationInMassMediaLink.error}
          placeholder="Ссылка"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        className={styles.half}
        heading="Представление результатов на мероприятиях различного уровня"
        value={switchers.hasResultsInformationInDifferentLevelsEvents}
        onChangeOption={bindSwitcherChange(
          'hasResultsInformationInDifferentLevelsEvents'
        )}
      >
        <TextArea
          className={styles.leadHelper}
          name="resultsInformationInDifferentLevelsEvents"
          value={
            expieriencePartition.resultsInformationInDifferentLevelsEvents.value
          }
          onChange={onChange}
          error={
            expieriencePartition.resultsInformationInDifferentLevelsEvents.error
          }
          placeholder="Описание"
        />
        <Input
          name="resultsInformationInDifferentLevelsEventsLink"
          value={
            expieriencePartition.resultsInformationInDifferentLevelsEventsLink
              .value
          }
          onChange={onChange}
          error={
            expieriencePartition.resultsInformationInDifferentLevelsEventsLink
              .error
          }
          placeholder="Ссылка"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        className={styles.half}
        heading="Проведение мастер-классов (семинаров) по результатам"
        value={switchers.hasResultsMasterClasses}
        onChangeOption={bindSwitcherChange('hasResultsMasterClasses')}
      >
        <TextArea
          className={styles.leadHelper}
          name="resultsMasterClasses"
          value={expieriencePartition.resultsMasterClasses.value}
          onChange={onChange}
          error={expieriencePartition.resultsMasterClasses.error}
          placeholder="Описание"
        />
        <Input
          name="resultsMasterClassesLink"
          value={expieriencePartition.resultsMasterClassesLink.value}
          onChange={onChange}
          error={expieriencePartition.resultsMasterClassesLink.error}
          placeholder="Ссылка"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        className={styles.half}
        heading="Представление информации о результатах на сайте организации"
        value={switchers.hasResultsOnWebsite}
        onChangeOption={bindSwitcherChange('hasResultsOnWebsite')}
      >
        <TextArea
          className={styles.leadHelper}
          name="resultsOnWebsite"
          value={expieriencePartition.resultsOnWebsite.value}
          onChange={onChange}
          error={expieriencePartition.resultsOnWebsite.error}
          placeholder="Описание"
        />
        <Input
          name="resultsOnWebsiteLink"
          value={expieriencePartition.resultsOnWebsiteLink.value}
          onChange={onChange}
          error={expieriencePartition.resultsOnWebsiteLink.error}
          placeholder="Ссылка"
        />
      </HelperEnableSelect>
    </div>
  );
};
