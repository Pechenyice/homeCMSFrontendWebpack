import styles from './Library.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { LibraryPage } from 'pagesComponents/admin/internal/LibraryPage/LibraryPage';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';

export const Library = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Библиотека терминов' }]} />
      <PageHeading
        heading="Библиотека терминов"
        action={
          <Action
            text="Создать новый"
            icon={<PlusIcon />}
            onClick={() => navigate('/library/create')}
          />
        }
      />
      <LibraryPage />
    </Layout>
  );
};
