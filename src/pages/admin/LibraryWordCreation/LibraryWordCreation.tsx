import styles from './SocialWorkCreation.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { EducationProgramActionsPage } from 'pagesComponents/educationPrograms/EducationProgramActionsPage/EducationProgramActionsPage';
import { SocialWorkActionsPage } from 'pagesComponents/socialWorks/SocialWorkActionsPage/SocialWorkActionsPage';
import { LibraryActionsPage } from 'pagesComponents/admin/internal/LibraryActionsPage/LibraryActionsPage';

export const LibraryWordCreation = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/library', alias: 'Библиотека терминов' },
          { alias: 'Создать термин' },
        ]}
      />
      <PageHeading heading="Создать термин" />
      <LibraryActionsPage data={null} />
    </Layout>
  );
};
