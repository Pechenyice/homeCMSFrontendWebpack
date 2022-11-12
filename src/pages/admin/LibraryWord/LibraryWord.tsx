import styles from './LibraryWord.module.scss';
import { Dropdown, PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Modal, Text } from 'components/kit';
import { EditIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectPage, ProjectsPage } from 'pagesComponents';
import { useQuery, useQueryClient } from 'react-query';
import {
  getEducationProgramKey,
  getLibraryWordKey,
  getProjectKey,
  getSocialWorkKey,
} from 'hooks/queries/keys';
import { API } from 'api/controller';
import { useProject } from 'hooks/queries/entities/project/useProject';
import PageLoader from 'components/PageLoader/PageLoader';
import { useState } from 'react';
import { useErrors } from 'hooks/useErrors';
import { useInfos } from 'hooks/useInfos';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useAuth } from 'hooks';
import { downloadEducationProgram, downloadSocialWork } from 'utils/print';
import { useEducationProgram } from 'hooks/queries/entities/educationProgram/useEducationProgram';
import { useSocialWork } from 'hooks/queries/entities/socialWork/useSocialWork';
import { SocialWorkPage } from 'pagesComponents/socialWorks/SocialWorkPage/SocialWork';
import { useLibraryWord } from 'hooks/queries/admin/useLibraryWord';
import { LibraryWordPage } from 'pagesComponents/admin/internal/LibraryWordPage/LibraryWordPage';

export const LibraryWord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleLogout, profile } = useAuth();
  const { addError } = useErrors();
  const { addInfo } = useInfos();

  const {
    apiData: libraryWord,
    isLoading: isLibraryWordLoading,
    isError: isLibraryWordError,
  } = useLibraryWord(id as string);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async () => {
    try {
      if (!profile?.id || !id || isNaN(id as any)) {
        addError('Не удалось удалить термин');
        return;
      }

      setIsLoading(true);

      await API.admin.library.delete(id as any);

      setIsLoading(false);

      addInfo('Термин успешно удален!');

      await queryClient.invalidateQueries(getLibraryWordKey(id as any));

      navigate('/social');
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при удалении термина!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
  };

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/library', alias: 'Библиотека терминов' },
          { alias: 'Просмотр термина' },
        ]}
      />
      {isLibraryWordLoading ? (
        <PageLoader />
      ) : isLibraryWordError ? (
        <></>
      ) : (
        <>
          <PageHeading
            heading="Просмотр термина"
            action={
              <Action
                text="Редактировать"
                icon={<EditIcon />}
                onClick={() => navigate(`/library/${id}/edit`)}
              />
            }
            menu={
              <Dropdown placement="right">
                <div
                  className={styles.dropdownElem}
                  onClick={handleToggleModal}
                >
                  <Text isMedium className={styles.delete}>
                    Удалить
                  </Text>
                </div>
              </Dropdown>
            }
          />
          <LibraryWordPage libraryWord={libraryWord!} />
        </>
      )}
      {isModalOpen && (
        <Modal
          isOpen
          isNegative
          text="Вы действительно хотите удалить термин?"
          submitText="Удалить"
          cancelText="Отмена"
          onSubmit={isLoading ? undefined : (handleDelete as any)}
          onCancel={handleToggleModal}
        />
      )}
    </Layout>
  );
};
