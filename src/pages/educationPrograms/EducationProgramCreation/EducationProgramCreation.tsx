import styles from './EducationProgramCreation.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { EducationProgramActionsPage } from 'pagesComponents/educationPrograms/EducationProgramActionsPage/EducationProgramActionsPage';
import { useAuth } from 'hooks/index';
import { useEffect } from 'react';

export const EducationProgramCreation = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const isDisabled = !profile?.company?.educationLicense;

  useEffect(() => {
    if (isDisabled) navigate('/education');
  }, [profile]);

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          {
            link: '/education',
            alias: 'Программы дополнительного образования',
          },
          { alias: 'Создать программу дополнительного образования' },
        ]}
      />
      <PageHeading heading="Создать программу дополнительного образования" />
      <EducationProgramActionsPage data={null} />
    </Layout>
  );
};
