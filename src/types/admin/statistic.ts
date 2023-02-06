// TODO: camelcase
export interface IStatisticOrganizationEntry {
  count: number;
  member_count: number;
}

export interface IStatisticOrganizationBlock {
  social_project: IStatisticOrganizationEntry;
  club: IStatisticOrganizationEntry;
  edu_program: IStatisticOrganizationEntry;
  methodology: IStatisticOrganizationEntry;
  social_work: IStatisticOrganizationEntry;
}
export interface IStatisticOrganization {
  name: string;
  full_name: string;
  jobs: IStatisticOrganizationBlock;
}

export interface IStatisticOrganizationResult {
  companies: IStatisticOrganization[];
  meta: IStatisticOrganizationBlock;
}
