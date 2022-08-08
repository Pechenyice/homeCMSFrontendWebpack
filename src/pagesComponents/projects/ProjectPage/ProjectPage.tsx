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
import { API } from 'api/controller';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks/useErrors';
import { useAuth, useInfos } from 'hooks/index';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  project: IProjectData;
  isAdmin?: boolean;
};

const CURRENT_STEPS_NUMBER = 4;

export const ProjectPage = ({ project, isAdmin }: Props) => {
  const { addError } = useErrors();
  const { addInfo } = useInfos();
  const { handleLogout } = useAuth();

  const { userId } = useParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isBest, setIsBest] = useState(project.isBest);
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

  const handleReject = async () => {
    try {
      if (!cause) {
        addError('Заполните причину отклонения заявки!');
        return;
      }
      if (!userId || isNaN(userId as any)) {
        addError('Не удалось отклонить заявку');
        return;
      }

      setIsLoading(true);

      await API.project.reject(userId as any, project.id, cause);

      setIsLoading(false);

      addInfo('Заявка успешно отклонена!');

      navigate('/projects');
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при отклонении проекта!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
  };

  const handleApprove = async () => {
    try {
      if (!userId || isNaN(userId as any)) {
        addError('Не удалось принять заявку');
        return;
      }

      setIsLoading(true);

      await API.project.approve(userId as any, project.id, isBest);

      setIsLoading(false);

      addInfo('Заявка успешно принята!');

      navigate('/projects');
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при принятии проекта!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
  };

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
