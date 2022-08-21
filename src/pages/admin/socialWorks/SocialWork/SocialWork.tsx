import styles from './SocialWork.module.scss';
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
import { downloadSocialWork } from 'utils/print';
import { useEducationProgram } from 'hooks/queries/entities/educationProgram/useEducationProgram';
import { EducationProgramPage } from 'pagesComponents/educationPrograms/EducationProgramPage/EducationProgram';
import { useSocialWork } from 'hooks/queries/entities/socialWork/useSocialWork';
import { SocialWorkPage } from 'pagesComponents/socialWorks/SocialWorkPage/SocialWork';

export const SocialWork = () => {
  const { id, userId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { handleLogout } = useAuth();
  const { addError } = useErrors();
  const { addInfo } = useInfos();

  const {
    apiData: socialWork,
    isLoading: isSocialWorkLoading,
    isError: isSocialWorkError,
  } = useSocialWork(id as string, userId as any, true);

  const handlePrint = async () => {
    try {
      await downloadSocialWork(userId as any, id as any, true);
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

  const handleRestore = async () => {
    try {
      await API.socialWork.restore(userId as any, id as any);

      addInfo('Программа по соц. работе успешно восстановлена!');

      queryClient.invalidateQueries('socialWork');

      navigate('/social');
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при восстановлении программы по соц. работе!'
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
                text="К организации-создателю"
                onClick={() => navigate(`/users/${userId}`)}
              />
            }
            menu={
              <Dropdown placement="right">
                <div className={styles.dropdownElem} onClick={handlePrint}>
                  <Text isMedium>Распечатать</Text>
                </div>
                {socialWork!.isDeleted && (
                  <div className={styles.dropdownElem} onClick={handleRestore}>
                    <Text isMedium>Восстановить</Text>
                  </div>
                )}
              </Dropdown>
            }
          />
          <SocialWorkPage socialWork={socialWork!} isAdmin />
        </>
      )}
    </Layout>
  );
};
