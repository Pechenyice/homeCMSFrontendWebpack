import styles from './Club.module.scss';
import { Dropdown, PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Modal, Text } from 'components/kit';
import { EditIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectPage, ProjectsPage } from 'pagesComponents';
import { useQuery, useQueryClient } from 'react-query';
import { getClubKey } from 'hooks/queries/keys';
import { API } from 'api/controller';
import PageLoader from 'components/PageLoader/PageLoader';
import { useState } from 'react';
import { useErrors } from 'hooks/useErrors';
import { useInfos } from 'hooks/useInfos';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useAuth } from 'hooks';
import { downloadClub } from 'utils/print';
import { useEducationProgram } from 'hooks/queries/entities/educationProgram/useEducationProgram';
import { useClub } from 'hooks/queries/entities/club/useClub';
import { ClubPage } from 'pagesComponents/clubs/ClubPage/ClubPage';

export const Club = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleLogout, profile } = useAuth();
  const { addError } = useErrors();
  const { addInfo } = useInfos();

  const {
    apiData: club,
    isLoading: isClubLoading,
    isError: isClubError,
  } = useClub(id as string);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePrint = async () => {
    try {
      if (!profile?.id) throw new AuthError('Данные пользователя не найдены');

      await downloadClub(profile.id as any, id as any);
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при скачивании клуба!');
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

      await API.club.delete(id as any, profile.id as any);

      setIsLoading(false);

      addInfo('Клуб успешно удален!');

      await queryClient.invalidateQueries(
        getClubKey(id as any, profile.id as any)
      );

      navigate('/clubs');
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при удалении клуба!');
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
          { link: '/clubs', alias: 'Клубы' },
          { alias: 'Просмотр клуба' },
        ]}
      />
      {isClubLoading ? (
        <PageLoader />
      ) : isClubError ? (
        <></>
      ) : (
        <>
          <PageHeading
            heading="Просмотр клуба"
            status={club!.status}
            isDeleted={club!.isDeleted}
            isBest={club!.isBest}
            cause={
              <Text isMedium>
                Клуб отклонен со следующими ошибками:
                <br />
                {club!.cause}
              </Text>
            }
            action={
              <Action
                text="Редактировать"
                icon={<EditIcon />}
                onClick={() => navigate(`/clubs/${id}/edit`)}
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
          <ClubPage club={club!} />
        </>
      )}
      {isModalOpen && (
        <Modal
          isOpen
          isNegative
          text="Вы действительно хотите удалить клуб?"
          submitText="Удалить"
          cancelText="Отмена"
          onSubmit={isLoading ? undefined : (handleDelete as any)}
          onCancel={handleToggleModal}
        />
      )}
    </Layout>
  );
};
