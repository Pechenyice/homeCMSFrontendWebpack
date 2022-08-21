import styles from './SocialWork.module.scss';
import { Dropdown, PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Modal, Text } from 'components/kit';
import { EditIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectPage, ProjectsPage } from 'pagesComponents';
import { useQuery, useQueryClient } from 'react-query';
import {
  getEducationProgramKey,
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

export const SocialWork = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleLogout, profile } = useAuth();
  const { addError } = useErrors();
  const { addInfo } = useInfos();

  const {
    apiData: socialWork,
    isLoading: isSocialWorkLoading,
    isError: isSocialWorkError,
  } = useSocialWork(id as string);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePrint = async () => {
    try {
      if (!profile?.id) throw new AuthError('Данные пользователя не найдены');

      await downloadSocialWork(profile.id as any, id as any);
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при скачивании программы по соц. работе!'
        );
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (!profile?.id || !id || isNaN(id as any)) {
        addError('Не удалось отклонить заявку');
        return;
      }

      setIsLoading(true);

      await API.socialWork.delete(id as any, profile.id as any);

      setIsLoading(false);

      addInfo('Программа по соц. работе успешно удалена!');

      await queryClient.invalidateQueries(
        getSocialWorkKey(id as any, profile.id as any)
      );

      navigate('/social');
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при удалении программы по соц. работе!'
        );
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
          { link: '/social', alias: 'Программы по соц. работе' },
          { alias: 'Просмотр программы по соц. работе' },
        ]}
      />
      {isSocialWorkLoading ? (
        <PageLoader />
      ) : isSocialWorkError ? (
        <></>
      ) : (
        <>
          <PageHeading
            heading="Просмотр программы по соц. работе"
            status={socialWork!.status}
            isDeleted={socialWork!.isDeleted}
            isBest={socialWork!.isBest}
            cause={
              <Text isMedium>
                Программа по соц. работе отклонена со следующими ошибками:
                <br />
                {socialWork!.cause}
              </Text>
            }
            action={
              <Action
                text="Редактировать"
                icon={<EditIcon />}
                onClick={() => navigate(`/social/${id}/edit`)}
              />
            }
            menu={
              <Dropdown placement="right">
                <div className={styles.dropdownElem} onClick={handlePrint}>
                  <Text isMedium>Распечатать</Text>
                </div>
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
          <SocialWorkPage socialWork={socialWork!} />
        </>
      )}
      {isModalOpen && (
        <Modal
          isOpen
          isNegative
          text="Вы действительно хотите удалить программу по соц. работе?"
          submitText="Удалить"
          cancelText="Отмена"
          onSubmit={isLoading ? undefined : (handleDelete as any)}
          onCancel={handleToggleModal}
        />
      )}
    </Layout>
  );
};
