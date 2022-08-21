import styles from './EducationProgramsArchive.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout } from 'components/kit';
import { ProjectsAdminPage } from 'pagesComponents/admin/entities/project/ProjectsAdminPage/ProjectsAdminPage';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { EducationProgramsAdminPage } from 'pagesComponents/admin/entities/educationProgram/EducationProgramsAdminPage/EducationProgramsAdminPage';

export const EducationProgramsArchive = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { alias: 'Доп. образовательные программы', link: '/education' },
          { alias: 'Архив доп. образовательных программ' },
        ]}
      />
      <PageHeading heading="Архив доп. образовательных программ" />
      <EducationProgramsAdminPage isArchived />
    </Layout>
  );
};
