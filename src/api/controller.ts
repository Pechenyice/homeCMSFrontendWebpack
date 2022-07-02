import { IAPICompany, IProfileState, IUser } from 'types/interfaces';
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
      return safeFetch(
        API_ROUTES.PROFILE_GET_COMPANY.url,
        API_ROUTES.PROFILE_GET_COMPANY.method,
        aborts.PROFILE_GET_COMPANY_CONTROLLER
      );
    },
    logout(): Promise<IProfileLogoutResponse> {
      return safeFetch(
        API_ROUTES.PROFILE_LOGOUT.url,
        API_ROUTES.PROFILE_LOGOUT.method,
        aborts.PROFILE_LOGOUT_CONTROLLER
      );
    },
    update(data: Partial<IAPICompany>): Promise<IProfileUpdateResponse> {
      return safeFetch(
        API_ROUTES.PROFILE_UPDATE.url,
        API_ROUTES.PROFILE_UPDATE.method,
        aborts.PROFILE_UPDATE_CONTROLLER,
        data
      );
    },
  },
  queries: {
    fetchProject(id: string): Promise<IQueriesProjectResponse> {
      return safeFetch(
        API_ROUTES.PROJECT.url,
        API_ROUTES.PROJECT.method,
        aborts.PROJECT_GET_CONTROLLER
      );
    },

    fetchDistricts(): Promise<IQueriesDistrictsResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_DISTRICTS.url,
        API_ROUTES.QUERIES_DISTRICTS.method,
        aborts.QUERIES_DISTRICTS_CONTROLLER
      );
    },
    fetchOrganizationTypes(): Promise<IQueriesOrganizationTypesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_ORGANIZATION_TYPES.url,
        API_ROUTES.QUERIES_ORGANIZATION_TYPES.method,
        aborts.QUERIES_ORGANIZATION_TYPES_CONTROLLER
      );
    },
  },
};
