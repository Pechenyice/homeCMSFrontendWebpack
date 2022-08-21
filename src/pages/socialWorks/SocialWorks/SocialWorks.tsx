import styles from './SocialWorks.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { SocialWorksPage } from 'pagesComponents/socialWorks/SocialWorksPage/SocialWorksPage';

export const SocialWorks = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Программы по соц. работе' }]} />
      <PageHeading
        heading="Наши программы по соц. работе"
        action={
          <Action
            text="Создать новую"
            icon={<PlusIcon />}
            onClick={() => navigate('/social/create')}
          />
        }
      />
      <SocialWorksPage />
    </Layout>
  );
};
