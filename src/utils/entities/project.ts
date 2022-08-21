import { IAPIProject, IFullAPIProject } from 'types/entities/project';
import { IProjectData } from 'types/entities/project';
import { EProposalStatus } from 'types/enums';
import { generateCommonFromAPIPart, generateCommonToAPIPart } from './common';

export const mapProjectToAPI = (
  entity: IProjectData,
  forUpdate: boolean
): Partial<IAPIProject> => {
  const addon = forUpdate
    ? {}
    : {
        status: EProposalStatus[entity.status].toLowerCase(),
        rejected_status_description: entity.cause ?? '',
      };

  return {
    info: {
      participant: entity.organisator
        ? { description: entity.organisator }
        : null,
      implementation_period: entity.period,
      implementation_level_id: entity.organizationLevel,
      public_work_ids: entity.gosWorkNames || [],
      service_type_ids: entity.worksKinds || [],
      service_name_ids: entity.worksNames || [],
    },

    //common
    ...generateCommonToAPIPart(entity),

    ...addon,
  };
};

export const mapProjectFromAPI = (entity: IFullAPIProject): IProjectData => {
  return {
    organisator: entity.info.participant?.description ?? null,
    period: entity.info.implementation_period,
    organizationLevel: entity.info.implementation_level_id,
    worksKinds: entity.info.service_type_ids,
    worksNames: entity.info.service_name_ids,
    gosWorkNames: entity.info.public_work_ids,

    //common
    ...generateCommonFromAPIPart(entity),
  };
};
