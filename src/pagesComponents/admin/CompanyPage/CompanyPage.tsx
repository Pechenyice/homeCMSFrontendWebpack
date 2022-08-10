import styles from './CompanyPage.module.scss';
import { Dropdown, PageHeading } from 'components';
import {
  Action,
  Breadcrumbs,
  Button,
  Checkbox,
  ESkeletonMode,
  Input,
  Layout,
  Modal,
  Skeleton,
  Text,
  TextArea,
} from 'components/kit';
import { EditIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectPage, ProjectsPage } from 'pagesComponents';
import { useQuery } from 'react-query';
import { getProjectKey } from 'hooks/queries/keys';
import { API } from 'api/controller';
import { useProject } from 'hooks/queries/entities/useProject';
import PageLoader from 'components/PageLoader/PageLoader';
import { useAuth, useErrors, useInfos } from 'hooks';
import { useDistricts } from 'hooks/queries/useDistricts';
import { useOrganizationTypes } from 'hooks/queries/useOrganizationTypes';
import { ChangeEvent, useMemo, useState } from 'react';
import { useCompany } from 'hooks/queries/useCompany';
import { getValueByIdFromSelect } from 'utils';
import { ICompany } from 'types/interfaces';
import { ApiError, AuthError, ServerError } from 'api/errors';

type Props = {
  company: ICompany | null;
};

export const CompanyPage = ({ company }: Props) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { profile, handleLogout } = useAuth();
  const { addError } = useErrors();
  const { addInfo } = useInfos();

  const {
    apiData: districts,
    apiError: districtsApiError,
    isLoading: districtsLoading,
    isError: districtsError,
  } = useDistricts();
  const {
    apiData: organizationTypes,
    apiError: organizationTypesApiError,
    isLoading: organizationTypesLoading,
    isError: organizationTypesError,
  } = useOrganizationTypes();

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [cause, setCause] = useState('');

  const handleCauseChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCause(e.target.value);
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

      await API.company.reject(userId as any, cause);

      setIsLoading(false);

      addInfo('Профиль успешно отклонен!');

      navigate('/users');
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при отклонении профиля!');
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

      await API.company.approve(userId as any);

      setIsLoading(false);

      addInfo('Профиль успешно принят!');

      navigate('/users');
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при принятии профиля!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
  };

  return (
    <div className={styles.styled}>
      <div className={styles.group}>
        <TextArea
          className={styles.half}
          value={company?.fullName}
          heading="Полное наименование организации"
          readOnly
        />
        <Input
          className={styles.half}
          value={company?.name}
          heading="Краткое наименование организации"
          readOnly
        />
      </div>

      <div className={styles.group}>
        <div className={styles.half}>
          {districtsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Подведомственное КСП, администрации района или СО НКО"
            />
          ) : districtsError ? (
            <Input
              value={''}
              heading="Подведомственное КСП, администрации района или СО НКО"
              readOnly
            />
          ) : (
            <Input
              value={getValueByIdFromSelect(districts!, company?.district)}
              heading="Подведомственное КСП, администрации района или СО НКО"
              readOnly
            />
          )}
        </div>
        <div className={styles.half}>
          {organizationTypesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Тип организации"
            />
          ) : organizationTypesError ? (
            <Input value={''} heading="Тип организации" readOnly />
          ) : (
            <Input
              value={getValueByIdFromSelect(organizationTypes!, company?.type)}
              heading="Тип организации"
              readOnly
            />
          )}
        </div>
      </div>

      <div className={styles.group}>
        <Input
          className={styles.half}
          value={company?.link}
          heading="Ссылка на официальный сайт организации"
          readOnly
        />
        <Input
          className={styles.half}
          value={company?.phoneNumber}
          heading="Номер телефона организации"
          readOnly
        />
      </div>

      <div className={styles.group}>
        <Input
          className={styles.half}
          value={company?.email}
          heading="Электронная почта организации"
          readOnly
        />
        <Input
          className={styles.half}
          value={company?.supervisor}
          heading="Руководитель организации"
          readOnly
        />
      </div>

      <div className={styles.group}>
        <div className={styles.half}>
          <Checkbox
            className={styles.leadField}
            checked={company?.educationLicense}
            readOnly
            label={
              <Text>
                Наличие лицензии на осуществление образовательной деятельности
              </Text>
            }
          />
          {company?.educationLicense && (
            <>
              <Input
                className={styles.leadField}
                value={company?.educationLicenseNumber}
                heading="Номер лицензии на осуществление образовательной деятельности"
                readOnly
              />
              <Input
                className={styles.leadField}
                value={company?.educationLicenseDate}
                heading="Дата выдачи лицензии"
                readOnly
              />
              <Input
                value={company?.educationLicenseKind}
                heading="Вид деятельности"
                readOnly
              />
            </>
          )}
        </div>
        <div className={styles.half}>
          <Checkbox
            className={styles.leadField}
            checked={company?.medicineLicense}
            readOnly
            label={
              <Text>
                Наличие лицензии на осуществление медицинской деятельности
              </Text>
            }
          />
          {company?.medicineLicense && (
            <>
              <Input
                className={styles.leadField}
                value={company?.medicineLicenseNumber}
                heading="Номер лицензии на осуществление медицинской деятельности"
                readOnly
              />
              <Input
                value={company?.medicineLicenseDate}
                heading="Дата выдачи лицензии"
                readOnly
              />
            </>
          )}
        </div>
      </div>

      <div className={styles.group}>
        <Checkbox
          className={styles.half}
          checked={company?.innovationGround}
          readOnly
          label={<Text>Наличие инновационной площадки в организации</Text>}
        />
      </div>

      <Input
        className={styles.half}
        value={company?.responsible}
        heading="Ответственный за предоставление информации"
        readOnly
      />
      <Input
        className={styles.half}
        value={company?.responsiblePhoneNumber}
        heading="Телефон ответственного за предоставление информации"
        readOnly
      />

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
          text="Отклонить профиль"
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
          text={`Вы точно хотите принять профиль “${company?.name ?? ''}”?`}
          submitText="Принять"
          cancelText="Назад"
          onSubmit={handleApprove}
          onCancel={handleToggleApproveModal}
        />
      )}
    </div>
  );
};
