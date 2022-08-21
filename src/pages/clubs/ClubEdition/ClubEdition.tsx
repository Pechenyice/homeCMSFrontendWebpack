import styles from './ClubEdition.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import PageLoader from 'components/PageLoader/PageLoader';
import { useClub } from 'hooks/queries/entities/club/useClub';
import { ClubActionsPage } from 'pagesComponents/clubs/ClubActionsPage/ClubActionsPage';

export const ClubEdition = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    apiData: club,
    isLoading: isClubLoading,
    isError: isClubError,
  } = useClub(id as string);

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/clubs', alias: 'Клубы' },
          { alias: 'Редактировать клуб' },
        ]}
      />

      {isClubLoading ? (
        <PageLoader />
      ) : isClubError ? (
        <></>
      ) : (
        <>
          <PageHeading heading="Редактировать программу по соц. работе" />
          <ClubActionsPage data={club!} />
        </>
      )}
    </Layout>
  );
};
