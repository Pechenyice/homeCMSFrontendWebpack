import styles from './MethodologyEdition.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PageLoader from 'components/PageLoader/PageLoader';
import { useMethodology } from 'hooks/queries/entities/methodology/useMethodology';
import { MethodologyActionsPage } from 'pagesComponents/methodologies/MethodologyActionsPage/MethodologyActionsPage';

export const MethodologyEdition = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    apiData: methodology,
    isLoading: isMethodologyLoading,
    isError: isMethodologyError,
  } = useMethodology(id as string);

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/methodologies', alias: 'Методики и технологии' },
          { alias: 'Редактировать методику и технологию' },
        ]}
      />

      {isMethodologyLoading ? (
        <PageLoader />
      ) : isMethodologyError ? (
        <></>
      ) : (
        <>
          <PageHeading heading="Редактировать методику и технологию" />
          <MethodologyActionsPage data={methodology!} />
        </>
      )}
    </Layout>
  );
};
