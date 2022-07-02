import { EntityCreationSteps } from 'components';
import { useState } from 'react';
import { IExpierienceHelpers } from 'types/entities/entities';
import { IProjectState } from 'types/entities/states';

type Props = {
  mainPartition: IProjectState['mainPartition'];
  expieriencePartition: IProjectState['expieriencePartition'];
  expierienceHelpersPartition: IExpierienceHelpers;
  contactsPartition: IProjectState['contactsPartition'];
  membersPartition: IProjectState['membersPartition'];
};

export const ProjectCreationPresentational = ({
  mainPartition,
  expieriencePartition,
  expierienceHelpersPartition,
  contactsPartition,
  membersPartition,
}: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <EntityCreationSteps active={currentStep} />
    </>
  );
};
