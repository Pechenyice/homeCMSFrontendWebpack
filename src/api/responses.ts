import { ILibraryWord, ILibraryWordList } from 'types/admin/library';
import { IStatisticOrganizationResult } from 'types/admin/statistic';
import { IFullAPIClub } from 'types/entities/club';
import { IFullAPIEducationProgram } from 'types/entities/educationProgram';
import {
  IAPIAdminEntitiesArchiveList,
  IAPIAdminEntitiesList,
  IAPIEntitiesList,
} from 'types/entities/entities';
import { IFullAPIMethodology } from 'types/entities/methodology';
import { IFullAPIProject } from 'types/entities/project';
import { IFullAPISocialWork } from 'types/entities/socialWork';
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

export interface ILibraryWordsResponse extends IResponseError {
  data: ILibraryWordList | null;
}

export interface IStatisticOrganizationResultResponse extends IResponseError {
  data: IStatisticOrganizationResult | null;
}

export interface ILibraryWordGetResponse extends IResponseError {
  data: ILibraryWord | null;
}

export interface ILibraryWordCreateResponse extends IResponseError {
  data: boolean | null;
}

export interface ILibraryWordUpdateResponse extends IResponseError {
  data: boolean | null;
}

export interface ILibraryWordDeleteResponse extends IResponseError {
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

export interface ISocialWorkWithMetadataResponse extends IResponseError {
  data: IFullAPISocialWork | null;
}

export interface IClubWithMetadataResponse extends IResponseError {
  data: IFullAPIClub | null;
}

export interface IMethodologyWithMetadataResponse extends IResponseError {
  data: IFullAPIMethodology | null;
}
