import styles from './Methodology.module.scss';
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
import { downloadMethodology, downloadSocialWork } from 'utils/print';
import { useEducationProgram } from 'hooks/queries/entities/educationProgram/useEducationProgram';
import { EducationProgramPage } from 'pagesComponents/educationPrograms/EducationProgramPage/EducationProgram';
import { useSocialWork } from 'hooks/queries/entities/socialWork/useSocialWork';
import { SocialWorkPage } from 'pagesComponents/socialWorks/SocialWorkPage/SocialWork';
import { useMethodology } from 'hooks/queries/entities/methodology/useMethodology';
import { MethodologyPage } from 'pagesComponents/methodologies/MethodologyPage/MethodologyPage';

export const Methodology = () => {
  const { id, userId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { handleLogout } = useAuth();
  const { addError } = useErrors();
  const { addInfo } = useInfos();

  const {
    apiData: methodology,
    isLoading: isMethodologyLoading,
    isError: isMethodologyError,
  } = useMethodology(id as string, userId as any, true);

  const handlePrint = async () => {
    try {
      await downloadMethodology(userId as any, id as any, true);
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при скачивании методики и технологии!'
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
      await API.methodology.restore(userId as any, id as any);

      addInfo('Программа по соц. работе успешно восстановлена!');

      queryClient.invalidateQueries('methodology');

      navigate('/methodologies');
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при восстановлении методики и технологии!'
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
          { link: '/methodologies', alias: 'Методики и технологии' },
          { alias: 'Просмотр методики и технологии' },
        ]}
      />
      {isMethodologyLoading ? (
        <PageLoader />
      ) : isMethodologyError ? (
        <></>
      ) : (
        <>
          <PageHeading
            heading="Просмотр методики и технологии"
            status={methodology!.status}
            isDeleted={methodology!.isDeleted}
            isBest={methodology!.isBest}
            cause={
              <Text isMedium>
                Методика и технология отклонена со следующими ошибками:
                <br />
                {methodology!.cause}
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
                {methodology!.isDeleted && (
                  <div className={styles.dropdownElem} onClick={handleRestore}>
                    <Text isMedium>Восстановить</Text>
                  </div>
                )}
              </Dropdown>
            }
          />
          <MethodologyPage methodology={methodology!} isAdmin />
        </>
      )}
    </Layout>
  );
};
