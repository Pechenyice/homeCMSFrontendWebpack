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
  ] = useState<IStatisticOrganizationResult>({ items: [] });

  const getStatisticOrganizations = async () => {
    setIsLoading(true);
    let statisticOrganizations;

    try {
      // statisticOrganizations = await API.admin.statistic.getStatisticOrganizations();
      //TODO: replace with API call above
      statisticOrganizations = {
        data: {
          items: [
            {
              name: 'test 1',
              project: { count: 123, membersCount: 12345 },
              educationProgram: { count: 1, membersCount: 111 },
              club: { count: 2, membersCount: 222 },
              socialWork: { count: 3, membersCount: 333 },
              methodology: { count: 4, membersCount: 444 },
            },
            {
              name: 'test 2',
              project: { count: 123, membersCount: 12345 },
              educationProgram: { count: 1, membersCount: 111 },
              club: { count: 2, membersCount: 222 },
              socialWork: { count: 3, membersCount: 333 },
              methodology: { count: 4, membersCount: 444 },
            },
          ],
        },
        error: null,
      };

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
