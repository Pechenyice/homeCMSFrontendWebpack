import styles from './EducationPrograms.module.scss';
import { PageHeading } from 'components';
import { Action, Breadcrumbs, Hint, Layout, Text } from 'components/kit';
import { PlusIcon } from 'assets/icons';
import { useNavigate } from 'react-router-dom';
import { EducationProgramsPage } from 'pagesComponents/educationPrograms/EducationProgramsPage/EducationProgramsPage';
import { useAuth } from 'hooks';

export const EducationPrograms = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const isDisabled = !profile?.company?.educationLicense;

  return (
    <Layout>
      <Breadcrumbs
        paths={[{ alias: 'Программы дополнительного образования' }]}
      />
      <PageHeading
        heading="Наши программы дополнительного образования"
        action={
          <div className={styles.flex}>
            <Action
              isDisabled={isDisabled}
              text="Создать новую"
              icon={<PlusIcon />}
              onClick={() => navigate('/education/create')}
            />
            {isDisabled && (
              <Hint
                className={styles.hint}
                placement="left"
                text={
                  'Для активации раздела необходимо наличие лицензии на осуществление образовательной деятельности'
                }
              />
            )}
          </div>
        }
      />
      <EducationProgramsPage />
    </Layout>
  );
};
