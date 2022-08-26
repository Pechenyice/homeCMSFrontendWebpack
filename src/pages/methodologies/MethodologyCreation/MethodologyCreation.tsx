import styles from './MethodologyCreation.module.scss';
import { PageHeading } from 'components';
import { Breadcrumbs, Layout } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { MethodologyActionsPage } from 'pagesComponents/methodologies/MethodologyActionsPage/MethodologyActionsPage';

export const MethodologyCreation = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/methodologies', alias: 'Методики и технологии' },
          { alias: 'Создать методику и технологию' },
        ]}
      />
      <PageHeading heading="Создать методику и технологию" />
      <MethodologyActionsPage data={null} />
    </Layout>
  );
};
