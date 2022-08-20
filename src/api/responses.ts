import { IFullAPIEducationProgram } from 'types/entities/educationProgram';
import {
  IAPIAdminEntitiesArchiveList,
  IAPIAdminEntitiesList,
  IAPIEntitiesList,
} from 'types/entities/entities';
import { IFullAPIProject } from 'types/entities/project';
import {
  ISelectValue,
  IAPIProfileData,
  IAPIAuthToken,
  IAPICompany,
  ISelectRelations,
  IAPIFileInfo,
  IAPIAdminCompaniesList,
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

export interface IEntityCreateResponse extends IResponseError {
  data: boolean | null;
}

export interface IEntityApproveResponse extends IResponseError {
  data: boolean | null;
}

export interface IEntityRejectResponse extends IResponseError {
  data: boolean | null;
}

export interface IEntityUpdateResponse extends IResponseError {
  data: boolean | null;
}

export interface IEntityRestoreResponse extends IResponseError {
  data: null;
}

export interface IEntityDeleteResponse extends IResponseError {
  data: null;
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

export interface IEntitiesListResponse extends IResponseError {
  data: IAPIEntitiesList | null;
}

export interface IEntitiesAdminListResponse extends IResponseError {
  data: IAPIAdminEntitiesList | null;
}

export interface IEntitiesAdminArchiveListResponse extends IResponseError {
  data: IAPIAdminEntitiesArchiveList | null;
}

export interface ICompaniesAdminListResponse extends IResponseError {
  data: IAPIAdminCompaniesList | null;
}

export interface ICompanyStatusResponse extends IResponseError {
  data: boolean | null;
}

/**
 *
 *
 * entities
 *
 *
 */

export interface IProjectWithMetadataResponse extends IResponseError {
  data: IFullAPIProject | null;
}

export interface IEducationProgramWithMetadataResponse extends IResponseError {
  data: IFullAPIEducationProgram | null;
}
