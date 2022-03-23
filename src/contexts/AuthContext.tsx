import { API } from 'api';
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

      const { errors, data } = await API.profile.checkAuth();

      if (errors) {
        errors.forEach((error) => addError(error));

        setState((prevState) => ({
          ...state,
          status: EAuthStatus.ERROR,
          profile: null,
          initialCheckIsPending: false,
        }));

        return;
      }

      setState((prevState) => ({
        ...state,
        status: EAuthStatus.SUCCESS,
        profile: data,
        initialCheckIsPending: false,
      }));
    } catch (e) {
      addError('Произошла ошибка при проверке подлинности пользователя. Попробуйте позже.');
    }
  };

  const internalLogin = async (data: IUser) => {
    try {
      setState({
        ...state,
        status: EAuthStatus.PENDING,
      });

      const response = await API.profile.login(data);

      if (response.errors) {
        response.errors.forEach((error) => addError(error));

        setState((prevState) => ({
          ...state,
          status: EAuthStatus.ERROR,
          profile: null,
          initialCheckIsPending: false,
        }));

        return;
      }

      setState({ ...state, status: EAuthStatus.SUCCESS, profile: response.data });
    } catch (e) {
      addError('Произошла ошибка при входе в аккаунт. Попробуйте позже.');
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

      const { errors } = await API.profile.logout();

      if (errors) {
        errors.forEach((error) => addError(error));

        setState((prevState) => ({
          ...state,
          status: EAuthStatus.SUCCESS,
        }));

        return;
      }

      setState({ ...state, status: EAuthStatus.ERROR, profile: null });
    } catch (e) {
      addError('Произошла критическая ошибка при выходе из аккаунта. Попробуйте позже.');
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
