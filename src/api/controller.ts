import { ILibraryWord } from 'types/admin/library';
import { IAPIProject } from 'types/entities/project';
import { IAPICompany, IProfileState, IUser } from 'types/interfaces';
import * as fakes from 'utils';
import { aborts } from './aborts';
import { API_ROUTES, DYNAMIC_API_ROUTES } from './config';
import { CLUB_CONTROLLER } from './entities/club';
import { EDUCATION_PROGRAM_CONTROLLER } from './entities/educationProgram';
import { METHODOLOGY_CONTROLLER } from './entities/methodology';
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
  ILibraryWordsResponse,
  ILibraryWordCreateResponse,
  ILibraryWordUpdateResponse,
  ILibraryWordDeleteResponse,
  ILibraryWordGetResponse,
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
  admin: {
    library: {
      getList(
        page: number,
        limit: number,
        queryParams: { [key: string]: string }
      ): Promise<ILibraryWordsResponse> {
        const params = DYNAMIC_API_ROUTES.ADMIN.LIBRARY.GET_LIST(
          page,
          limit,
          queryParams
        );

        return safeFetch(
          params.url,
          params.method,
          aborts.LIBRARY_GET_LIST_CONTROLLER
        );
      },
      get(id: number): Promise<ILibraryWordGetResponse> {
        const params = DYNAMIC_API_ROUTES.ADMIN.LIBRARY.GET(id);

        return safeFetch(
          params.url,
          params.method,
          aborts.LIBRARY_GET_CONTROLLER
        );
      },
      //without id
      create(data: Partial<ILibraryWord>): Promise<ILibraryWordCreateResponse> {
        const params = DYNAMIC_API_ROUTES.ADMIN.LIBRARY.CREATE();

        return safeFetch(
          params.url,
          params.method,
          aborts.LIBRARY_CREATE_CONTROLLER,
          data
        );
      },
      //without id
      update(
        data: Partial<ILibraryWord>,
        id: number
      ): Promise<ILibraryWordUpdateResponse> {
        const params = DYNAMIC_API_ROUTES.ADMIN.LIBRARY.UPDATE(id);

        return safeFetch(
          params.url,
          params.method,
          aborts.LIBRARY_UPDATE_CONTROLLER,
          data
        );
      },
      delete(id: number): Promise<ILibraryWordDeleteResponse> {
        const params = DYNAMIC_API_ROUTES.ADMIN.LIBRARY.DELETE(id);

        return safeFetch(
          params.url,
          params.method,
          aborts.LIBRARY_DELETE_CONTROLLER
        );
      },
    },
  },

  // entities
  // TODO: can be abstracted to one line generation with TS Generic generateController<IEntityWithMetadataResponse, IAPIEntity>(EEntity)
  project: PROJECT_CONTROLLER,
  educationProgram: EDUCATION_PROGRAM_CONTROLLER,
  socialWork: SOCIAL_WORK_CONTROLLER,
  club: CLUB_CONTROLLER,
  methodology: METHODOLOGY_CONTROLLER,
};
