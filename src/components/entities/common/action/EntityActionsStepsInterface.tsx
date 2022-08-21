import { EEntity } from 'api/enums';
import { ClubMainPartitionStep } from 'components/entities/club/ClubCreationStepsInterface/steps/ClubMainPartitionStep';
import { EducationProgramMainPartitionStep } from 'components/entities/educationProgram/EducationProgramCreationStepsInterface/steps/EducationProgramMainPartitionStep';
import { ProjectMainPartitionStep } from 'components/entities/project/ProjectCreationStepsInterface/steps/ProjectMainPartitionStep';
import { SocialWorkMainPartitionStep } from 'components/entities/socialWork/SocialWorkCreationStepsInterface/steps/SocialWorkMainPartitionStep';
import { ChangeEvent, useMemo } from 'react';
import { IProjectSwitchers } from 'types/entities/project';
import {
  ICommonContactsPartitionState,
  ICommonExpieriencePartitionState,
  ICommonMembersPartitionState,
} from 'types/entities/states';
import { EEntityPartition } from 'types/enums';
import { IFileInfo } from 'types/interfaces';
import { ContactsPartitionStep } from '../steps/ContactsPartitionStep';
import { ExpieriencePartitionStep } from '../steps/ExpieriencePartitionStep';
import { MembersPartitionStep } from '../steps/MembersPartitionStep';
import styles from './EntityActionsStepsInterface.module.scss';

type Props = {
  entity: EEntity;
  switchers: any; // switchers of any entity (IProjectSwitchers)
  mainPartition: any; //main partition of any entity (IProjectState['mainPartition'])
  expieriencePartition: ICommonExpieriencePartitionState;
  contactsPartition: ICommonContactsPartitionState;
  membersPartition: ICommonMembersPartitionState;
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

export const EntityActionsStepsInterface = ({
  entity,
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

  const getMainPartitionStep = () => {
    switch (entity) {
      case EEntity.PROJECT: {
        return (
          <ProjectMainPartitionStep
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
        );
      }
      case EEntity.EDUCATION_PROGRAM: {
        return (
          <EducationProgramMainPartitionStep
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
        );
      }
      case EEntity.SOCIAL_WORK: {
        return (
          <SocialWorkMainPartitionStep
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
        );
      }
      case EEntity.CLUB: {
        return (
          <ClubMainPartitionStep
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
        );
      }
    }
  };

  console.log(getMainPartitionStep());

  return (
    <div className={styles.wrapper}>
      {active === 0 && getMainPartitionStep()}
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
