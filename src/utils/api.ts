import { EProposalStatus } from 'types/enums';
import { ICompany, IAPICompany } from 'types/interfaces';

export const mapCompanyFromAPI = (company: IAPICompany): ICompany => {
  return {
    name: company.name,
    fullName: company.full_name,
    type: company.organization_type_id,
    district: company.district_id,
    educationLicense: company.is_has_education_license,
    medicineLicense: company.is_has_mdedical_license,
    innovationGround: company.is_has_innovative_platform,
    supervisor: company.owner,
    responsible: company.responsible,
    status:
      EProposalStatus[
        company.status.toUpperCase() as keyof typeof EProposalStatus
      ],
    cause: company.rejected_status_description,
  };
};

export const mapCompanyToAPI = (
  company: ICompany,
  forUpdate: boolean
): Partial<IAPICompany> => {
  const addon = forUpdate
    ? {}
    : {
        status: EProposalStatus[company.status].toLowerCase(),
        rejected_status_description: company.cause ?? '',
      };

  return {
    name: company.name,
    full_name: company.fullName,
    organization_type_id: company.type,
    district_id: company.district,
    is_has_education_license: company.educationLicense,
    is_has_mdedical_license: company.medicineLicense,
    is_has_innovative_platform: company.innovationGround,
    owner: company.supervisor,
    responsible: company.responsible,
    ...addon,
  };
};
