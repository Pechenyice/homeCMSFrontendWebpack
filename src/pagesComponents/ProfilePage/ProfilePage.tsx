import {
  Action,
  Checkbox,
  H3,
  Input,
  Skeleton,
  ESkeletonMode,
  Text,
  TextArea,
} from 'components/kit';
import { useAuth, useDistricts, useErrors, useOrganizationTypes } from 'hooks';
import { useEffect, useMemo } from 'react';
import { getValueByIdFromSelect } from 'utils';
import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const { profile, handleLogout } = useAuth();
  const { addError } = useErrors();

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

  const { company } = useMemo(() => profile ?? { company: null }, [profile]);

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

  return (
    <div className={styles.styled}>
      <div className={styles.half}>
        <Input value={company?.name} heading="Краткое наименование организации" readOnly />
        <TextArea value={company?.fullName} heading="Полное наименование организации" readOnly />
        {organizationTypesLoading ? (
          <Skeleton mode={ESkeletonMode.INPUT} withLoader heading="Тип организации" />
        ) : organizationTypesError ? (
          <Input value={''} heading="Тип организации" readOnly />
        ) : (
          <Input
            value={getValueByIdFromSelect(organizationTypes!, company?.type)}
            heading="Тип организации"
            readOnly
          />
        )}
        {districtsLoading ? (
          <Skeleton mode={ESkeletonMode.INPUT} withLoader heading="Район" />
        ) : districtsError ? (
          <Input value={''} heading="Район" readOnly />
        ) : (
          <Input
            value={getValueByIdFromSelect(districts!, company?.district)}
            heading="Район"
            readOnly
          />
        )}
      </div>
      <div className={styles.half}>
        <Input value={company?.supervisor} heading="Руководитель организации" readOnly />
        <Input
          value={company?.responsible}
          heading="Ответственный за предоставление информации"
          readOnly
        />
        <div className={styles.group}>
          <H3>Об организации</H3>
          <Checkbox
            checked={company?.educationLicense}
            readOnly
            label={<Text>Наличие лицензии на осуществление образовательной деятельности</Text>}
          />
          <Checkbox
            checked={company?.medicineLicense}
            readOnly
            label={<Text>Наличие лицензии на осуществление медицинской деятельности</Text>}
          />
          <Checkbox
            checked={company?.innovationGround}
            readOnly
            label={<Text>Наличие инновационной площадки в организации</Text>}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <Action isDeleteMode text="Выйти из аккаунта" onClick={handleLogout} />
      </div>
    </div>
  );
};
