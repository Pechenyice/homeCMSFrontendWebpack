import styles from './ClubCreation.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { useNavigate } from 'react-router-dom';
import { ClubActionsPage } from 'pagesComponents/clubs/ClubActionsPage/ClubActionsPage';

export const ClubCreation = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[{ link: '/clubs', alias: 'Клубы' }, { alias: 'Создать клуб' }]}
      />
      <PageHeading heading="Создать клуб" />
      <ClubActionsPage data={null} />
    </Layout>
  );
};
