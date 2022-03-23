import {
  API,
  IProfileCheckAuthResponse,
  IProfileLoginResponse,
  IProfileLogoutResponse,
  IProfileUpdateResponse,
  IQueriesDistrictsResponse,
  IQueriesOrganizationTypesResponse,
} from 'api';
import { IProfile, IUser } from 'types/interfaces';

export const FakeUser: IProfile = {
  id: 1,
  login: 'test',
  isAdmin: false,
  company: {
    name: 'test',
    fullName: 'test',
    type: 1,
    district: 0,
    educationLicense: true,
    medicineLicense: false,
    innovationGround: true,
    supervisor: 'test',
    responsible: 'test',
    status: 2,
    cause: 'wow',
  },
};

export async function checkAuth(ms: number): Promise<IProfileCheckAuthResponse> {
  return new Promise((resolve) => setTimeout(() => resolve({ errors: [], data: null }), ms));
}

export async function checkUser(
  login: IUser['login'],
  password: IUser['password'],
  ms: number
): Promise<IProfileLoginResponse> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          login === 'test' && password === 'test'
            ? { errors: null, data: FakeUser }
            : { errors: ['Такого пользователя не существует!'], data: null }
        ),
      ms
    )
  );
}

export async function logoutUser(ms: number): Promise<IProfileLogoutResponse> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          true
            ? { errors: null, data: true }
            : { errors: ['Сейчас нельзя выйти из аккаунта!'], data: null }
        ),
      ms
    )
  );
}

export async function fetchDistricts(ms: number): Promise<IQueriesDistrictsResponse> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          true
            ? {
                errors: null,
                data: [
                  { id: 0, value: 'test' },
                  { id: 1, value: 'new test' },
                ],
              }
            : { errors: ['Ошибка во время загрузки районов!'], data: null }
        ),
      ms
    )
  );
}

export async function fetchOrganizationTypes(
  ms: number
): Promise<IQueriesOrganizationTypesResponse> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          true
            ? {
                errors: null,
                data: [
                  { id: 0, value: 'test' },
                  { id: 1, value: 'new test' },
                ],
              }
            : { errors: ['Ошибка во время загрузки типов организаций!'], data: null }
        ),
      ms
    )
  );
}

export async function updateUser(ms: number): Promise<IProfileUpdateResponse> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          true
            ? { errors: null, data: true }
            : { errors: ['Не удалось обновить данные профиля!'], data: false }
        ),
      ms
    )
  );
}
