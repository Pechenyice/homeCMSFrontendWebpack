import {
  IEducationProgramData,
  IFullAPIEducationProgram,
} from 'types/entities/educationProgram';
import { IFullAPIProject, IProjectData } from 'types/entities/project';
import { IFullAPISocialWork, ISocialWorkData } from 'types/entities/socialWork';
import { EProposalStatus } from 'types/enums';
import { ISelectRelations, ISelectValue } from 'types/interfaces';

export const getRelatedCategoriesOptions = (
  parents: number[],
  children: ISelectValue[],
  relations: ISelectRelations
): ISelectValue[] => {
  if (!parents.length) return [];

  let options: number[] = [];

  parents.forEach((parent) => {
    if (relations[`${parent}`])
      options = [...options, ...relations[`${parent}`]];
  });

  if (!options.length) return [];

  return children.filter((child) => options.includes(child.id));
};

export const generateCommonToAPIPart = (
  entity: IProjectData | IEducationProgramData | ISocialWorkData
) => {
  return {
    primary: {
      name: entity.name,
      annotation: entity.annotation,
      objectives: entity.tasks,
      purpose: entity.purpose,
      payment_method_id: entity.realisationForCitizen,
      partnership: entity.partnership
        ? { description: entity.partnership }
        : null,
      rnsu_category_ids: entity.rnsuCategories,
      volunteer_id: entity.attractingVolunteer,
      needy_category_ids: entity.categories,
      needy_category_target_group_ids: entity.groups,
      social_service_ids: entity.socialHelpForm,
      need_recognition_ids: entity.circumstancesRecognitionNeed,
      qualitative_results: entity.basicQualityResults,
      social_results: entity.socialResults,
      replicability: entity.replicability,
      approbation: entity.innovationGround
        ? { description: entity.innovationGround }
        : null,
      expert_opinion: entity.hasExpertOpinion
        ? { description: entity.hasExpertOpinion }
        : null,
      review: entity.hasExpertReview
        ? { description: entity.hasExpertReview }
        : null,
      comment: entity.hasExpertMention
        ? { description: entity.hasExpertMention }
        : null,
      video: entity.video,
      required_resources_description: entity.resourcesDescription,
      photo_file_id: entity.photo?.id ? entity.photo.id : null,
      gallery_file_ids:
        (entity.gallery
          ?.map((photo) => photo.id)
          .filter((id) => !!id) as number[]) || [],
      is_best_practice: entity.bestPracticeForLeadership,
      is_remote_format_possible: entity.canBeDistant,
      is_practice_placed_in_asi_smarteka: entity.isInASI,
    },

    experience: {
      results_in_journal:
        entity.resultsDescriptionInJournal ||
        entity.resultsDescriptionInJournalLink
          ? {
              description: entity.resultsDescriptionInJournal || null,
              link: entity.resultsDescriptionInJournalLink || null,
            }
          : null,
      results_of_various_events:
        entity.resultsInformationInDifferentLevelsEvents ||
        entity.resultsInformationInDifferentLevelsEventsLink
          ? {
              description:
                entity.resultsInformationInDifferentLevelsEvents || null,
              link:
                entity.resultsInformationInDifferentLevelsEventsLink || null,
            }
          : null,
      results_info_in_site:
        entity.resultsOnWebsite || entity.resultsOnWebsiteLink
          ? {
              description: entity.resultsOnWebsite || null,
              link: entity.resultsOnWebsiteLink || null,
            }
          : null,
      results_info_in_media:
        entity.resultsInformationInMassMedia ||
        entity.resultsInformationInMassMediaLink
          ? {
              description: entity.resultsInformationInMassMedia || null,
              link: entity.resultsInformationInMassMediaLink || null,
            }
          : null,
      results_seminars:
        entity.resultsMasterClasses || entity.resultsMasterClassesLink
          ? {
              description: entity.resultsMasterClasses || null,
              link: entity.resultsMasterClassesLink || null,
            }
          : null,
    },

    contacts: {
      fio: entity.responsible,
      phone: entity.contactNumber,
      email: entity.email,
    },

    // on front id is UUID, on backend id is number
    reporting_periods: entity.membersInfo.map((memberInfo) => ({
      id: isNaN(memberInfo.id) ? undefined : memberInfo.id,
      total: memberInfo.commonMembersCount,
      year: memberInfo.year,
      families: memberInfo.familiesCount,
      children: memberInfo.childrenCount,
      men: memberInfo.menCount,
      women: memberInfo.womenCount,
    })),
  };
};

export const generateCommonFromAPIPart = (
  entity: IFullAPIProject | IFullAPIEducationProgram | IFullAPISocialWork
) => {
  return {
    name: entity.primary.name,
    bestPracticeForLeadership: entity.primary.is_best_practice,
    annotation: entity.primary.annotation,
    purpose: entity.primary.purpose,
    tasks: entity.primary.objectives,
    realisationForCitizen: entity.primary.payment_method_id,
    canBeDistant: entity.primary.is_remote_format_possible,
    isInASI: entity.primary.is_practice_placed_in_asi_smarteka,
    partnership: entity.primary.partnership?.description ?? null,
    attractingVolunteer: entity.primary.volunteer_id,
    rnsuCategories: entity.primary.rnsu_category_ids,
    categories: entity.primary.needy_category_ids,
    groups: entity.primary.needy_category_target_group_ids,
    socialHelpForm: entity.primary.social_service_ids,
    circumstancesRecognitionNeed: entity.primary.need_recognition_ids,
    basicQualityResults: entity.primary.qualitative_results,
    socialResults: entity.primary.social_results,
    replicability: entity.primary.replicability,
    innovationGround: entity.primary.approbation?.description ?? null,
    hasExpertOpinion: entity.primary.expert_opinion?.description ?? null,
    hasExpertReview: entity.primary.review?.description ?? null,
    hasExpertMention: entity.primary.comment?.description ?? null,
    photo: entity.primary.photo_file
      ? {
          id: entity.primary.photo_file.id,
          name: entity.primary.photo_file.original_name,
          path: entity.primary.photo_file.path,
        }
      : null,
    gallery: entity.primary.gallery_files.map((gf) => {
      return {
        id: gf.id,
        name: gf.original_name,
        path: gf.path,
      };
    }),
    video: entity.primary.video,
    resourcesDescription: entity.primary.required_resources_description,

    resultsDescriptionInJournal:
      entity.experience.results_in_journal?.description ?? null,
    resultsDescriptionInJournalLink:
      entity.experience.results_in_journal?.link ?? null,
    resultsInformationInMassMedia:
      entity.experience.results_info_in_media?.description ?? null,
    resultsInformationInMassMediaLink:
      entity.experience.results_info_in_media?.link ?? null,
    resultsInformationInDifferentLevelsEvents:
      entity.experience.results_of_various_events?.description ?? null,
    resultsInformationInDifferentLevelsEventsLink:
      entity.experience.results_of_various_events?.link ?? null,
    resultsMasterClasses:
      entity.experience.results_seminars?.description ?? null,
    resultsMasterClassesLink: entity.experience.results_seminars?.link ?? null,
    resultsOnWebsite:
      entity.experience.results_info_in_site?.description ?? null,
    resultsOnWebsiteLink: entity.experience.results_info_in_site?.link ?? null,

    responsible: entity.contacts.fio,
    contactNumber: entity.contacts.phone,
    email: entity.contacts.email,

    membersInfo: entity.reporting_periods.map((rp) => {
      return {
        id: rp.id,
        commonMembersCount: rp.total,
        familiesCount: rp.families,
        childrenCount: rp.children,
        menCount: rp.men,
        womenCount: rp.women,
        year: rp.year,
      };
    }),

    id: entity.id,
    status:
      EProposalStatus[
        entity.status.toUpperCase() as keyof typeof EProposalStatus
      ],
    cause: entity.rejected_status_description,
    isBest: entity.is_favorite,

    // for non-admin interfaces is_deleted is just undefined
    isDeleted: !!entity.is_deleted,
  };
};
