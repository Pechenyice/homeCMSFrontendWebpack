import {
  IStatisticOrganizationBlock,
  IStatisticOrganizationResult,
  IStatisticOrganizationResultCamel,
} from 'types/admin/statistic';

const mapJobs = (object: IStatisticOrganizationBlock) => ({
  project: {
    count: object.social_project.count,
    membersCount: object.social_project.member_count,
  },
  club: {
    count: object.club.count,
    membersCount: object.club.member_count,
  },
  socialWork: {
    count: object.social_work.count,
    membersCount: object.social_work.member_count,
  },
  educationProgram: {
    count: object.edu_program.count,
    membersCount: object.edu_program.member_count,
  },
  methodology: {
    count: object.methodology.count,
    membersCount: object.methodology.member_count,
  },
});

export const mapStatisticOrganizationsFromApi = (
  statisticOrganizations: IStatisticOrganizationResult
): IStatisticOrganizationResultCamel => {
  return {
    companies: statisticOrganizations.companies.map((company) => ({
      name: company.name,
      fullName: company.full_name,
      jobs: mapJobs(company.jobs),
    })),
    meta: mapJobs(statisticOrganizations.meta),
  };
};
