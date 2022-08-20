import styles from './EducationPrograms.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { EducationProgramsPage } from 'pagesComponents/educationPrograms/EducationProgramsPage/EducationProgramsPage';

export const EducationPrograms = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Доп. образовательные программы' }]} />
      <PageHeading
        heading="Наши доп. образовательные программы"
        action={
          <Action
            text="Создать новую"
            icon={<PlusIcon />}
            onClick={() => navigate('/education/create')}
          />
        }
      />
      <EducationProgramsPage />
    </Layout>
  );
};
