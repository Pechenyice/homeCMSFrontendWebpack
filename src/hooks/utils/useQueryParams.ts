import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';

export const useQueryParams = () => {
  const { search } = useLocation();

  return useMemo(() => qs.parse(search), [search]);
};
