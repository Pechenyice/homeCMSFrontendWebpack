import { IAPIClub, IClubData, IFullAPIClub } from 'types/entities/club';
import { EProposalStatus } from 'types/enums';
import { generateCommonFromAPIPart, generateCommonToAPIPart } from './common';

export const mapClubToAPI = (
  entity: IClubData,
  forUpdate: boolean
): Partial<IAPIClub> => {
  const addon = forUpdate
    ? {}
    : {
        status: EProposalStatus[entity.status].toLowerCase(),
        rejected_status_description: entity.cause ?? '',
      };

  return {
    info: {
      //[Removed 12.10.2022 by clients correction] schedule: entity.schedule,
      conducting_classes_form_id: entity.conductingClassesForm,
      public_work_ids: entity.gosWorkNames || [],
      service_type_ids: entity.worksKinds || [],
      service_name_ids: entity.worksNames || [],
    },

    //common
    ...generateCommonToAPIPart(entity),

    ...addon,
  };
};

export const mapClubFromAPI = (entity: IFullAPIClub): IClubData => {
  return {
    //[Removed 12.10.2022 by clients correction]  schedule: entity.info.schedule,
    conductingClassesForm: entity.info.conducting_classes_form_id,
    worksKinds: entity.info.service_type_ids,
    worksNames: entity.info.service_name_ids,
    gosWorkNames: entity.info.public_work_ids,

    //common
    ...generateCommonFromAPIPart(entity),
  };
};
