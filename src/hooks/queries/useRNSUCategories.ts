import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { rnsuCategoriesKey } from './keys';

export const useRNSUCategories = () => {
  const { addError } = useErrors();
  const { handleLogout } = useAuth();

  const query = useQuery(rnsuCategoriesKey, API.queries.fetchRNSUCategories, {
    onError: (e) => {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при загрузке категорий РНСУ!');
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
