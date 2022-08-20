import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mapProjectFromAPI } from 'utils/entities/project';
import { getEntitiesYearsKey } from './keys';

export const useEntitiesYears = () => {
  const { addError } = useErrors();
  const { profile, handleLogout } = useAuth();

  const query = useQuery(getEntitiesYearsKey, () => API.queries.fetchYears(), {
    onError: (e) => {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при загрузке отчетных периодов!'
        );
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    },
  });

  return {
    ...query,
    apiError: query.data?.error,
    apiData: query.data?.data,
    isError: query.isError || (query.data?.error ? true : false),
  };
};
