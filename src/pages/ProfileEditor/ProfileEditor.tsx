import styles from 'ProfileEditor.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { useAuth } from 'hooks';
import { EditIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { ProfileEditorPage } from 'pagesComponents';

export const ProfileEditor = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/profile', alias: 'Профиль' },
          { link: '/profile/edit', alias: 'Редактировать профиль' },
        ]}
      />
      <PageHeading heading="Редактировать профиль" />
      <ProfileEditorPage />
    </Layout>
  );
};
