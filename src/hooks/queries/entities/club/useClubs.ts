import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { IAPIEntitiesList } from 'types/entities/entities';

export const useClubs = () => {
  const { addError } = useErrors();
  const { profile, handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [clubs, setClubs] = useState<IAPIEntitiesList>({
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
      clubs = await API.club.getList(
        page,
        limit,
        lockedParams || (params as any),
        profile?.id
      );

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
