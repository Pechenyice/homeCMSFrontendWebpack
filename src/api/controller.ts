import { IProfileState, IUser } from 'types/interfaces';
import * as fakes from 'utils';
import {
  IProfileCheckAuthResponse,
  IProfileLoginResponse,
  IProfileLogoutResponse,
  IProfileUpdateResponse,
  IQueriesDistrictsResponse,
  IQueriesOrganizationTypesResponse,
} from './responses';
import { safeFetch } from './wrapper';

export const API = {
  profile: {
    checkAuth(): Promise<IProfileCheckAuthResponse> {
      return fakes.checkAuth(1000);
      //   return safeFetch(
      //     constructUrl("/check_auth"),
      //     "POST",
      //     aborts.CHECK_AUTH_CONTROLLER
      //   );
    },
    login({ login, password }: IUser): Promise<IProfileLoginResponse> {
      return fakes.checkUser(login, password, 1000);
    },
    logout(): Promise<IProfileLogoutResponse> {
      return fakes.logoutUser(1000);
    },
    update(data: IProfileState): Promise<IProfileUpdateResponse> {
      return fakes.updateUser(1000);
    },
  },
  queries: {
    fetchDistricts(): Promise<IQueriesDistrictsResponse> {
      return fakes.fetchDistricts(5000);
    },
    fetchOrganizationTypes(): Promise<IQueriesOrganizationTypesResponse> {
      return fakes.fetchOrganizationTypes(3000);
    },
  },
};
