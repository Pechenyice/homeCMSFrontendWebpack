import { Button, Text } from 'components/kit';
import { ChangeEvent } from 'react';
import { IProjectState, IProjectSwitchers } from 'types/entities/project';
import { EEntityPartition } from 'types/enums';
import { IFileInfo } from 'types/interfaces';
import styles from './ProjectCreationStepsInterface.module.scss';
import { ContactsPartitionStep } from './steps/ContactsPartitionStep';
import { ExpieriencePartitionStep } from './steps/ExpieriencePartitionStep';
import { MainPartitionStep } from './steps/MainPartitionStep';
import { MembersPartitionStep } from './steps/MembersPartitionStep';

type Props = {
  switchers: IProjectSwitchers;
  mainPartition: IProjectState['mainPartition'];
  expieriencePartition: IProjectState['expieriencePartition'];
  contactsPartition: IProjectState['contactsPartition'];
  membersPartition: IProjectState['membersPartition'];
  active: number;
  onChange: (
    partition: EEntityPartition,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSwitcherChange: (switcherName: string, value: boolean) => void;
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
  onMultipleParentSelectChange: (
    partition: EEntityPartition,
    name: string,
    child: string,
    option: number
  ) => void;
  onCheckToggle: (partition: EEntityPartition, name: string) => void;
  onMembersEntryChange: (
    partition: EEntityPartition,
    id: any,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onAddMembersEntry: () => void;
  onRemoveMembersEntry: (id: any) => void;
  onPhotoChange: (
    partition: EEntityPartition,
    name: string,
    photoId: number | null,
    photoPath: string | null,
    photoName: string | null
  ) => void;
  onGalleryPhotosAdd: (
    partition: EEntityPartition,
    name: string,
    photos: IFileInfo['file'][]
  ) => void;
  onGalleryPhotoDelete: (
    partition: EEntityPartition,
    name: string,
    photoId: number
  ) => void;
};

export const ProjectCreationStepsInterface = ({
  switchers,
  mainPartition,
  expieriencePartition,
  contactsPartition,
  membersPartition,
  active,
  onChange,
  onSwitcherChange,
  onSelectChange,
  onMultipleSelectChange,
  onMultipleParentSelectChange,
  onCheckToggle,
  onMembersEntryChange,
  onAddMembersEntry,
  onRemoveMembersEntry,
  onPhotoChange,
  onGalleryPhotosAdd,
  onGalleryPhotoDelete,
}: Props) => {
  const bindChange = (partition: EEntityPartition) => {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(partition, e);
  };

  const bindSelectChange = (partition: EEntityPartition) => {
    return (name: string, option: number) =>
      onSelectChange(partition, name, option);
  };

  const bindMultipleSelectChange = (partition: EEntityPartition) => {
    return (name: string, option: number) =>
      onMultipleSelectChange(partition, name, option);
  };

  const bindMultipleParentSelectChange = (partition: EEntityPartition) => {
    return (name: string, child: string, option: number) =>
      onMultipleParentSelectChange(partition, name, child, option);
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
      photoId: number | null,
      photoPath: string | null,
      photoName: string | null
    ) => {
      onPhotoChange(partition, name, photoId, photoPath, photoName);
    };
  };

  const bindGalleryPhotosAdd = (partition: EEntityPartition) => {
    return (name: string, photos: IFileInfo['file'][]) => {
      onGalleryPhotosAdd(partition, name, photos);
    };
  };

  const bindGalleryPhotoDelete = (partition: EEntityPartition) => {
    return (name: string, photoId: number) => {
      onGalleryPhotoDelete(partition, name, photoId);
    };
  };

  return (
    <div className={styles.wrapper}>
      {active === 0 && (
        <MainPartitionStep
          switchers={switchers}
          mainPartition={mainPartition}
          onChange={bindChange(EEntityPartition.MAIN)}
          onSwitcherChange={onSwitcherChange}
          onSelect={bindSelectChange(EEntityPartition.MAIN)}
          onMultipleSelect={bindMultipleSelectChange(EEntityPartition.MAIN)}
          onMultipleParentSelect={bindMultipleParentSelectChange(
            EEntityPartition.MAIN
          )}
          onCheckToggle={bindCheckToggleChange(EEntityPartition.MAIN)}
          onPhotoChange={bindPhotoChange(EEntityPartition.MAIN)}
          onGalleryPhotosAdd={bindGalleryPhotosAdd(EEntityPartition.MAIN)}
          onGalleryPhotoDelete={bindGalleryPhotoDelete(EEntityPartition.MAIN)}
        />
      )}
      {active === 1 && (
        <ExpieriencePartitionStep
          switchers={switchers}
          expieriencePartition={expieriencePartition}
          onChange={bindChange(EEntityPartition.EXPIERIENCE)}
          onSwitcherChange={onSwitcherChange}
        />
      )}
      {active === 2 && (
        <ContactsPartitionStep
          contactsPartition={contactsPartition}
          onChange={bindChange(EEntityPartition.CONTACTS)}
        />
      )}
      {active === 3 && (
        <MembersPartitionStep
          membersPartition={membersPartition}
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
