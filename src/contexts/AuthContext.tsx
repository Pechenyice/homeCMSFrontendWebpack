import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import UnauthorizedApp from 'apps/UnauthorizedApp/UnauthorizedApp';
import { ErrorsList, InfosList, Preloader } from 'components';
import { useErrors, useInfos } from 'hooks';
import { createContext, FC, useEffect, useState } from 'react';
import { EAuthStatus } from 'types/enums';
import { ICompany, IProfile, IUser } from 'types/interfaces';
import { mapCompanyFromAPI } from 'utils/api';

export interface IAuthContextValues {
  handleLogin: (data: IUser) => void;
  handleLogout: () => void;
  handleCheckAuth: () => void;
  updateProfile: (company: ICompany) => void;
  status: EAuthStatus;
  profile: IProfile | null;
  initialCheckIsPending: boolean;
}

export const AuthContext = createContext({} as IAuthContextValues);

export const AuthProvider: FC = ({ children }) => {
  const [state, setState] = useState<
    Pick<IAuthContextValues, 'status' | 'profile' | 'initialCheckIsPending'>
  >({
    status: EAuthStatus.PENDING,
    profile: null,
    initialCheckIsPending: true,
  });

  const { addError, removeAllErrors } = useErrors();
  const { removeAllInfos } = useInfos();

  const updateProfile = (company: ICompany) => {
    setState({ ...state, profile: { ...state.profile!, company } });
  };

  const internalAuthCheck = async () => {
    try {
      setState({
        ...state,
        status: EAuthStatus.PENDING,
      });

      const { data } = await API.profile.checkAuth();

      if (!data?.id) throw new AuthError('Не удалось подтвердить пользователя');

      const companyResponse = await API.profile.getCompany(data.id);

      const formedResponse = mapCompanyFromAPI(companyResponse.data!);

      setState({
        ...state,
        status: EAuthStatus.SUCCESS,
        profile: {
          id: data!.id,
          isAdmin: data!.isAdmin,
          login: data!.login,
          company: formedResponse,
        },
        initialCheckIsPending: false,
      });
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла ошибка при проверке подлинности пользователя. Попробуйте позже.'
        );
      } else if (e instanceof AuthError) {
        setState((prevState) => ({
          ...state,
          status: EAuthStatus.ERROR,
          profile: null,
          initialCheckIsPending: false,
        }));
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
  };

  const internalLogin = async (data: IUser) => {
    try {
      setState({
        ...state,
        status: EAuthStatus.PENDING,
      });

      const response = await API.profile.login(data);

      if (!response.data)
        throw new AuthError('Не удалось аутентифицировать пользователя');

      localStorage.setItem('token', response.data?.token.value ?? '');

      const companyResponse = await API.profile.getCompany(
        response.data.user.id
      );

      const formedResponse = mapCompanyFromAPI(companyResponse.data!);

      setState({
        ...state,
        status: EAuthStatus.SUCCESS,
        profile: {
          id: response.data!.user.id,
          isAdmin: response.data!.user.isAdmin,
          login: response.data!.user.login,
          company: formedResponse,
        },
        initialCheckIsPending: false,
      });
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла ошибка при входе в аккаунт. Попробуйте позже.');
      } else if (e instanceof AuthError) {
        setState((prevState) => ({
          ...state,
          status: EAuthStatus.ERROR,
          profile: null,
          initialCheckIsPending: false,
        }));
      } else if (e instanceof ApiError) {
        setState((prevState) => ({
          ...state,
          status: EAuthStatus.ERROR,
          profile: null,
          initialCheckIsPending: false,
        }));
        addError(e.message);
      }
    }
  };

  const internalLogout = async () => {
    try {
      setState({
        ...state,
        status: EAuthStatus.PENDING,
      });

      removeAllErrors();
      removeAllInfos();

      /**
       * TODO: check if need API here
       * const { error } = await API.profile.logout();
       */

      localStorage.removeItem('token');

      setState({ ...state, status: EAuthStatus.ERROR, profile: null });
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при выходе из аккаунта. Попробуйте позже.'
        );
      } else if (e instanceof AuthError) {
        setState((prevState) => ({
          ...state,
          status: EAuthStatus.ERROR,
          profile: null,
        }));
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
  };

  useEffect(() => {
    internalAuthCheck();
  }, []);

  const handleLogin = (data: IUser) => {
    internalLogin(data);
  };

  const handleLogout = () => {
    internalLogout();
  };

  const handleCheckAuth = () => {
    internalAuthCheck();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        handleLogin,
        handleLogout,
        handleCheckAuth,
        updateProfile,
      }}
    >
      {state.status === EAuthStatus.PENDING ? (
        <Preloader />
      ) : state.status === EAuthStatus.ERROR ? (
        <>
          <UnauthorizedApp />
        </>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
