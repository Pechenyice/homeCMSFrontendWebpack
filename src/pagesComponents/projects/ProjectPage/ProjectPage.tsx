import { ProjectViewMainPartition } from 'components/entities/project/ProjectViewStepsInterface/ProjectViewMainPartition';
import { EntityCreationSteps } from 'components/EntityCreationSteps/EntityCreationSteps';
import { ChangeEvent, useState } from 'react';
import styles from './ProjectPage.module.scss';

import { IProjectData } from 'types/entities/project';
import {
  Action,
  Button,
  Checkbox,
  Modal,
  Text,
  TextArea,
} from 'components/kit';
import { combineClasses } from 'utils/common';
import { ExpierienceView } from 'components/entities/common/ExpierienceView';
import { ContactsView } from 'components/entities/common/ContactsView';
import { MembersView } from 'components/entities/common/MembersView';

type Props = {
  project: IProjectData;
  isAdmin?: boolean;
};

const CURRENT_STEPS_NUMBER = 4;

export const ProjectPage = ({ project, isAdmin }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  const [isBest, setIsBest] = useState(false);
  const [cause, setCause] = useState('');

  const handleCauseChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCause(e.target.value);
  };

  const handleToggleIsBest = () => {
    setIsBest(!isBest);
  };

  const handleToggleRejectModal = () => {
    setIsRejectModalOpen(!isRejectModalOpen);
  };

  const handleToggleApproveModal = () => {
    setIsApproveModalOpen(!isApproveModalOpen);
  };

  const handleReject = () => {};

  const handleApprove = () => {};

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className={isAdmin ? styles.adminWrapper : ''}>
      <EntityCreationSteps
        active={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <div className={styles.content}>
        {currentStep === 0 && <ProjectViewMainPartition project={project} />}
        {currentStep === 1 && <ExpierienceView data={project} />}
        {currentStep === 2 && <ContactsView data={project} />}
        {currentStep === 3 && <MembersView data={project} />}
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

      {isAdmin && (
        <div className={styles.adminControls}>
          <Button
            className={styles.adminControls__reject}
            onClick={handleToggleRejectModal}
          >
            <Text isMedium>Отклонить</Text>
          </Button>
          <Button
            className={styles.adminControls__approve}
            onClick={handleToggleApproveModal}
          >
            <Text isMedium>Принять</Text>
          </Button>
        </div>
      )}

      {isRejectModalOpen && (
        <Modal
          isOpen
          isNegative
          content={
            <TextArea
              className={styles.modalContent}
              name="cause"
              value={cause}
              onChange={handleCauseChange}
              heading="Причина отклонения *"
              placeholder="Причина отклонения"
            />
          }
          text="Отклонить заявку"
          submitText="Отклонить"
          cancelText="Назад"
          onSubmit={handleReject}
          onCancel={handleToggleRejectModal}
        />
      )}
      {isApproveModalOpen && (
        <Modal
          isOpen
          isPositive
          content={
            <Checkbox
              className={styles.modalContent}
              checked={isBest}
              onToggle={handleToggleIsBest}
              label={<Text>Отправить на лендинг</Text>}
            />
          }
          text={`Вы точно хотите принять заявку “${project.name ?? ''}”?`}
          submitText="Принять"
          cancelText="Назад"
          onSubmit={handleApprove}
          onCancel={handleToggleApproveModal}
        />
      )}
    </div>
  );
};
