import styles from './Project.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { EditIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfilePage } from 'pagesComponents';
import { useQuery } from 'react-query';
import { getProjectKey } from 'hooks/queries/keys';
import { API } from 'api/controller';

export const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const query = useQuery(getProjectKey(id!), API.queries.fetchDistricts, {
    enabled: !!id,
  });

  return (
    <Layout>
      <Breadcrumbs paths={[{ link: '/projects', alias: 'Мои проекты' }]} />
      <PageHeading
        heading="Профиль"
        status={profile?.company?.status}
        cause={
          <Text isMedium>
            Профиль отклонен со следующими ошибками:
            <br />
            {profile?.company?.cause}
          </Text>
        }
        action={
          <Action
            text="Редактировать"
            icon={<EditIcon />}
            onClick={() => navigate('/profile/edit')}
          />
        }
      />
      <ProfilePage />
    </Layout>
  );
};
