import styles from './Profile.module.scss';
import { Dropdown, PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Text } from 'components/kit';
import { useAuth, useErrors } from 'hooks';
import { EditIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { ProfilePage } from 'pagesComponents';
import { downloadCompany } from 'utils/print';
import { ApiError, AuthError, ServerError } from 'api/errors';

export const Profile = () => {
  const navigate = useNavigate();

  const { profile, handleLogout } = useAuth();
  const { addError } = useErrors();

  const handlePrint = async () => {
    try {
      if (!profile?.id) throw new AuthError('Данные пользователя не найдены');

      await downloadCompany(profile.id as any);
    } catch (e) {
      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при скачивании организации!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
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
