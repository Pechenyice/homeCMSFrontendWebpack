import { API } from 'api';
import { useErrors } from 'hooks';
import { useQuery } from 'react-query';
import { districtsKey } from './keys';

export const useDistricts = () => {
  const { addError } = useErrors();

  const query = useQuery(districtsKey, API.queries.fetchDistricts, {
    onError: () => addError('Произошла критическая ошибка при загрузке районов!'),
  });

  return {
    ...query,
    apiErrors: query.data?.errors,
    apiData: query.data?.data,
    isError: query.isError || (query.data?.errors?.length ? true : false),
  };
};
