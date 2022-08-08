import styles from './Profile.module.scss';
import { Dropdown, PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { useAuth } from 'hooks';
import { EditIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { ProfilePage } from 'pagesComponents';

export const Profile = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      <Breadcrumbs paths={[{ link: '/profile', alias: 'Профиль' }]} />
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
        menu={
          <Dropdown placement="right">
            <div className={styles.dropdownElem} onClick={handlePrint}>
              <Text isMedium>Распечатать</Text>
            </div>
          </Dropdown>
        }
      />
      <ProfilePage />
    </Layout>
  );
};
