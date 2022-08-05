import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { IAPIEntitiesList } from 'types/entities/entities';
import { mapProjectFromAPI } from 'utils/entities/project';
import { getProjectKey } from './../keys';

export const useProjects = () => {
  const { addError } = useErrors();
  const { profile, handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [projects, setProjects] = useState<IAPIEntitiesList>({
    items: [],
    total: 0,
  });

  const params = useQueryParams();

  const getProjects = async (page: number, limit: number) => {
    setIsLoading(true);
    let projects;

    try {
      projects = await API.project.getList(
        page,
        limit,
        params as any,
        profile?.id
      );

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при загрузке проекта!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }

    if (!projects?.data) {
      addError('Не удалось получить проекты');
      return;
    }

    setProjects(projects.data);
  };

  return { projects, isLoading, getProjects };
};
