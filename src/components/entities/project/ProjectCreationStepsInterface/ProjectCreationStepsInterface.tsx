import { Button, Text } from 'components/kit';
import { ChangeEvent } from 'react';
import { IExpierienceHelpers, IMainHelpers } from 'types/entities/entities';
import { IProjectState } from 'types/entities/states';
import { EEntityPartition } from 'types/enums';
import styles from './ProjectCreationStepsInterface.module.scss';
import { MainPartitionStep } from './steps/MainPartitionStep';

type Props = {
  mainPartition: IProjectState['mainPartition'];
  mainHelpersPartition: IMainHelpers;
  expieriencePartition: IProjectState['expieriencePartition'];
  expierienceHelpersPartition: IExpierienceHelpers;
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
};

export const ProjectCreationStepsInterface = ({
  mainPartition,
  mainHelpersPartition,
  active,
  onChange,
  onHelperChange,
  onSelectChange,
  onMultipleSelectChange,
  onCheckToggle,
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

  return (
    <div className={styles.wrapper}>
      {active === 0 && (
        <MainPartitionStep
          mainPartition={mainPartition}
          mainHelpersPartition={mainHelpersPartition}
          onChange={bindChange(EEntityPartition.MAIN)}
          onHelperChange={bindHelperChange(EEntityPartition.MAIN_HELPER)}
          onSelect={bindSelectChange(EEntityPartition.MAIN)}
          onMultipleSelect={bindMultipleSelectChange(EEntityPartition.MAIN)}
          onCheckToggle={bindCheckToggleChange(EEntityPartition.MAIN)}
        />
      )}
      {/* {active === 1 && <Step1 />} */}
      {/* {active === 2 && <Step1 />} */}
      {/* {active === 3 && <Step1 />} */}
    </div>
  );
};
