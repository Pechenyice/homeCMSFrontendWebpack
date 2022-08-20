import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { IAPIAdminCompaniesList } from 'types/interfaces';

export const useAdminCompanies = () => {
  const { addError } = useErrors();
  const { handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [companies, setCompanies] = useState<IAPIAdminCompaniesList>({
    items: [],
    total: 0,
  });

  const params = useQueryParams();

  const getCompanies = async (
    page: number,
    limit: number,
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let companies;

    try {
      companies = await API.company.getAdminList(
        page,
        limit,
        lockedParams || (params as any)
      );

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при загрузке организаций!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }

    if (!companies?.data) {
      addError('Не удалось получить организации');
      return;
    }

    setCompanies(companies.data);
  };

  return { companies, isLoading, getCompanies };
};
