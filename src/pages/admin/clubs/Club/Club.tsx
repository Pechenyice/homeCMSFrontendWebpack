import styles from './Club.module.scss';
import { Dropdown, PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { ChevronRightIcon, EditIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectPage, ProjectsPage } from 'pagesComponents';
import { useQuery, useQueryClient } from 'react-query';
import { getProjectKey } from 'hooks/queries/keys';
import { API } from 'api/controller';
import { useProject } from 'hooks/queries/entities/project/useProject';
import PageLoader from 'components/PageLoader/PageLoader';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useAuth, useErrors, useInfos } from 'hooks/index';
import { downloadClub } from 'utils/print';
import { useClub } from 'hooks/queries/entities/club/useClub';
import { ClubPage } from 'pagesComponents/clubs/ClubPage/ClubPage';

export const Club = () => {
  const { id, userId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { handleLogout } = useAuth();
  const { addError } = useErrors();
  const { addInfo } = useInfos();

  const {
    apiData: club,
    isLoading: isClubLoading,
    isError: isClubError,
  } = useClub(id as string, userId as any, true);

  const handlePrint = async () => {
    try {
      await downloadClub(userId as any, id as any, true);
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

  const handleRestore = async () => {
    try {
      await API.club.restore(userId as any, id as any);

      addInfo('Клуб успешно восстановлен!');

      queryClient.invalidateQueries('club');

      navigate('/clubs');
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при восстановлении клуба!');
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
                text="К организации-создателю"
                onClick={() => navigate(`/users/${userId}`)}
              />
            }
            menu={
              <Dropdown placement="right">
                <div className={styles.dropdownElem} onClick={handlePrint}>
                  <Text isMedium>Распечатать</Text>
                </div>
                {club!.isDeleted && (
                  <div className={styles.dropdownElem} onClick={handleRestore}>
                    <Text isMedium>Восстановить</Text>
                  </div>
                )}
              </Dropdown>
            }
          />
          <ClubPage club={club!} isAdmin />
        </>
      )}
    </Layout>
  );
};
