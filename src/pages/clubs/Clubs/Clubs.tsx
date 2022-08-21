import styles from './Clubs.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { ClubsPage } from 'pagesComponents/clubs/ClubsPage/ClubsPage';

export const Clubs = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Клубы' }]} />
      <PageHeading
        heading="Наши клубы"
        action={
          <Action
            text="Создать новый"
            icon={<PlusIcon />}
            onClick={() => navigate('/clubs/create')}
          />
        }
      />
      <ClubsPage />
    </Layout>
  );
};
