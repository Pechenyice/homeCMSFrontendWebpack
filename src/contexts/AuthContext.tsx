import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import UnauthorizedApp from 'apps/UnauthorizedApp/UnauthorizedApp';
import { ErrorsList, InfosList, Preloader } from 'components';
import { useErrors, useInfos } from 'hooks';
import { createContext, FC, useEffect, useState } from 'react';
import { EAuthStatus } from 'types/enums';
import { ICompany, IProfile, IUser } from 'types/interfaces';

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

      const { error, data } = await API.profile.checkAuth();

      if (error) {
        setState((prevState) => ({
          ...state,
          status: EAuthStatus.ERROR,
          profile: null,
          initialCheckIsPending: false,
        }));

        return;
      }

      const companyResponse = await API.profile.getCompany();

      if (companyResponse.error) {
        addError(companyResponse.error);

        setState((prevState) => ({
          ...state,
          status: EAuthStatus.ERROR,
          profile: null,
          initialCheckIsPending: false,
        }));

        return;
      }

      localStorage.setItem('token', data?.token ?? '');

      setState({
        ...state,
        status: EAuthStatus.SUCCESS,
        profile: {
          id: data!.id,
          isAdmin: data!.isAdmin,
          company: companyResponse.data,
        },
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

      if (response.error) {
        addError(response.error);

        setState((prevState) => ({
          ...state,
          status: EAuthStatus.ERROR,
          profile: null,
          initialCheckIsPending: false,
        }));

        return;
      }

      const companyResponse = await API.profile.getCompany();

      if (companyResponse.error) {
        addError(companyResponse.error);

        setState((prevState) => ({
          ...state,
          status: EAuthStatus.ERROR,
          profile: null,
          initialCheckIsPending: false,
        }));

        return;
      }

      localStorage.setItem('token', response.data?.token ?? '');

      setState({
        ...state,
        status: EAuthStatus.SUCCESS,
        profile: {
          id: response.data!.id,
          isAdmin: response.data!.isAdmin,
          company: companyResponse.data,
        },
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

      const { error } = await API.profile.logout();

      if (error) {
        addError(error);

        setState((prevState) => ({
          ...state,
          status: EAuthStatus.SUCCESS,
        }));

        return;
      }

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
