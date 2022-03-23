import { IProfile, ISelectValue } from 'types/interfaces';

export interface IResponseError {
  errors: string[] | null;
}

export interface IProfileCheckAuthResponse extends IResponseError {
  data: IProfile | null;
}

export interface IProfileLoginResponse extends IResponseError {
  data: IProfile | null;
}

export interface IProfileLogoutResponse extends IResponseError {
  data: boolean | null;
}

export interface IProfileUpdateResponse extends IResponseError {
  data: boolean | null;
}

export interface IQueriesDistrictsResponse extends IResponseError {
  data: ISelectValue[] | null;
}

export interface IQueriesOrganizationTypesResponse extends IResponseError {
  data: ISelectValue[] | null;
}
