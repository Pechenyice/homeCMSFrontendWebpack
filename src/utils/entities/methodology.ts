import {
  IAPIMethodology,
  IFullAPIMethodology,
  IMethodologyData,
} from 'types/entities/methodology';
import {
  IAPISocialWork,
  IFullAPISocialWork,
  ISocialWorkData,
} from 'types/entities/socialWork';
import { EProposalStatus } from 'types/enums';
import { generateCommonFromAPIPart, generateCommonToAPIPart } from './common';

export const mapMethodologyToAPI = (
  entity: IMethodologyData,
  forUpdate: boolean
): Partial<IAPIMethodology> => {
  const addon = forUpdate
    ? {}
    : {
        status: EProposalStatus[entity.status].toLowerCase(),
        rejected_status_description: entity.cause ?? '',
      };

  return {
    info: {
      direction_id: entity.direction,
      prevalence_id: entity.prevalence,
      activity_organization_form_id: entity.activityOrganizationForm,
      application_period_id: entity.applicationPeriod,
      authors: entity.authors,
      publication_link: entity.publicationLink,
      effectiveness_study: entity.effectivenessStudy,
      effectiveness_study_link: entity.effectivenessStudyLink,
      realized_cycles: entity.realizedCycles,
      //[Removed 12.10.2022 by clients correction] cycle_duration: entity.cycleDuration,
      public_work_ids: entity.gosWorkNames || [],
      service_type_ids: entity.worksKinds || [],
      service_name_ids: entity.worksNames || [],
    },

    //common
    ...generateCommonToAPIPart(entity),

    ...addon,
  };
};

export const mapMethodologyFromAPI = (
  entity: IFullAPIMethodology
): IMethodologyData => {
  return {
    direction: entity.info.direction_id,
    prevalence: entity.info.prevalence_id,
    activityOrganizationForm: entity.info.activity_organization_form_id,
    applicationPeriod: entity.info.application_period_id,
    authors: entity.info.authors,
    publicationLink: entity.info.publication_link,
    effectivenessStudy: entity.info.effectiveness_study,
    effectivenessStudyLink: entity.info.effectiveness_study_link,
    realizedCycles: entity.info.realized_cycles,
    //[Removed 12.10.2022 by clients correction] cycleDuration: entity.info.cycle_duration,
    worksKinds: entity.info.service_type_ids,
    worksNames: entity.info.service_name_ids,
    gosWorkNames: entity.info.public_work_ids,

    //common
    ...generateCommonFromAPIPart(entity),
  };
};
