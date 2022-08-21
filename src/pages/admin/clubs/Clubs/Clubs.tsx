import styles from './Clubs.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout } from 'components/kit';
import { useNavigate } from 'react-router-dom';
import { ClubsAdminPage } from 'pagesComponents/admin/entities/club/ClubsAdminPage/ClubsAdminPage';

export const Clubs = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Клубы' }]} />
      <PageHeading
        heading="Клубы"
        action={
          <Action text="Архив" onClick={() => navigate('/clubs/archive')} />
        }
      />
      <ClubsAdminPage />
    </Layout>
  );
};
