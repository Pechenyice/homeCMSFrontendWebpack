import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mapProjectFromAPI } from 'utils/entities/project';
import { getProjectKey } from './../keys';

export const useProject = (id: string) => {
  const { addError } = useErrors();
  const { profile, handleLogout } = useAuth();

  const query = useQuery(
    getProjectKey(id),
    () => API.project.get(id, profile?.id),
    {
      onError: (e) => {
        if (e instanceof ServerError) {
          addError('Произошла критическая ошибка при загрузке проекта!');
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
    apiData: query.data?.data ? mapProjectFromAPI(query.data.data) : null,
    isError: query.isError || (query.data?.error ? true : false),
  };
};
