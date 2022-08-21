import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mapClubFromAPI } from 'utils/entities/club';
import { getClubKey } from './../../keys';

export const useClub = (id: string, userId?: number, isAdmin?: boolean) => {
  const { addError } = useErrors();
  const { profile, handleLogout } = useAuth();

  const query = useQuery(
    getClubKey(id, userId),
    () => API.club.get(id, userId || profile?.id, isAdmin),
    {
      onError: (e) => {
        if (e instanceof ServerError) {
          addError('Произошла критическая ошибка при загрузке клуба!');
        } else if (e instanceof AuthError) {
          handleLogout();
        } else if (e instanceof ApiError) {
          addError(e.message);
        }
      },
    }
  );

  return {
    ...query,
    apiError: query.data?.error,
    apiData: query.data?.data ? mapClubFromAPI(query.data.data) : null,
    isError: query.isError || (query.data?.error ? true : false),
  };
};
