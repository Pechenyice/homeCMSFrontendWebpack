import styles from './EducationProgramCreation.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { EducationProgramActionsPage } from 'pagesComponents/educationPrograms/EducationProgramActionsPage/EducationProgramActionsPage';

export const EducationProgramCreation = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/education', alias: 'Доп. образовательные программы' },
          { alias: 'Создать доп. образовательную программу' },
        ]}
      />
      <PageHeading heading="Создать доп. образовательную программу" />
      <EducationProgramActionsPage data={null} />
    </Layout>
  );
};
