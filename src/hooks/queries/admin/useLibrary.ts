import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks';
import { useAuth } from 'hooks/useAuth';
import { useQueryParams } from 'hooks/utils/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { ILibraryWordList } from 'types/admin/library';
import {
  IAPIAdminEntitiesArchiveList,
  IAPIAdminEntitiesList,
} from 'types/entities/entities';

export const useLibrary = () => {
  const { addError } = useErrors();
  const { handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [libraryWords, setLibraryWords] = useState<ILibraryWordList>({
    items: [],
    total: 0,
  });

  const params = useQueryParams();

  const getLibraryWords = async (
    page: number,
    limit: number,
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let words;

    try {
      words = await API.admin.library.getList(
        page,
        limit,
        lockedParams || (params as any)
      );

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при загрузке библиотеки терминов!'
        );
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }

    if (!words?.data) {
      addError('Не удалось получить термины');
      return;
    }

    setLibraryWords(words.data);
  };

  return { libraryWords, isLoading, getLibraryWords };
};
