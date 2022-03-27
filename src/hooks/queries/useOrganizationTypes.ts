import { API } from 'api';
import { useErrors } from 'hooks';
import { useQuery } from 'react-query';
import { organizationTypesKey } from './keys';

export const useOrganizationTypes = () => {
  const { addError } = useErrors();

  const query = useQuery(
    organizationTypesKey,
    API.queries.fetchOrganizationTypes,
    {
      onError: () =>
        addError(
          'Произошла критическая ошибка при загрузке типов организаций!'
        ),
    }
  );

  return {
    ...query,
    apiError: query.data?.error,
    apiData: query.data?.data,
    isError: query.isError || (query.data?.error ? true : false),
  };
};
