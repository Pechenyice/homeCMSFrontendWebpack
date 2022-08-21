import styles from './SocialWorkCreation.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { EducationProgramActionsPage } from 'pagesComponents/educationPrograms/EducationProgramActionsPage/EducationProgramActionsPage';
import { SocialWorkActionsPage } from 'pagesComponents/socialWorks/SocialWorkActionsPage/SocialWorkActionsPage';

export const SocialWorkCreation = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/social', alias: 'Программы по соц. работе' },
          { alias: 'Создать программу по соц. работе' },
        ]}
      />
      <PageHeading heading="Создать программу по соц. работе" />
      <SocialWorkActionsPage data={null} />
    </Layout>
  );
};
