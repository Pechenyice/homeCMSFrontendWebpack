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
import { useAuth, useErrors } from 'hooks';
import { useDistricts } from 'hooks/queries/useDistricts';
import { useOrganizationTypes } from 'hooks/queries/useOrganizationTypes';
import { useEffect, useMemo } from 'react';
import { getValueByIdFromSelect } from 'utils';
import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const { profile, handleLogout } = useAuth();
  const { addError } = useErrors();

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

  const { company } = useMemo(() => profile ?? { company: null }, [profile]);

  const memoizedDistrictsError = useMemo(() => districtsError, [
    districtsError,
  ]);
  const memoizedOrganizationTypesError = useMemo(() => organizationTypesError, [
    organizationTypesError,
  ]);

  useEffect(() => {
    if (memoizedDistrictsError) {
      addError(districtsApiError ?? 'Не удалось загрузить районы!');
    }
    if (memoizedOrganizationTypesError) {
      addError(
        organizationTypesApiError ?? 'Не удалось загрузить типы организаций!'
      );
    }
  }, [memoizedDistrictsError, memoizedOrganizationTypesError]);

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
            <Skeleton mode={ESkeletonMode.INPUT} withLoader heading="Район" />
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

      <div className={styles.footer}>
        <Action isDeleteMode text="Выйти из аккаунта" onClick={handleLogout} />
      </div>
    </div>
  );
};
