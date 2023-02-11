import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { ILibraryWordList } from 'types/admin/library';
import {
  IStatisticOrganizationResult,
  IStatisticOrganizationResultCamel,
} from 'types/admin/statistic';
import {
  IAPIAdminEntitiesArchiveList,
  IAPIAdminEntitiesList,
} from 'types/entities/entities';
import { mapStatisticOrganizationsFromApi } from 'utils/admin/statistic';

export const useStatisticOrganizations = () => {
  const { addError } = useErrors();
  const { handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [
    statisticOrganizations,
    setStatisticOrganizations,
  ] = useState<IStatisticOrganizationResultCamel>({
    companies: [],
    meta: {
      socialWork: { count: 0, membersCount: 0 },
      club: { count: 0, membersCount: 0 },
      educationProgram: { count: 0, membersCount: 0 },
      project: { count: 0, membersCount: 0 },
      methodology: { count: 0, membersCount: 0 },
    },
  });

  const params = useQueryParams();

  const getStatisticOrganizations = async (
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let statisticOrganizations;

    try {
      statisticOrganizations = await API.admin.statistic.getStatisticOrganizations(
        lockedParams || (params as any)
      );

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

    setStatisticOrganizations(
      mapStatisticOrganizationsFromApi(statisticOrganizations.data)
    );
  };

  return { statisticOrganizations, isLoading, getStatisticOrganizations };
};
