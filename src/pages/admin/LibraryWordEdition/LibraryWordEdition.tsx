import styles from './SocialWorkEdition.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PageLoader from 'components/PageLoader/PageLoader';
import { useSocialWork } from 'hooks/queries/entities/socialWork/useSocialWork';
import { SocialWorkActionsPage } from 'pagesComponents/socialWorks/SocialWorkActionsPage/SocialWorkActionsPage';
import { useLibraryWord } from 'hooks/queries/admin/useLibraryWord';
import { LibraryActionsPage } from 'pagesComponents/admin/internal/LibraryActionsPage/LibraryActionsPage';

export const LibraryWordEdition = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    apiData: libraryWord,
    isLoading: isLibraryWordLoading,
    isError: isLibraryWordError,
  } = useLibraryWord(id as string);

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/library', alias: 'Библиотека терминов' },
          { alias: 'Редактировать термин' },
        ]}
      />

      {isLibraryWordLoading ? (
        <PageLoader />
      ) : isLibraryWordError ? (
        <></>
      ) : (
        <>
          <PageHeading heading="Редактировать термин" />
          <LibraryActionsPage data={libraryWord!} />
        </>
      )}
    </Layout>
  );
};
