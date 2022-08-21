import styles from './EducationProgram.module.scss';
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
import { downloadEducationProgram, downloadProject } from 'utils/print';
import { useEducationProgram } from 'hooks/queries/entities/educationProgram/useEducationProgram';
import { EducationProgramPage } from 'pagesComponents/educationPrograms/EducationProgramPage/EducationProgram';

export const EducationProgram = () => {
  const { id, userId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { handleLogout } = useAuth();
  const { addError } = useErrors();
  const { addInfo } = useInfos();

  const {
    apiData: educationProgram,
    isLoading: isEducationProgramLoading,
    isError: isEducationProgramError,
  } = useEducationProgram(id as string, userId as any, true);

  const handlePrint = async () => {
    try {
      await downloadEducationProgram(userId as any, id as any, true);
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при скачивании образовательной программы!'
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
      await API.educationProgram.restore(userId as any, id as any);

      addInfo('Образовательная программа успешно восстановлена!');

      queryClient.invalidateQueries('educationProgram');

      navigate('/education');
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при восстановлении образовательной программы!'
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
          { link: '/education', alias: 'Доп. образовательные программы' },
          { alias: 'Просмотр доп. образовательной программы' },
        ]}
      />
      {isEducationProgramLoading ? (
        <PageLoader />
      ) : isEducationProgramError ? (
        <></>
      ) : (
        <>
          <PageHeading
            heading="Просмотр доп. образовательной программы"
            status={educationProgram!.status}
            isDeleted={educationProgram!.isDeleted}
            isBest={educationProgram!.isBest}
            cause={
              <Text isMedium>
                Доп. образовательная программа отклонена со следующими ошибками:
                <br />
                {educationProgram!.cause}
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
                {educationProgram!.isDeleted && (
                  <div className={styles.dropdownElem} onClick={handleRestore}>
                    <Text isMedium>Восстановить</Text>
                  </div>
                )}
              </Dropdown>
            }
          />
          <EducationProgramPage educationProgram={educationProgram!} isAdmin />
        </>
      )}
    </Layout>
  );
};
