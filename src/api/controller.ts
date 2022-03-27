import { IProfileState, IUser } from 'types/interfaces';
import * as fakes from 'utils';
import { aborts } from './aborts';
import API_ROUTES from './config';
import {
  IProfileCheckAuthResponse,
  IProfileCompanyResponse,
  IProfileLoginResponse,
  IProfileLogoutResponse,
  IProfileUpdateResponse,
  IQueriesDistrictsResponse,
  IQueriesOrganizationTypesResponse,
} from './responses';
import { safeFetch } from './wrapper';

export const API = {
  profile: {
    checkAuth(): Promise<IProfileCheckAuthResponse> {
      return safeFetch(
        API_ROUTES.PROFILE_AUTH_CHECK.url,
        API_ROUTES.PROFILE_AUTH_CHECK.method,
        aborts.PROFILE_AUTH_CHECK
      );
    },
    login({ login, password }: IUser): Promise<IProfileLoginResponse> {
      return safeFetch(
        API_ROUTES.PROFILE_LOGIN.url,
        API_ROUTES.PROFILE_LOGIN.method,
        aborts.PROFILE_LOGIN_CONTROLLER,
        { login, password }
      );
    },
    getCompany(): Promise<IProfileCompanyResponse> {
      return fakes.getCompany(1000);
    },
    logout(): Promise<IProfileLogoutResponse> {
      return fakes.logoutUser(1000);
    },
    update(data: IProfileState): Promise<IProfileUpdateResponse> {
      return fakes.updateUser(1000);
    },
  },
  queries: {
    fetchDistricts(): Promise<IQueriesDistrictsResponse> {
      return fakes.fetchDistricts(5000);
    },
    fetchOrganizationTypes(): Promise<IQueriesOrganizationTypesResponse> {
      return fakes.fetchOrganizationTypes(3000);
    },
  },
};
