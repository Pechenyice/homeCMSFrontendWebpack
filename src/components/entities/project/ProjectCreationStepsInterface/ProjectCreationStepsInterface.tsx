import { Button, Text } from 'components/kit';
import { ChangeEvent } from 'react';
import { IProjectState } from 'types/entities/states';
import { EEntityPartition } from 'types/enums';
import styles from './ProjectCreationStepsInterface.module.scss';
import { ContactsPartitionStep } from './steps/ContactsPartitionStep';
import { ExpieriencePartitionStep } from './steps/ExpieriencePartitionStep';
import { MainPartitionStep } from './steps/MainPartitionStep';
import { MembersPartitionStep } from './steps/MembersPartitionStep';

type Props = {
  mainPartition: IProjectState['mainPartition'];
  expieriencePartition: IProjectState['expieriencePartition'];
  contactsPartition: IProjectState['contactsPartition'];
  membersPartition: IProjectState['membersPartition'];
  active: number;
  onChange: (
    partition: EEntityPartition,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onHelperChange: (
    partition: EEntityPartition,
    helperName: string,
    value: boolean
  ) => void;
  onSelectChange: (
    partition: EEntityPartition,
    name: string,
    option: number
  ) => void;
  onMultipleSelectChange: (
    partition: EEntityPartition,
    name: string,
    option: number
  ) => void;
  onCheckToggle: (partition: EEntityPartition, name: string) => void;
  onMembersEntryChange: (
    partition: EEntityPartition,
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onAddMembersEntry: () => void;
  onRemoveMembersEntry: (index: number) => void;
  onPhotoChange: (
    partition: EEntityPartition,
    name: string,
    photoPath: string | null,
    photoName: string | null
  ) => void;
};

export const ProjectCreationStepsInterface = ({
  mainPartition,
  expieriencePartition,
  contactsPartition,
  membersPartition,
  active,
  onChange,
  onHelperChange,
  onSelectChange,
  onMultipleSelectChange,
  onCheckToggle,
  onMembersEntryChange,
  onAddMembersEntry,
  onRemoveMembersEntry,
  onPhotoChange,
}: Props) => {
  const bindChange = (partition: EEntityPartition) => {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(partition, e);
  };

  const bindHelperChange = (partition: EEntityPartition) => {
    return (helperName: string, value: boolean) =>
      onHelperChange(partition, helperName, value);
  };

  const bindSelectChange = (partition: EEntityPartition) => {
    return (name: string, option: number) =>
      onSelectChange(partition, name, option);
  };

  const bindMultipleSelectChange = (partition: EEntityPartition) => {
    return (name: string, option: number) =>
      onMultipleSelectChange(partition, name, option);
  };

  const bindCheckToggleChange = (partition: EEntityPartition) => {
    return (name: string) => onCheckToggle(partition, name);
  };

  const bindMembersEntryChange = (partition: EEntityPartition) => {
    return (
      index: number,
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => onMembersEntryChange(partition, index, e);
  };

  const bindPhotoChange = (partition: EEntityPartition) => {
    return (
      name: string,
      photoPath: string | null,
      photoName: string | null
    ) => {
      onPhotoChange(partition, name, photoPath, photoName);
    };
  };

  return (
    <div className={styles.wrapper}>
      {active === 0 && (
        <MainPartitionStep
          mainPartition={mainPartition}
          onChange={bindChange(EEntityPartition.MAIN)}
          onHelperChange={bindHelperChange(EEntityPartition.MAIN)}
          onSelect={bindSelectChange(EEntityPartition.MAIN)}
          onMultipleSelect={bindMultipleSelectChange(EEntityPartition.MAIN)}
          onCheckToggle={bindCheckToggleChange(EEntityPartition.MAIN)}
          onPhotoChange={bindPhotoChange(EEntityPartition.MAIN)}
        />
      )}
      {active === 1 && (
        <ExpieriencePartitionStep
          expieriencePartition={expieriencePartition}
          onChange={bindChange(EEntityPartition.EXPIERIENCE)}
          onHelperChange={bindHelperChange(EEntityPartition.EXPIERIENCE)}
          onSelect={bindSelectChange(EEntityPartition.EXPIERIENCE)}
          onMultipleSelect={bindMultipleSelectChange(
            EEntityPartition.EXPIERIENCE
          )}
          onCheckToggle={bindCheckToggleChange(EEntityPartition.EXPIERIENCE)}
        />
      )}
      {active === 2 && (
        <ContactsPartitionStep
          contactsPartition={contactsPartition}
          onChange={bindChange(EEntityPartition.CONTACTS)}
          onHelperChange={bindHelperChange(EEntityPartition.CONTACTS)}
          onSelect={bindSelectChange(EEntityPartition.CONTACTS)}
          onMultipleSelect={bindMultipleSelectChange(EEntityPartition.CONTACTS)}
          onCheckToggle={bindCheckToggleChange(EEntityPartition.CONTACTS)}
        />
      )}
      {active === 3 && (
        <MembersPartitionStep
          membersPartition={membersPartition}
          onChange={bindChange(EEntityPartition.MEMBERS)}
          onHelperChange={bindHelperChange(EEntityPartition.MEMBERS)}
          onSelect={bindSelectChange(EEntityPartition.MEMBERS)}
          onMultipleSelect={bindMultipleSelectChange(EEntityPartition.MEMBERS)}
          onCheckToggle={bindCheckToggleChange(EEntityPartition.MEMBERS)}
          onMembersEntryChange={bindMembersEntryChange(
            EEntityPartition.MEMBERS
          )}
          onAddMembersEntry={onAddMembersEntry}
          onRemoveMembersEntry={onRemoveMembersEntry}
        />
      )}
    </div>
  );
};
