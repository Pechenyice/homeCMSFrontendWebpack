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
import { IMainHelpers } from 'types/entities/entities';
import { IProjectState } from 'types/entities/states';
import styles from './PartitionStep.module.scss';

type Props = {
  expieriencePartition: IProjectState['expieriencePartition'];
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onHelperChange: (helperName: string, value: boolean) => void;
  onSelect: (name: string, option: number) => void;
  onMultipleSelect: (name: string, option: number) => void;
  onCheckToggle: (name: string) => void;
};

export const ExpieriencePartitionStep = ({
  expieriencePartition,
  onChange,
  onHelperChange,
  onSelect,
  onMultipleSelect,
  onCheckToggle,
}: Props) => {
  /**
   * binders
   */
  const bindHelperChange = (helperName: string) => {
    return (value: boolean) => onHelperChange(helperName, value);
  };

  const bindSelect = (name: string) => (option: number) => {
    onSelect(name, option);
  };

  const bindMultipleSelect = (name: string) => (option: number) => {
    onMultipleSelect(name, option);
  };

  const bindCheckToggle = (name: string) => () => {
    onCheckToggle(name);
  };

  return (
    <div className={styles.wrapper}>
      <HelperEnableSelect
        className={styles.half}
        heading="Представление информации о результатах в районных, городских СМИ"
        value={expieriencePartition.hasResultsInformationInMassMedia}
        onChangeOption={bindHelperChange('hasResultsInformationInMassMedia')}
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
          placeholder="Ссылка на сайт"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        className={styles.half}
        heading="Представление информации о результатах на радио"
        value={expieriencePartition.hasResultsInformationInRadio}
        onChangeOption={bindHelperChange('hasResultsInformationInRadio')}
      >
        <TextArea
          className={styles.leadHelper}
          name="resultsInformationInRadio"
          value={expieriencePartition.resultsInformationInRadio.value}
          onChange={onChange}
          error={expieriencePartition.resultsInformationInRadio.error}
          placeholder="Описание"
        />
        <Input
          name="resultsInformationInRadioLink"
          value={expieriencePartition.resultsInformationInRadioLink.value}
          onChange={onChange}
          error={expieriencePartition.resultsInformationInRadioLink.error}
          placeholder="Ссылка на сайт"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        className={styles.half}
        heading="Представление информации о результатах на телевидении"
        value={expieriencePartition.hasResultsInformationInTV}
        onChangeOption={bindHelperChange('hasResultsInformationInTV')}
      >
        <TextArea
          className={styles.leadHelper}
          name="resultsInformationInTV"
          value={expieriencePartition.resultsInformationInTV.value}
          onChange={onChange}
          error={expieriencePartition.resultsInformationInTV.error}
          placeholder="Описание"
        />
        <Input
          name="resultsInformationInTVLink"
          value={expieriencePartition.resultsInformationInTVLink.value}
          onChange={onChange}
          error={expieriencePartition.resultsInformationInTVLink.error}
          placeholder="Ссылка на сайт"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        className={styles.half}
        heading="Описание результатов в виде статьи, опубликованной в сборнике, журнале"
        value={expieriencePartition.hasResultsDescriptionInJournal}
        onChangeOption={bindHelperChange('hasResultsDescriptionInJournal')}
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
          placeholder="Ссылка на сайт"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        className={styles.half}
        heading="Представление результатов на мероприятиях различного уровня"
        value={
          expieriencePartition.hasResultsInformationInDifferentLevelsEvents
        }
        onChangeOption={bindHelperChange(
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
          placeholder="Ссылка на сайт"
        />
      </HelperEnableSelect>
      <HelperEnableSelect
        className={styles.half}
        heading="Проведение мастер-классов (семинаров) по результатам"
        value={expieriencePartition.hasResultsMasterClasses}
        onChangeOption={bindHelperChange('hasResultsMasterClasses')}
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
          placeholder="Ссылка на сайт"
        />
      </HelperEnableSelect>

      <HelperEnableSelect
        className={styles.half}
        heading="Проведение информации о результатах на сайте учреждения"
        value={expieriencePartition.hasResultsOnWebsite}
        onChangeOption={bindHelperChange('hasResultsOnWebsite')}
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
          placeholder="Ссылка на сайт"
        />
      </HelperEnableSelect>
    </div>
  );
};
