import {
  IAPIEducationProgram,
  IEducationProgramData,
  IFullAPIEducationProgram,
} from 'types/entities/educationProgram';
import { EProposalStatus } from 'types/enums';
import { generateCommonFromAPIPart, generateCommonToAPIPart } from './common';

export const mapEducationProgramToAPI = (
  entity: IEducationProgramData,
  forUpdate: boolean
): Partial<IAPIEducationProgram> => {
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
    },

    //common
    ...generateCommonToAPIPart(entity),

    ...addon,
  };
};

export const mapEducationProgramFromAPI = (
  entity: IFullAPIEducationProgram
): IEducationProgramData => {
  return {
    direction: entity.info.direction_id,
    conductingClassesForm: entity.info.conducting_classes_form_id,
    //[Removed 12.10.2022 by clients correction] datesAndModeOfStudy: entity.info.dates_and_mode_of_study,

    //common
    ...generateCommonFromAPIPart(entity),
  };
};
