import styles from './EducationPrograms.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout } from 'components/kit';
import { useNavigate } from 'react-router-dom';
import { EducationProgramsAdminPage } from 'pagesComponents/admin/entities/educationProgram/EducationProgramsAdminPage/EducationProgramsAdminPage';

export const EducationPrograms = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[{ alias: 'Программы дополнительного образования' }]}
      />
      <PageHeading
        heading="Программы дополнительного образования"
        action={
          <Action text="Архив" onClick={() => navigate('/education/archive')} />
        }
      />
      <EducationProgramsAdminPage />
    </Layout>
  );
};
