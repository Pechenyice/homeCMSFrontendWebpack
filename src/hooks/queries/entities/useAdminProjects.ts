import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import {
  IAPIAdminEntitiesArchiveList,
  IAPIAdminEntitiesList,
} from 'types/entities/entities';
import { mapProjectFromAPI } from 'utils/entities/project';
import { getProjectKey } from './../keys';

export const useAdminProjects = (isArchived: boolean) => {
  const { addError } = useErrors();
  const { handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [projects, setProjects] = useState<
    IAPIAdminEntitiesList | IAPIAdminEntitiesArchiveList
  >({
    items: [],
    total: 0,
  });

  const params = useQueryParams();

  const getProjects = async (
    page: number,
    limit: number,
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let projects;

    try {
      if (isArchived) {
        projects = await API.project.getAdminArchiveList(
          page,
          limit,
          lockedParams || (params as any)
        );
      } else {
        projects = await API.project.getAdminList(
          page,
          limit,
          lockedParams || (params as any)
        );
      }

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при загрузке архива проектов!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }

    if (!projects?.data) {
      addError('Не удалось получить архив проектов');
      return;
    }

    setProjects(projects.data);
  };

  return { projects, isLoading, getProjects };
};
