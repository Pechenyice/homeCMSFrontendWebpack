import styles from './SocialWorks.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout } from 'components/kit';
import { useNavigate } from 'react-router-dom';
import { SocialWorksAdminPage } from 'pagesComponents/admin/entities/socialWork/SocialWorksAdminPage/SocialWorksAdminPage';

export const SocialWorks = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Программы по соц. работе' }]} />
      <PageHeading
        heading="Программы по соц. работе"
        action={
          <Action text="Архив" onClick={() => navigate('/social/archive')} />
        }
      />
      <SocialWorksAdminPage />
    </Layout>
  );
};
