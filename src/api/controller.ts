import { IAPIProject } from 'types/entities/project';
import { IAPICompany, IProfileState, IUser } from 'types/interfaces';
import * as fakes from 'utils';
import { aborts } from './aborts';
import { API_ROUTES, DYNAMIC_API_ROUTES } from './config';
import { AuthError } from './errors';
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
  IQueriesRelationsResponse,
  IProjectWithMetadataResponse,
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
    getCompany(userId: number): Promise<IProfileCompanyResponse> {
      const params = DYNAMIC_API_ROUTES.PROFILE_GET_COMPANY(userId);

      return safeFetch(
        params.url,
        params.method,
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
    update(
      data: Partial<IAPICompany>,
      userId: number
    ): Promise<IProfileUpdateResponse> {
      const params = DYNAMIC_API_ROUTES.PROFILE_UPDATE(userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.PROFILE_UPDATE_CONTROLLER,
        data
      );
    },
  },
  project: {
    get(
      id: string,
      userId: number | undefined
    ): Promise<IProjectWithMetadataResponse> {
      if (!userId) throw new AuthError('Данные пользователя не найдены');

      const params = DYNAMIC_API_ROUTES.PROJECT_GET(id, userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.PROJECT_GET_CONTROLLER
      );
    },
    create(
      data: Partial<IAPIProject>,
      userId: number
    ): Promise<IProjectCreateResponse> {
      const params = DYNAMIC_API_ROUTES.PROJECT_CREATE(userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.PROJECT_CREATE_CONTROLLER,
        data
      );
    },
    update(
      data: Partial<IAPIProject>,
      projectId: number,
      userId: number
    ): Promise<IProjectCreateResponse> {
      const params = DYNAMIC_API_ROUTES.PROJECT_UPDATE(projectId, userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.PROJECT_UPDATE_CONTROLLER,
        data
      );
    },
  },
  file: {
    upload(data: FormData, userId: number): Promise<IFileUploadedResponse> {
      const params = DYNAMIC_API_ROUTES.FILE_UPLOAD(userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.FILE_UPLOAD_CONTROLLER,
        data,
        'multipart/form-data'
      );
    },
  },
  queries: {
    fetchCategories(category: string): Promise<IQueriesResponse> {
      const params = DYNAMIC_API_ROUTES.QUERIES_CATEGORIES(category);

      return safeFetch(
        params.url,
        params.method,
        aborts.QUERIES_CATEGORIES_CONTROLLER
      );
    },
    fetchCategoriesRelations(
      parentCategory: string,
      childCategory: string
    ): Promise<IQueriesRelationsResponse> {
      const params = DYNAMIC_API_ROUTES.QUERIES_CATEGORIES_RELATIONS(
        parentCategory,
        childCategory
      );

      return safeFetch(
        params.url,
        params.method,
        aborts.QUERIES_CATEGORIES_CONTROLLER
      );
    },
  },
};
