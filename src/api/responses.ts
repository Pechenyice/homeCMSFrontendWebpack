import { IAPIEntitiesList } from 'types/entities/entities';
import { IFullAPIProject, IProjectData } from 'types/entities/project';
import {
  ISelectValue,
  IAPIProfileData,
  IAPIAuthToken,
  IAPICompany,
  ISelectRelations,
  IAPIFileInfo,
} from 'types/interfaces';

export interface IResponseError {
  error: string | null;
}

export interface IProfileCheckAuthResponse extends IResponseError {
  data: IAPIProfileData | null;
}

export interface IProfileLoginResponse extends IResponseError {
  data: {
    user: IAPIProfileData;
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
  data: IAPIFileInfo | null;
}

export interface IQueriesResponse extends IResponseError {
  data: ISelectValue[] | null;
}

export interface IQueriesRelationsResponse extends IResponseError {
  data: ISelectRelations | null;
}

export interface IProjectWithMetadataResponse extends IResponseError {
  data: IFullAPIProject | null;
}

export interface IProjectsListResponse extends IResponseError {
  data: IAPIEntitiesList | null;
}
