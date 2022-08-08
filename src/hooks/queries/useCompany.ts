import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mapCompanyFromAPI } from 'utils/api';
import { getCompanyKey } from './keys';

export const useCompany = (userId: string) => {
  const { addError } = useErrors();
  const { handleLogout } = useAuth();

  const query = useQuery(
    getCompanyKey(userId),
    () => API.profile.getCompany(userId as any),
    {
      onError: (e) => {
        if (e instanceof ServerError) {
          addError(
            'Произошла критическая ошибка при загрузке профиля пользователя!'
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
    apiData: query.data?.data ? mapCompanyFromAPI(query.data.data) : null,
    isError: query.isError || (query.data?.error ? true : false),
  };
};
