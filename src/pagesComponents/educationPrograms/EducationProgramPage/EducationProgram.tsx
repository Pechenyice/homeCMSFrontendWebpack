import { ProjectViewMainPartition } from 'components/entities/project/ProjectViewStepsInterface/ProjectViewMainPartition';
import { EntityCreationSteps } from 'components/EntityCreationSteps/EntityCreationSteps';
import { ChangeEvent, useState } from 'react';
import styles from './EducationProgram.module.scss';

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
import { useQueryClient } from 'react-query';
import { IEducationProgramData } from 'types/entities/educationProgram';
import { EducationProgramViewMainPartition } from 'components/entities/educationProgram/EducationProgramViewStepsInterface/EducationProgramViewMainPartition';

type Props = {
  educationProgram: IEducationProgramData;
  isAdmin?: boolean;
};

const CURRENT_STEPS_NUMBER = 4;

export const EducationProgramPage = ({ educationProgram, isAdmin }: Props) => {
  const { addError } = useErrors();
  const { addInfo } = useInfos();
  const { handleLogout } = useAuth();

  const queryClient = useQueryClient();

  const { userId } = useParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isBest, setIsBest] = useState(educationProgram.isBest);
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

      await API.educationProgram.reject(
        userId as any,
        educationProgram.id,
        cause
      );

      setIsLoading(false);

      addInfo('Заявка успешно отклонена!');

      queryClient.invalidateQueries('educationProgram');

      navigate('/education');
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при отклонении образовательной программы!'
        );
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

      await API.educationProgram.approve(
        userId as any,
        educationProgram.id,
        isBest
      );

      setIsLoading(false);

      addInfo('Заявка успешно принята!');

      queryClient.invalidateQueries('educationProgram');

      navigate('/education');
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при принятии образовательной программы!'
        );
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
        {currentStep === 0 && (
          <EducationProgramViewMainPartition data={educationProgram} />
        )}
        {currentStep === 1 && <ExpierienceView data={educationProgram} />}
        {currentStep === 2 && <ContactsView data={educationProgram} />}
        {currentStep === 3 && <MembersView data={educationProgram} />}
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

      {isAdmin && !educationProgram.isDeleted && (
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
              label={<Text>Разместить в Виртуальной гостиной</Text>}
            />
          }
          text={`Вы точно хотите принять заявку “${
            educationProgram.name ?? ''
          }”?`}
          submitText="Принять"
          cancelText="Назад"
          onSubmit={handleApprove}
          onCancel={handleToggleApproveModal}
        />
      )}
    </div>
  );
};
