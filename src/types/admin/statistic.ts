export interface IStatisticOrganizationEntry {
  count: number;
  membersCount: number;
}

export interface IStatisticOrganization {
  name: string;
  project: IStatisticOrganizationEntry;
  club: IStatisticOrganizationEntry;
  educationProgram: IStatisticOrganizationEntry;
  methodology: IStatisticOrganizationEntry;
  socialWork: IStatisticOrganizationEntry;
}

export interface IStatisticOrganizationResult {
  items: IStatisticOrganization[];
}
