import styles from './EducationProgramEdition.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { EducationProgramActionsPage } from 'pagesComponents/educationPrograms/EducationProgramActionsPage/EducationProgramActionsPage';
import PageLoader from 'components/PageLoader/PageLoader';
import { useEducationProgram } from 'hooks/queries/entities/educationProgram/useEducationProgram';
import { useAuth } from 'hooks';
import { useEffect } from 'react';

export const EducationProgramEdition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth();

  const isDisabled = !profile?.company?.educationLicense;

  useEffect(() => {
    if (isDisabled) navigate('/education');
  }, [profile]);

  const {
    apiData: educationProgram,
    isLoading: isEducationProgramLoading,
    isError: isEducationProgramError,
  } = useEducationProgram(id as string);

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          {
            link: '/education',
            alias: 'Программы дополнительного образования',
          },
          { alias: 'Редактировать программу дополнительного образования' },
        ]}
      />

      {isEducationProgramLoading ? (
        <PageLoader />
      ) : isEducationProgramError ? (
        <></>
      ) : (
        <>
          <PageHeading heading="Редактировать программу дополнительного образования" />
          <EducationProgramActionsPage data={educationProgram!} />
        </>
      )}
    </Layout>
  );
};
