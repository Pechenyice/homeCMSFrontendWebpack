import styles from './SocialWorkEdition.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PageLoader from 'components/PageLoader/PageLoader';
import { useSocialWork } from 'hooks/queries/entities/socialWork/useSocialWork';
import { SocialWorkActionsPage } from 'pagesComponents/socialWorks/SocialWorkActionsPage/SocialWorkActionsPage';

export const SocialWorkEdition = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    apiData: socialWork,
    isLoading: isSocialWorkLoading,
    isError: isSocialWorkError,
  } = useSocialWork(id as string);

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/social', alias: 'Программы по соц. работе' },
          { alias: 'Редактировать программу по соц. работе' },
        ]}
      />

      {isSocialWorkLoading ? (
        <PageLoader />
      ) : isSocialWorkError ? (
        <></>
      ) : (
        <>
          <PageHeading heading="Редактировать программу по соц. работе" />
          <SocialWorkActionsPage data={socialWork!} />
        </>
      )}
    </Layout>
  );
};
