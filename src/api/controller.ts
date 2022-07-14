import { IAPIProject } from 'types/entities/entities';
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
  IProjectResponse,
  IProjectCreateResponse,
  IFileUploadedResponse,
  IQueriesResponse,
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
  project: {
    get(id: string): Promise<IProjectResponse> {
      return safeFetch(
        API_ROUTES.PROJECT_GET.url,
        API_ROUTES.PROJECT_GET.method,
        aborts.PROJECT_GET_CONTROLLER
      );
    },
    create(data: Partial<IAPIProject>): Promise<IProjectCreateResponse> {
      return safeFetch(
        API_ROUTES.PROJECT_CREATE.url,
        API_ROUTES.PROJECT_CREATE.method,
        aborts.PROJECT_CREATE_CONTROLLER,
        data
      );
    },
  },
  file: {
    upload(data: FormData): Promise<IFileUploadedResponse> {
      return safeFetch(
        API_ROUTES.FILE_UPLOAD.url,
        API_ROUTES.FILE_UPLOAD.method,
        aborts.FILE_UPLOAD_CONTROLLER,
        data,
        'multipart/form-data'
      );
    },
  },
  queries: {
    fetchDistricts(): Promise<IQueriesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_DISTRICTS.url,
        API_ROUTES.QUERIES_DISTRICTS.method,
        aborts.QUERIES_DISTRICTS_CONTROLLER
      );
    },
    fetchOrganizationTypes(): Promise<IQueriesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_ORGANIZATION_TYPES.url,
        API_ROUTES.QUERIES_ORGANIZATION_TYPES.method,
        aborts.QUERIES_ORGANIZATION_TYPES_CONTROLLER
      );
    },
    fetchRealisationForCitizen(): Promise<IQueriesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_REALISATION_FOR_CITIZEN.url,
        API_ROUTES.QUERIES_REALISATION_FOR_CITIZEN.method,
        aborts.QUERIES_REALISATION_FOR_CITIZEN_CONTROLLER
      );
    },
    fetchAttractingVolunteer(): Promise<IQueriesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_ATTRACTING_VOLUNTEER.url,
        API_ROUTES.QUERIES_ATTRACTING_VOLUNTEER.method,
        aborts.QUERIES_ATTRACTING_VOLUNTEER_CONTROLLER
      );
    },
    fetchCategories(): Promise<IQueriesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_CATEGORIES.url,
        API_ROUTES.QUERIES_CATEGORIES.method,
        aborts.QUERIES_CATEGORIES_CONTROLLER
      );
    },
    fetchRNSUCategories(): Promise<IQueriesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_RNSU_CATEGORIES.url,
        API_ROUTES.QUERIES_RNSU_CATEGORIES.method,
        aborts.QUERIES_RNSU_CATEGORIES_CONTROLLER
      );
    },
    fetchCircumstancesRecognitionNeed(): Promise<IQueriesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_CIRCUMSTANCES_RECOGNITION_NEED.url,
        API_ROUTES.QUERIES_CIRCUMSTANCES_RECOGNITION_NEED.method,
        aborts.QUERIES_CIRCUMSTANCES_RECOGNITION_NEED_CONTROLLER
      );
    },
    fetchWorksNames(): Promise<IQueriesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_WORKS_NAMES.url,
        API_ROUTES.QUERIES_WORKS_NAMES.method,
        aborts.QUERIES_WORKS_NAMES_CONTROLLER
      );
    },
    fetchTargetGroups(): Promise<IQueriesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_TARGET_GROUPS.url,
        API_ROUTES.QUERIES_TARGET_GROUPS.method,
        aborts.QUERIES_TARGET_GROUPS_CONTROLLER
      );
    },
    fetchStatuses(): Promise<IQueriesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_STATUSES.url,
        API_ROUTES.QUERIES_STATUSES.method,
        aborts.QUERIES_STATUSES_CONTROLLER
      );
    },
    fetchSocialHelpForms(): Promise<IQueriesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_SOCIAL_HELP_FORMS.url,
        API_ROUTES.QUERIES_SOCIAL_HELP_FORMS.method,
        aborts.QUERIES_SOCIAL_HELP_FORMS_CONTROLLER
      );
    },
    fetchKinds(): Promise<IQueriesResponse> {
      return safeFetch(
        API_ROUTES.QUERIES_KINDS.url,
        API_ROUTES.QUERIES_KINDS.method,
        aborts.QUERIES_KINDS_CONTROLLER
      );
    },
  },
};
