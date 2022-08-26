import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mapMethodologyFromAPI } from 'utils/entities/methodology';
import { getMethodologyKey } from './../../keys';

export const useMethodology = (
  id: string,
  userId?: number,
  isAdmin?: boolean
) => {
  const { addError } = useErrors();
  const { profile, handleLogout } = useAuth();

  const query = useQuery(
    getMethodologyKey(id, userId),
    () => API.methodology.get(id, userId || profile?.id, isAdmin),
    {
      onError: (e) => {
        if (e instanceof ServerError) {
          addError(
            'Произошла критическая ошибка при загрузке методики и технологии!'
          );
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
    apiData: query.data?.data ? mapMethodologyFromAPI(query.data.data) : null,
    isError: query.isError || (query.data?.error ? true : false),
  };
};
