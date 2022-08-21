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

export const useAdminSocialWorks = (isArchived: boolean) => {
  const { addError } = useErrors();
  const { handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [socialWorks, setSocialWorks] = useState<
    IAPIAdminEntitiesList | IAPIAdminEntitiesArchiveList
  >({
    items: [],
    total: 0,
  });

  const params = useQueryParams();

  const getSocialWorks = async (
    page: number,
    limit: number,
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let socialWorks;

    try {
      if (isArchived) {
        socialWorks = await API.socialWork.getAdminArchiveList(
          page,
          limit,
          lockedParams || (params as any)
        );
      } else {
        socialWorks = await API.socialWork.getAdminList(
          page,
          limit,
          lockedParams || (params as any)
        );
      }

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при загрузке программ по соц. работе!'
        );
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }

    if (!socialWorks?.data) {
      addError('Не удалось получить программы по соц. работе');
      return;
    }

    setSocialWorks(socialWorks.data);
  };

  return { socialWorks, isLoading, getSocialWorks };
};
