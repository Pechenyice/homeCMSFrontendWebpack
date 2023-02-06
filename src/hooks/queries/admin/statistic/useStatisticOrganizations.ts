import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { ILibraryWordList } from 'types/admin/library';
import { IStatisticOrganizationResult } from 'types/admin/statistic';
import {
  IAPIAdminEntitiesArchiveList,
  IAPIAdminEntitiesList,
} from 'types/entities/entities';

export const useStatisticOrganizations = () => {
  const { addError } = useErrors();
  const { handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [
    statisticOrganizations,
    setStatisticOrganizations,
  ] = useState<IStatisticOrganizationResult>({
    companies: [],
    meta: {
      social_project: { count: 0, member_count: 0 },
      club: { count: 0, member_count: 0 },
      edu_program: { count: 0, member_count: 0 },
      social_work: { count: 0, member_count: 0 },
      methodology: { count: 0, member_count: 0 },
    },
  });

  const getStatisticOrganizations = async () => {
    setIsLoading(true);
    let statisticOrganizations;

    try {
      statisticOrganizations = await API.admin.statistic.getStatisticOrganizations();

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при загрузке статистики по организациям!'
        );
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }

    if (!statisticOrganizations?.data) {
      addError('Не удалось получить статистику по организациям');
      return;
    }

    setStatisticOrganizations(statisticOrganizations.data);
  };

  return { statisticOrganizations, isLoading, getStatisticOrganizations };
};
