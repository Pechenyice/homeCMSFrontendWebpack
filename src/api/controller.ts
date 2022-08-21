import { IAPIProject } from 'types/entities/project';
import { IAPICompany, IProfileState, IUser } from 'types/interfaces';
import * as fakes from 'utils';
import { aborts } from './aborts';
import { API_ROUTES, DYNAMIC_API_ROUTES } from './config';
import { EDUCATION_PROGRAM_CONTROLLER } from './entities/educationProgram';
import { PROJECT_CONTROLLER } from './entities/project';
import { SOCIAL_WORK_CONTROLLER } from './entities/socialWork';
import { AuthError } from './errors';
import {
  IProfileCheckAuthResponse,
  IProfileCompanyResponse,
  IProfileLoginResponse,
  IProfileLogoutResponse,
  IProfileUpdateResponse,
  IFileUploadedResponse,
  IQueriesResponse,
  IQueriesRelationsResponse,
  ICompaniesAdminListResponse,
  ICompanyStatusResponse,
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
  company: {
    reject(userId: number, cause: string): Promise<ICompanyStatusResponse> {
      const params = DYNAMIC_API_ROUTES.ADMIN.COMPANY_REJECT(userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.COMPANY_REJECT_CONTROLLER,
        { comment: cause }
      );
    },
    approve(userId: number): Promise<ICompanyStatusResponse> {
      const params = DYNAMIC_API_ROUTES.ADMIN.COMPANY_APPROVE(userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.COMPANY_APPROVE_CONTROLLER
      );
    },
    getAdminList(
      page: number,
      limit: number,
      queryParams: { [key: string]: string }
    ): Promise<ICompaniesAdminListResponse> {
      const params = DYNAMIC_API_ROUTES.ADMIN.COMPANY_GET_ADMIN_LIST(
        page,
        limit,
        queryParams
      );

      return safeFetch(
        params.url,
        params.method,
        aborts.COMPANY_GET_LIST_CONTROLLER
      );
    },
    download(userId: number): Promise<any> {
      const params = DYNAMIC_API_ROUTES.COMPANY_DOWNLOAD(userId);

      return safeFetch(
        params.url,
        params.method,
        aborts.COMPANY_DOWNLOAD_CONTROLLER,
        {},
        'application/pdf'
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
    fetchYears(): Promise<IQueriesResponse> {
      const params = API_ROUTES.QUERIES_YEARS;

      return safeFetch(
        params.url,
        params.method,
        aborts.QUERIES_YEARS_CONTROLLER
      );
    },
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

  // entities
  // TODO: can be abstracted to one line generation with TS Generic generateController<IEntityWithMetadataResponse, IAPIEntity>(EEntity)
  project: PROJECT_CONTROLLER,
  educationProgram: EDUCATION_PROGRAM_CONTROLLER,
  socialWork: SOCIAL_WORK_CONTROLLER,
};
