import {
  IAPISocialWork,
  IFullAPISocialWork,
  ISocialWorkData,
} from 'types/entities/socialWork';
import { EProposalStatus } from 'types/enums';
import { generateCommonFromAPIPart, generateCommonToAPIPart } from './common';

export const mapSocialWorkToAPI = (
  entity: ISocialWorkData,
  forUpdate: boolean
): Partial<IAPISocialWork> => {
  const addon = forUpdate
    ? {}
    : {
        status: EProposalStatus[entity.status].toLowerCase(),
        rejected_status_description: entity.cause ?? '',
      };

  return {
    info: {
      direction_id: entity.direction,
      conducting_classes_form_id: entity.conductingClassesForm,
      //[Removed 12.10.2022 by clients correction] dates_and_mode_of_study: entity.datesAndModeOfStudy,
      program_type_id: entity.programType,
      public_work_ids: entity.gosWorkNames || [],
      service_type_ids: entity.worksKinds || [],
      service_name_ids: entity.worksNames || [],
    },

    //common
    ...generateCommonToAPIPart(entity),

    ...addon,
  };
};

export const mapSocialWorkFromAPI = (
  entity: IFullAPISocialWork
): ISocialWorkData => {
  return {
    direction: entity.info.direction_id,
    conductingClassesForm: entity.info.conducting_classes_form_id,
    //[Removed 12.10.2022 by clients correction] datesAndModeOfStudy: entity.info.dates_and_mode_of_study,
    programType: entity.info.program_type_id,
    worksKinds: entity.info.service_type_ids,
    worksNames: entity.info.service_name_ids,
    gosWorkNames: entity.info.public_work_ids,

    //common
    ...generateCommonFromAPIPart(entity),
  };
};
