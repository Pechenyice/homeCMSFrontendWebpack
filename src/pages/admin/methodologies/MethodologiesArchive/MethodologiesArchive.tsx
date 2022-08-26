import styles from './MethodologiesArchive.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout } from 'components/kit';
import { ProjectsAdminPage } from 'pagesComponents/admin/entities/project/ProjectsAdminPage/ProjectsAdminPage';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { MethodologiesAdminPage } from 'pagesComponents/admin/entities/methodology/MethodologiesAdminPage/MethodologiesAdminPage';

export const MethodologiesArchive = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { alias: 'Методики и технологии', link: '/methodologies' },
          { alias: 'Архив методик и технологий' },
        ]}
      />
      <PageHeading heading="Архив методик и технологий" />
      <MethodologiesAdminPage isArchived />
    </Layout>
  );
};
