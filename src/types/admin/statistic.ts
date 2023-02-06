export interface IStatisticOrganizationEntry {
  count: number;
  member_count: number;
}

export interface IStatisticOrganizationEntryCamel {
  count: number;
  membersCount: number;
}

export interface IStatisticOrganizationBlock {
  social_project: IStatisticOrganizationEntry;
  club: IStatisticOrganizationEntry;
  edu_program: IStatisticOrganizationEntry;
  methodology: IStatisticOrganizationEntry;
  social_work: IStatisticOrganizationEntry;
}

export interface IStatisticOrganizationBlockCamel {
  project: IStatisticOrganizationEntryCamel;
  club: IStatisticOrganizationEntryCamel;
  educationProgram: IStatisticOrganizationEntryCamel;
  methodology: IStatisticOrganizationEntryCamel;
  socialWork: IStatisticOrganizationEntryCamel;
}

export interface IStatisticOrganization {
  name: string;
  full_name: string;
  jobs: IStatisticOrganizationBlock;
}

export interface IStatisticOrganizationCamel {
  name: string;
  fullName: string;
  jobs: IStatisticOrganizationBlockCamel;
}

export interface IStatisticOrganizationResult {
  companies: IStatisticOrganization[];
  meta: IStatisticOrganizationBlock;
}

export interface IStatisticOrganizationResultCamel {
  companies: IStatisticOrganizationCamel[];
  meta: IStatisticOrganizationBlockCamel;
}
