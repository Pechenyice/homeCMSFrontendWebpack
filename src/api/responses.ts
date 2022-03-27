import { IProfile, ICompany, ISelectValue } from 'types/interfaces';

export interface IResponseError {
  error: string | null;
}

export interface IProfileCheckAuthResponse extends IResponseError {
  data: {
    token: string;
    id: number;
    isAdmin: boolean;
  } | null;
}

export interface IProfileLoginResponse extends IResponseError {
  data: {
    token: string;
    id: number;
    isAdmin: boolean;
  } | null;
}

export interface IProfileCompanyResponse extends IResponseError {
  data: ICompany | null;
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
