import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { IAPIEntitiesList } from 'types/entities/entities';

export const useSocialWorks = () => {
  const { addError } = useErrors();
  const { profile, handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [socialWorks, setSocialWorks] = useState<IAPIEntitiesList>({
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
      socialWorks = await API.socialWork.getList(
        page,
        limit,
        lockedParams || (params as any),
        profile?.id
      );

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
