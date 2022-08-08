import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import {
  Action,
  Checkbox,
  H3,
  Input,
  Skeleton,
  ESkeletonMode,
  Text,
  TextArea,
  Select,
  Button,
  Modal,
} from 'components/kit';
import { useAuth, useErrors } from 'hooks';
import { useDistricts } from 'hooks/queries/useDistricts';
import { useOrganizationTypes } from 'hooks/queries/useOrganizationTypes';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EAuthStatus, EProposalStatus } from 'types/enums';
import { IProfileState, IInputsState, ICompany } from 'types/interfaces';
import {
  dateInputValidator,
  mapCompanyToAPI,
  registerDateInput,
  registerInput,
  textInputValidator,
  validateAll,
} from 'utils';
import styles from './ProfileEditorPage.module.scss';

export const ProfileEditorPage = () => {
  const { profile, updateProfile, handleLogout } = useAuth();
  const { addError } = useErrors();
  const navigate = useNavigate();

  const { company } = useMemo(() => profile ?? { company: null }, [profile]);

  const {
    apiData: districts,
    isLoading: districtsLoading,
    isError: districtsError,
  } = useDistricts();
  const {
    apiData: organizationTypes,
    isLoading: organizationTypesLoading,
    isError: organizationTypesError,
  } = useOrganizationTypes();

  const [fetchInProgress, setFetchInProgress] = useState(false);

  const [modalState, setModalState] = useState(false);

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const [state, setState] = useState<IProfileState>({
    name: registerInput(company?.name ?? '', textInputValidator),
    fullName: registerInput(company?.fullName ?? '', textInputValidator),
    type: company?.type!,
    district: company?.district!,
    link: registerInput(company?.link ?? '', textInputValidator),
    phoneNumber: registerInput(company?.phoneNumber ?? '', textInputValidator),
    email: registerInput(company?.email ?? '', textInputValidator),
    supervisor: registerInput(company?.supervisor ?? '', textInputValidator),
    responsible: registerInput(company?.responsible ?? '', textInputValidator),
    responsiblePhoneNumber: registerInput(
      company?.responsiblePhoneNumber ?? '',
      textInputValidator
    ),
    educationLicense: company?.educationLicense ?? false,
    educationLicenseNumber: registerInput(
      company?.educationLicenseNumber?.toString() ?? '',
      textInputValidator
    ),
    educationLicenseDate: registerDateInput(
      company?.educationLicenseDate ?? '',
      dateInputValidator
    ),
    educationLicenseKind: registerInput(
      company?.educationLicenseKind ?? '',
      textInputValidator
    ),
    medicineLicense: company?.medicineLicense ?? false,
    medicineLicenseNumber: registerInput(
      company?.medicineLicenseNumber?.toString() ?? '',
      textInputValidator
    ),
    medicineLicenseDate: registerDateInput(
      company?.medicineLicenseDate ?? '',
      dateInputValidator
    ),
    innovationGround: company?.innovationGround ?? false,
  });

  const handleProfileUpdate = async () => {
    toggleModal();

    const needValidation = {
      name: state.name,
      fullName: state.fullName,
      supervisor: state.supervisor,
      responsible: state.responsible,
    };

    const validationSuccess = validateAll(
      Object.values(needValidation).map((val) => ({
        value: val.value,
        validator: val.validator,
      }))
    );

    if (!validationSuccess) {
      addError('Проверьте поля на правильность');
      return;
    }

    setFetchInProgress(true);

    try {
      const stateValues: Partial<ICompany> = {
        name: state.name.value,
        fullName: state.fullName.value,
        district: state.district,
        type: state.type,
        link: state.link.value,
        phoneNumber: state.phoneNumber.value,
        email: state.email.value,
        supervisor: state.supervisor.value,
        responsible: state.responsible.value,
        responsiblePhoneNumber: state.responsiblePhoneNumber.value,
        educationLicense: state.educationLicense,
        educationLicenseNumber: Number(state.educationLicenseNumber.value),
        educationLicenseDate: state.educationLicenseDate.value,
        educationLicenseKind: state.educationLicenseKind.value,
        medicineLicense: state.medicineLicense,
        medicineLicenseNumber: Number(state.medicineLicenseNumber.value),
        medicineLicenseDate: state.medicineLicenseDate.value,
        innovationGround: state.innovationGround,
      };

      if (!profile?.id) throw new AuthError('Данные пользователя не найдены');

      const { data } = await API.profile.update(
        mapCompanyToAPI(stateValues as ICompany, true),
        profile.id
      );

      updateProfile({
        name: state.name.value,
        fullName: state.fullName.value,
        type: state?.type!,
        district: state?.district!,
        link: state.link.value,
        phoneNumber: state.phoneNumber.value,
        email: state.email.value,
        supervisor: state.supervisor.value,
        responsible: state.responsible.value,
        responsiblePhoneNumber: state.responsiblePhoneNumber.value,
        educationLicense: state?.educationLicense!,
        educationLicenseNumber: Number(state.educationLicenseNumber.value),
        educationLicenseDate: state.educationLicenseDate.value,
        educationLicenseKind: state.educationLicenseKind.value,
        medicineLicense: state?.medicineLicense!,
        medicineLicenseNumber: Number(state.medicineLicenseNumber.value),
        medicineLicenseDate: state.medicineLicenseDate.value,
        innovationGround: state?.innovationGround!,
        status: EProposalStatus.PENDING,
        cause: null,
      });

      navigate('/profile');
    } catch (e) {
      setFetchInProgress(false);

      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при обновлении данных профиля!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [key, value] = [e.target.name, e.target.value];

    const validationResult = ((state as unknown) as IInputsState)[
      key
    ].validator(value);

    setState({
      ...state,
      [key]: {
        ...((state as unknown) as IInputsState)[key],
        value,
        error: {
          exist: !validationResult.success,
          text: validationResult.text,
        },
      },
    });
  };

  const bindCheckToggle = (name: string) => () => {
    setState({
      ...state,
      [name]: !((state as unknown) as IInputsState)[name],
    });
  };

  const bindSelect = (name: string) => (option: number) => {
    setState({
      ...state,
      [name]: option,
    });
  };

  return (
    <div className={styles.styled}>
      <div className={styles.group}>
        <TextArea
          className={styles.half}
          name="fullName"
          value={state.fullName.value}
          onChange={handleChange}
          error={state.fullName.error}
          heading="Полное наименование организации"
        />
        <Input
          className={styles.half}
          name="name"
          value={state.name.value}
          onChange={handleChange}
          error={state.name.error}
          heading="Краткое наименование организации"
        />
      </div>

      <div className={styles.group}>
        <div className={styles.half}>
          {districtsLoading ? (
            <Skeleton mode={ESkeletonMode.INPUT} withLoader heading="Район" />
          ) : districtsError ? (
            <Input
              value={''}
              heading="Подведомственное КСП, администрации района или СО НКО"
              readOnly
            />
          ) : (
            <Select
              value={state.district}
              options={districts!}
              heading="Подведомственное КСП, администрации района или СО НКО"
              onChangeOption={bindSelect('district')}
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
            <Select
              value={state.type}
              options={organizationTypes!}
              heading="Тип организации"
              onChangeOption={bindSelect('type')}
            />
          )}
        </div>
      </div>

      <div className={styles.group}>
        <Input
          className={styles.half}
          name="link"
          value={state.link.value}
          onChange={handleChange}
          error={state.link.error}
          heading="Ссылка на официальный сайт организации"
        />
        <Input
          className={styles.half}
          name="phoneNumber"
          value={state.phoneNumber.value}
          onChange={handleChange}
          error={state.phoneNumber.error}
          heading="Номер телефона организации"
        />
      </div>

      <div className={styles.group}>
        <Input
          className={styles.half}
          name="email"
          value={state.email.value}
          onChange={handleChange}
          error={state.email.error}
          heading="Электронная почта организации"
        />
        <Input
          className={styles.half}
          name="supervisor"
          value={state.supervisor.value}
          onChange={handleChange}
          error={state.supervisor.error}
          heading="Руководитель организации"
        />
      </div>

      <div className={styles.group}>
        <div className={styles.half}>
          <Checkbox
            className={styles.leadField}
            checked={state.educationLicense}
            onToggle={bindCheckToggle('educationLicense')}
            label={
              <Text>
                Наличие лицензии на осуществление образовательной деятельности
              </Text>
            }
          />
          {state.educationLicense && (
            <>
              <Input
                className={styles.leadField}
                name="educationLicenseNumber"
                value={state.educationLicenseNumber.value}
                onChange={handleChange}
                error={state.educationLicenseNumber.error}
                heading="Номер лицензии на осуществление образовательной деятельности"
              />
              <Input
                className={styles.leadField}
                name="educationLicenseDate"
                value={state.educationLicenseDate.value}
                onChange={handleChange}
                error={state.educationLicenseDate.error}
                heading="Дата выдачи лицензии"
              />
              <Input
                name="educationLicenseKind"
                value={state.educationLicenseKind.value}
                onChange={handleChange}
                error={state.educationLicenseKind.error}
                heading="Вид деятельности"
              />
            </>
          )}
        </div>
        <div className={styles.half}>
          <Checkbox
            className={styles.leadField}
            checked={state.medicineLicense}
            onToggle={bindCheckToggle('medicineLicense')}
            label={
              <Text>
                Наличие лицензии на осуществление медицинской деятельности
              </Text>
            }
          />
          {state.medicineLicense && (
            <>
              <Input
                className={styles.leadField}
                name="medicineLicenseNumber"
                value={state.medicineLicenseNumber.value}
                onChange={handleChange}
                error={state.medicineLicenseNumber.error}
                heading="Номер лицензии на осуществление медицинской деятельности"
              />
              <Input
                name="medicineLicenseDate"
                value={state.medicineLicenseDate.value}
                onChange={handleChange}
                error={state.medicineLicenseDate.error}
                heading="Дата выдачи лицензии"
              />
            </>
          )}
        </div>
      </div>

      <div className={styles.group}>
        <Checkbox
          checked={state.innovationGround}
          onToggle={bindCheckToggle('innovationGround')}
          label={<Text>Наличие инновационной площадки в организации</Text>}
        />
      </div>

      <Input
        className={styles.half}
        name="responsible"
        value={state.responsible.value}
        onChange={handleChange}
        error={state.responsible.error}
        heading="Ответственный за предоставление информации"
      />
      <Input
        className={styles.half}
        name="responsiblePhoneNumber"
        value={state.responsiblePhoneNumber.value}
        onChange={handleChange}
        error={state.responsiblePhoneNumber.error}
        heading="Телефон ответственного за предоставление информации"
      />

      <div className={styles.footer}>
        <Button
          onClick={toggleModal}
          className={styles.footer__button}
          isLoading={
            districtsLoading || organizationTypesLoading || fetchInProgress
          }
          disabled={districtsError || organizationTypesError}
        >
          <Text>Отправить на рассмотрение</Text>
        </Button>
        <Action
          text="Отменить изменения"
          onClick={() => navigate('/profile')}
        />
      </div>
      <Modal
        isOpen={modalState}
        text="Вы точно хотите отправить информацию в профиле на рассмотрение? "
        submitText="Отправить"
        cancelText="Отменить"
        onSubmit={handleProfileUpdate}
        onCancel={toggleModal}
      />
    </div>
  );
};
