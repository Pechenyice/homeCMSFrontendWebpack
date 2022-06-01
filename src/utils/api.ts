import { EProposalStatus } from 'types/enums';
import { ICompany, IAPICompany } from 'types/interfaces';

export const mapCompanyFromAPI = (company: IAPICompany): ICompany => {
  return {
    name: company.name,
    fullName: company.full_name,
    phoneNumber: company.phone,
    email: company.email,
    link: company.site,
    type: company.organization_type_id,
    district: company.district_id,
    educationLicense: !!company.education_license,
    educationLicenseNumber: company.education_license?.number ?? undefined,
    educationLicenseDate: company.education_license?.date ?? undefined,
    educationLicenseKind: company.education_license?.type ?? undefined,
    medicineLicense: !!company.medical_license,
    medicineLicenseNumber: company.medical_license?.number ?? undefined,
    medicineLicenseDate: company.medical_license?.date ?? undefined,
    innovationGround: company.is_has_innovative_platform,
    supervisor: company.owner,
    responsible: company.responsible,
    responsiblePhoneNumber: company.responsible_phone,
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
    phone: company.phoneNumber,
    email: company.email,
    site: company.link,
    organization_type_id: company.type,
    district_id: company.district,
    education_license: company.educationLicense
      ? {
          number: company.educationLicenseNumber!,
          date: company.educationLicenseDate!,
          type: company.educationLicenseKind!,
        }
      : null,
    medical_license: company.medicineLicense
      ? {
          number: company.medicineLicenseNumber!,
          date: company.medicineLicenseDate!,
        }
      : null,
    is_has_innovative_platform: company.innovationGround,
    owner: company.supervisor,
    responsible: company.responsible,
    responsible_phone: company.responsiblePhoneNumber,
    ...addon,
  };
};
