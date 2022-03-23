import { AuthContext } from 'contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { EAuthStatus } from 'types/enums';

export const useAuth = () => {
  const {
    status,
    profile,
    handleLogin,
    handleLogout,
    handleCheckAuth,
    initialCheckIsPending,
    updateProfile,
  } = useContext(AuthContext);

  const interlayer = {
    isPending: status === EAuthStatus.PENDING,
    isError: status === EAuthStatus.ERROR,
    isSuccess: status === EAuthStatus.SUCCESS,
    isAuthenticated: profile ? profile && status === EAuthStatus.SUCCESS : false,
    isAdmin: profile ? profile && profile.isAdmin : false,
  };

  return {
    status,
    profile,
    initialCheckIsPending,
    handleLogin,
    handleLogout,
    handleCheckAuth,
    updateProfile,
    ...interlayer,
  };
};
