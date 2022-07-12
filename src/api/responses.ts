import { IProjectData } from 'types/entities/entities';
import {
  ISelectValue,
  IProfileData,
  IAPIAuthToken,
  IAPICompany,
  IFileInfo,
} from 'types/interfaces';

export interface IResponseError {
  error: string | null;
}

export interface IProfileCheckAuthResponse extends IResponseError {
  data: IProfileData | null;
}

export interface IProfileLoginResponse extends IResponseError {
  data: {
    user: IProfileData;
    token: IAPIAuthToken;
  } | null;
}

export interface IProfileCompanyResponse extends IResponseError {
  data: IAPICompany | null;
}

export interface IProfileLogoutResponse extends IResponseError {
  data: boolean | null;
}

export interface IProfileUpdateResponse extends IResponseError {
  data: boolean | null;
}

export interface IProjectCreateResponse extends IResponseError {
  data: boolean | null;
}

export interface IProjectResponse extends IResponseError {
  data: IProjectData | null;
}

export interface IFileUploadedResponse extends IResponseError {
  data: IFileInfo | null;
}

export interface IQueriesDistrictsResponse extends IResponseError {
  data: ISelectValue[] | null;
}

export interface IQueriesOrganizationTypesResponse extends IResponseError {
  data: ISelectValue[] | null;
}
