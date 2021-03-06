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
import { useAuth, useDistricts, useErrors, useOrganizationTypes } from 'hooks';
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
      addError('?????????????????? ???????? ???? ????????????????????????');
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

      const { data } = await API.profile.update(
        mapCompanyToAPI(stateValues as ICompany, true)
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
        addError('?????????????????? ?????????????????????? ???????????? ?????? ???????????????????? ???????????? ??????????????!');
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
      <div className={styles.half}>
        <Input
          name="name"
          value={state.name.value}
          onChange={handleChange}
          error={state.name.error}
          heading="?????????????? ???????????????????????? ??????????????????????"
        />
        <TextArea
          name="fullName"
          value={state.fullName.value}
          onChange={handleChange}
          error={state.fullName.error}
          heading="???????????? ???????????????????????? ??????????????????????"
        />
        {organizationTypesLoading ? (
          <Skeleton
            mode={ESkeletonMode.INPUT}
            withLoader
            heading="?????? ??????????????????????"
          />
        ) : organizationTypesError ? (
          <Input value={''} heading="?????? ??????????????????????" readOnly />
        ) : (
          <Select
            value={state.type}
            options={organizationTypes!}
            heading="?????? ??????????????????????"
            onChangeOption={bindSelect('type')}
          />
        )}
        {districtsLoading ? (
          <Skeleton mode={ESkeletonMode.INPUT} withLoader heading="??????????" />
        ) : districtsError ? (
          <Input
            value={''}
            heading="???????????????????????????????? ??????, ?????????????????????????? ???????????? ?????? ???? ??????"
            readOnly
          />
        ) : (
          <Select
            value={state.district}
            options={districts!}
            heading="???????????????????????????????? ??????, ?????????????????????????? ???????????? ?????? ???? ??????"
            onChangeOption={bindSelect('district')}
          />
        )}
        <Input
          name="link"
          value={state.link.value}
          onChange={handleChange}
          error={state.link.error}
          heading="???????????? ???? ?????????????????????? ???????? ??????????????????????"
        />
        <Input
          name="phoneNumber"
          value={state.phoneNumber.value}
          onChange={handleChange}
          error={state.phoneNumber.error}
        />
        <Input
          name="email"
          value={state.email.value}
          onChange={handleChange}
          error={state.email.error}
          heading="?????????????????????? ?????????? ??????????????????????"
        />
        <Input
          name="supervisor"
          value={state.supervisor.value}
          onChange={handleChange}
          error={state.supervisor.error}
          heading="???????????????????????? ??????????????????????"
        />
      </div>
      <div className={styles.half}>
        <Input
          name="responsible"
          value={state.responsible.value}
          onChange={handleChange}
          error={state.responsible.error}
          heading="?????????????????????????? ???? ???????????????????????????? ????????????????????"
        />
        <Input
          name="responsiblePhoneNumber"
          value={state.responsiblePhoneNumber.value}
          onChange={handleChange}
          error={state.responsiblePhoneNumber.error}
          heading="?????????????? ???????????????????????????? ???? ???????????????????????????? ????????????????????"
        />
        <div className={styles.group}>
          <H3>???? ??????????????????????</H3>

          <Checkbox
            checked={state.educationLicense}
            onToggle={bindCheckToggle('educationLicense')}
            label={
              <Text>
                ?????????????? ???????????????? ???? ?????????????????????????? ?????????????????????????????? ????????????????????????
              </Text>
            }
          />
          {state.educationLicense && (
            <>
              <Input
                name="educationLicenseNumber"
                value={state.educationLicenseNumber.value}
                onChange={handleChange}
                error={state.educationLicenseNumber.error}
                heading="?????????? ???????????????? ???? ?????????????????????????? ?????????????????????????????? ????????????????????????"
              />
              <Input
                name="educationLicenseDate"
                value={state.educationLicenseDate.value}
                onChange={handleChange}
                error={state.educationLicenseDate.error}
                heading="???????? ???????????? ????????????????"
              />
              <Input
                name="educationLicenseKind"
                value={state.educationLicenseKind.value}
                onChange={handleChange}
                error={state.educationLicenseKind.error}
                heading="?????? ????????????????????????"
              />
            </>
          )}

          <Checkbox
            checked={state.medicineLicense}
            onToggle={bindCheckToggle('medicineLicense')}
            label={
              <Text>
                ?????????????? ???????????????? ???? ?????????????????????????? ?????????????????????? ????????????????????????
              </Text>
            }
          />
          {state.medicineLicense && (
            <>
              <Input
                name="medicineLicenseNumber"
                value={state.medicineLicenseNumber.value}
                onChange={handleChange}
                error={state.medicineLicenseNumber.error}
                heading="?????????? ???????????????? ???? ?????????????????????????? ?????????????????????? ????????????????????????"
              />
              <Input
                name="medicineLicenseDate"
                value={state.medicineLicenseDate.value}
                onChange={handleChange}
                error={state.medicineLicenseDate.error}
                heading="???????? ???????????? ????????????????"
              />
            </>
          )}

          <Checkbox
            checked={state.innovationGround}
            onToggle={bindCheckToggle('innovationGround')}
            label={<Text>?????????????? ?????????????????????????? ???????????????? ?? ??????????????????????</Text>}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <Button
          onClick={toggleModal}
          className={styles.footer__button}
          isLoading={
            districtsLoading || organizationTypesLoading || fetchInProgress
          }
          disabled={districtsError || organizationTypesError}
        >
          <Text>?????????????????? ???? ????????????????????????</Text>
        </Button>
        <Action
          text="???????????????? ??????????????????"
          onClick={() => navigate('/profile')}
        />
      </div>
      <Modal
        isOpen={modalState}
        text="???? ?????????? ???????????? ?????????????????? ???????????????????? ?? ?????????????? ???? ????????????????????????? "
        submitText="??????????????????"
        cancelText="????????????????"
        onSubmit={handleProfileUpdate}
        onCancel={toggleModal}
      />
    </div>
  );
};
