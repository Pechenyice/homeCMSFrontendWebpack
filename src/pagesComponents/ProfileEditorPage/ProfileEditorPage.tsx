import { API } from 'api';
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
import { useAuth, useDistricts, useErrors, useOrganizationTypes } from 'hooks';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EProposalStatus } from 'types/enums';
import { IProfileState, IInputsState } from 'types/interfaces';
import { registerInput, textInputValidator, validateAll } from 'utils';
import styles from './ProfileEditorPage.module.scss';

export const ProfileEditorPage = () => {
  const { profile, updateProfile } = useAuth();
  const { addError } = useErrors();
  const navigate = useNavigate();

  const { company } = useMemo(() => profile ?? { company: null }, [profile]);

  const {
    apiData: districts,
    apiErrors: districtsErrors,
    isLoading: districtsLoading,
    isError: districtsError,
  } = useDistricts();
  const {
    apiData: organizationTypes,
    apiErrors: organizationTypesErrors,
    isLoading: organizationTypesLoading,
    isError: organizationTypesError,
  } = useOrganizationTypes();

  const memoizedDistrictsError = useMemo(() => districtsError, [districtsError]);
  const memoizedOrganizationTypesError = useMemo(
    () => organizationTypesError,
    [organizationTypesError]
  );

  useEffect(() => {
    if (memoizedDistrictsError) {
      districtsErrors?.forEach((error) => addError(error));
    }
    if (memoizedOrganizationTypesError) {
      organizationTypesErrors?.forEach((error) => addError(error));
    }
  }, [memoizedDistrictsError, memoizedOrganizationTypesError]);

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
    supervisor: registerInput(company?.supervisor ?? '', textInputValidator),
    responsible: registerInput(company?.responsible ?? '', textInputValidator),
    educationLicense: company?.educationLicense ?? false,
    medicineLicense: company?.medicineLicense ?? false,
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
      const { errors, data } = await API.profile.update(state);

      if (errors) {
        errors.forEach((error) => addError(error));

        setFetchInProgress(false);

        return;
      }

      if (data) {
        updateProfile({
          name: state.name.value,
          fullName: state.fullName.value,
          type: state?.type!,
          district: state?.district!,
          supervisor: state.supervisor.value,
          responsible: state.responsible.value,
          educationLicense: state?.educationLicense!,
          medicineLicense: state?.medicineLicense!,
          innovationGround: state?.innovationGround!,
          status: EProposalStatus.CONFIRMATION,
          cause: null,
        });

        navigate('/profile');
      } else {
        setFetchInProgress(false);
        addError('Не удалось обновить данные профиля!');
      }
    } catch (e) {
      setFetchInProgress(false);
      addError('Произошла критическая ошибка при обновлении данных профиля!');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const [key, value] = [e.target.name, e.target.value];

    const validationResult = (state as unknown as IInputsState)[key].validator(value);

    setState({
      ...state,
      [key]: {
        ...(state as unknown as IInputsState)[key],
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
      [name]: !(state as unknown as IInputsState)[name],
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
      <div className={styles.half}>
        <Input
          name="name"
          value={state.name.value}
          onChange={handleChange}
          error={state.name.error}
          heading="Краткое наименование организации"
        />
        <TextArea
          name="fullName"
          value={state.fullName.value}
          onChange={handleChange}
          error={state.fullName.error}
          heading="Полное наименование организации"
        />
        {organizationTypesLoading ? (
          <Skeleton mode={ESkeletonMode.INPUT} withLoader heading="Тип организации" />
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
        {districtsLoading ? (
          <Skeleton mode={ESkeletonMode.INPUT} withLoader heading="Район" />
        ) : districtsError ? (
          <Input value={''} heading="Район" readOnly />
        ) : (
          <Select
            value={state.district}
            options={districts!}
            heading="Район"
            onChangeOption={bindSelect('district')}
          />
        )}
      </div>
      <div className={styles.half}>
        <Input
          name="supervisor"
          value={state.supervisor.value}
          onChange={handleChange}
          error={state.supervisor.error}
          heading="Руководитель организации"
        />
        <Input
          name="responsible"
          value={state.responsible.value}
          onChange={handleChange}
          error={state.responsible.error}
          heading="Ответственный за предоставление информации"
        />
        <div className={styles.group}>
          <H3>Об организации</H3>
          <Checkbox
            checked={state.educationLicense}
            onToggle={bindCheckToggle('educationLicense')}
            label={<Text>Наличие лицензии на осуществление образовательной деятельности</Text>}
          />
          <Checkbox
            checked={state.medicineLicense}
            onToggle={bindCheckToggle('medicineLicense')}
            label={<Text>Наличие лицензии на осуществление медицинской деятельности</Text>}
          />
          <Checkbox
            checked={state.innovationGround}
            onToggle={bindCheckToggle('innovationGround')}
            label={<Text>Наличие инновационной площадки в организации</Text>}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <Button
          onClick={toggleModal}
          className={styles.footer__button}
          isLoading={districtsLoading || organizationTypesLoading || fetchInProgress}
          disabled={districtsError || organizationTypesError}
        >
          <Text>Отправить на рассмотрение</Text>
        </Button>
        <Action text="Отменить изменения" onClick={() => navigate('/profile')} />
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
