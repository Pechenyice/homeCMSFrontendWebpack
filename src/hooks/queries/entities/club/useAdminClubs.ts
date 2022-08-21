import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import {
  IAPIAdminEntitiesArchiveList,
  IAPIAdminEntitiesList,
} from 'types/entities/entities';

export const useAdminClubs = (isArchived: boolean) => {
  const { addError } = useErrors();
  const { handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [clubs, setClubs] = useState<
    IAPIAdminEntitiesList | IAPIAdminEntitiesArchiveList
  >({
    items: [],
    total: 0,
  });

  const params = useQueryParams();

  const getClubs = async (
    page: number,
    limit: number,
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let clubs;

    try {
      if (isArchived) {
        clubs = await API.club.getAdminArchiveList(
          page,
          limit,
          lockedParams || (params as any)
        );
      } else {
        clubs = await API.club.getAdminList(
          page,
          limit,
          lockedParams || (params as any)
        );
      }

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при загрузке клубов!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }

    if (!clubs?.data) {
      addError('Не удалось получить клубы');
      return;
    }

    setClubs(clubs.data);
  };

  return { clubs, isLoading, getClubs };
};
