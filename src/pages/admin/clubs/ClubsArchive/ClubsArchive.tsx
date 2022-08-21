import styles from './ClubsArchive.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { ClubsAdminPage } from 'pagesComponents/admin/entities/club/ClubsAdminPage/ClubsAdminPage';

export const ClubsArchive = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[{ alias: 'Клубы', link: '/clubs' }, { alias: 'Архив клубов' }]}
      />
      <PageHeading heading="Архив клубов" />
      <ClubsAdminPage isArchived />
    </Layout>
  );
};
