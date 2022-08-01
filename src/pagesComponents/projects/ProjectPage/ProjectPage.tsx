import { ProjectViewMainPartition } from 'components/entities/project/ProjectViewStepsInterface/ProjectViewMainPartition';
import { EntityCreationSteps } from 'components/EntityCreationSteps/EntityCreationSteps';
import { useState } from 'react';
import styles from './ProjectPage.module.scss';

import { IProjectData } from 'types/entities/entities';
import { Action, Button, Text } from 'components/kit';
import { combineClasses } from 'utils/common';

type Props = {
  project: IProjectData;
};

const CURRENT_STEPS_NUMBER = 4;

export const ProjectPage = ({ project }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <EntityCreationSteps
        active={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <div className={styles.content}>
        {currentStep === 0 && <ProjectViewMainPartition project={project} />}
      </div>
      <div
        className={combineClasses(
          styles.controls,
          currentStep + 1 === CURRENT_STEPS_NUMBER ? styles.controls__last : ''
        )}
      >
        {currentStep + 1 !== CURRENT_STEPS_NUMBER && (
          <Button className={styles.controls__button} onClick={handleNextStep}>
            <Text isMedium>
              {currentStep + 1}/{CURRENT_STEPS_NUMBER} Следующий шаг
            </Text>
          </Button>
        )}
        {!!currentStep && <Action text="Назад" onClick={handlePrevStep} />}
      </div>
    </>
  );
};
