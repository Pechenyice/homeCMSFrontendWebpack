import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mapSocialWorkFromAPI } from 'utils/entities/socialWork';
import { getSocialWorkKey } from './../../keys';

export const useSocialWork = (
  id: string,
  userId?: number,
  isAdmin?: boolean
) => {
  const { addError } = useErrors();
  const { profile, handleLogout } = useAuth();

  const query = useQuery(
    getSocialWorkKey(id, userId),
    () => API.socialWork.get(id, userId || profile?.id, isAdmin),
    {
      onError: (e) => {
        if (e instanceof ServerError) {
          addError(
            'Произошла критическая ошибка при загрузке программы по соц. работе!'
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
    apiData: query.data?.data ? mapSocialWorkFromAPI(query.data.data) : null,
    isError: query.isError || (query.data?.error ? true : false),
  };
};
