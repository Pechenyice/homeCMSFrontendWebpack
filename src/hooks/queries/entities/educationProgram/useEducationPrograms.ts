import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { IAPIEntitiesList } from 'types/entities/entities';

export const useEducationPrograms = () => {
  const { addError } = useErrors();
  const { profile, handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [educationPrograms, setEducationPrograms] = useState<IAPIEntitiesList>({
    items: [],
    total: 0,
  });

  const params = useQueryParams();

  const getEducationPrograms = async (
    page: number,
    limit: number,
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let educationPrograms;

    try {
      educationPrograms = await API.educationProgram.getList(
        page,
        limit,
        lockedParams || (params as any),
        profile?.id
      );

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при загрузке образовательных программ!'
        );
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }

    if (!educationPrograms?.data) {
      addError('Не удалось получить образовательные программы');
      return;
    }

    setEducationPrograms(educationPrograms.data);
  };

  return { educationPrograms, isLoading, getEducationPrograms };
};
