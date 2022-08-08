import styles from './Company.module.scss';
import { Dropdown, PageHeading } from 'components';
import {
  Action,
  Breadcrumbs,
  Checkbox,
  ESkeletonMode,
  Input,
  Layout,
  Skeleton,
  Text,
  TextArea,
} from 'components/kit';
import { EditIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectPage, ProjectsPage } from 'pagesComponents';
import { useQuery } from 'react-query';
import { getProjectKey } from 'hooks/queries/keys';
import { API } from 'api/controller';
import { useProject } from 'hooks/queries/entities/useProject';
import PageLoader from 'components/PageLoader/PageLoader';
import { useAuth, useErrors } from 'hooks';
import { useDistricts } from 'hooks/queries/useDistricts';
import { useOrganizationTypes } from 'hooks/queries/useOrganizationTypes';
import { useMemo } from 'react';
import { useCompany } from 'hooks/queries/useCompany';
import { getValueByIdFromSelect } from 'utils';
import { CompanyPage } from 'pagesComponents/admin';

export const Company = () => {
  const { userId } = useParams();
  const {
    apiData: company,
    apiError: companyApiError,
    isLoading: companyLoading,
    isError: companyError,
  } = useCompany(userId as string);

  const handlePrint = () => {
    window.print();
  };

  if (companyLoading) return <PageLoader />;

  return (
    <Layout>
      <Breadcrumbs paths={[{ alias: 'Профиль' }]} />
      <PageHeading
        heading="Профиль"
        status={company?.status}
        cause={
          <Text isMedium>
            Профиль отклонен со следующими ошибками:
            <br />
            {company?.cause}
          </Text>
        }
        menu={
          <Dropdown placement="right">
            <div className={styles.dropdownElem} onClick={handlePrint}>
              <Text isMedium>Распечатать</Text>
            </div>
          </Dropdown>
        }
      />
      <CompanyPage company={company} />
    </Layout>
  );
};
