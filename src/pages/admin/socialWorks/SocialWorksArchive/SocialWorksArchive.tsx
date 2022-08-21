import styles from './SocialWorksArchive.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout } from 'components/kit';
import { ProjectsAdminPage } from 'pagesComponents/admin/entities/project/ProjectsAdminPage/ProjectsAdminPage';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { SocialWorksAdminPage } from 'pagesComponents/admin/entities/socialWork/SocialWorksAdminPage/SocialWorksAdminPage';

export const SocialWorksArchive = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { alias: 'Программы по соц. работе', link: '/social' },
          { alias: 'Архив программ по соц. работе' },
        ]}
      />
      <PageHeading heading="Архив программ по соц. работе" />
      <SocialWorksAdminPage isArchived />
    </Layout>
  );
};
