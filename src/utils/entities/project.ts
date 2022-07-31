import {
  IAPIProject,
  IFullAPIProject,
  IProjectData,
} from 'types/entities/entities';
import { EProposalStatus } from 'types/enums';

export const mapProjectToAPI = (
  project: IProjectData,
  forUpdate: boolean
): Partial<IAPIProject> => {
  const addon = forUpdate
    ? {}
    : {
        status: EProposalStatus[project.status].toLowerCase(),
        rejected_status_description: project.cause ?? '',
      };

  return {
    primary: {
      name: project.name,
      annotation: project.annotation,
      objectives: project.tasks,
      purpose: project.purpose,
      payment_method_id: project.realisationForCitizen,
      partnership: project.partnership
        ? { description: project.partnership }
        : null,
      volunteer_id: project.attractingVolunteer,
      needy_category_ids: project.categories,
      needy_category_target_group_ids: project.groups,
      social_service_ids: project.socialHelpForm,
      qualitative_results: project.basicQualityResults,
      social_results: project.socialResults,
      replicability: project.replicability,
      approbation: project.innovationGround
        ? { description: project.innovationGround }
        : null,
      expert_opinion: project.hasExpertOpinion
        ? { description: project.hasExpertOpinion }
        : null,
      review: project.hasExpertReview
        ? { description: project.hasExpertReview }
        : null,
      comment: project.hasExpertMention
        ? { description: project.hasExpertMention }
        : null,
      video: project.video,
      required_resources_description: project.resourcesDescription,
      photo_file_id: project.photo?.id ? project.photo.id : null,
      gallery_file_ids:
        (project.gallery
          ?.map((photo) => photo.id)
          .filter((id) => !!id) as number[]) || [],
      is_best_practice: project.bestPracticeForLeadership,
      is_remote_format_possible: project.canBeDistant,
    },

    info: {
      participant: project.organisator
        ? { description: project.organisator }
        : null,
      //TODO: it's textarea string, not nullable field, fix
      implementation_period: project.period
        ? { description: project.period }
        : null,
      implementation_level_id: project.organizationLevel,
      rnsu_category_ids: project.rnsuCategories,
      public_work_ids: project.gosWorkNames || [],
      service_type_ids: project.worksKinds || [],
      service_name_ids: project.worksNames || [],
      need_recognition_ids: project.circumstancesRecognitionNeed,
    },

    experience: {
      results_in_journal:
        project.resultsDescriptionInJournal ||
        project.resultsDescriptionInJournalLink
          ? {
              description: project.resultsDescriptionInJournal || null,
              link: project.resultsDescriptionInJournalLink || null,
            }
          : null,
      results_of_various_events:
        project.resultsInformationInDifferentLevelsEvents ||
        project.resultsInformationInDifferentLevelsEventsLink
          ? {
              description:
                project.resultsInformationInDifferentLevelsEvents || null,
              link:
                project.resultsInformationInDifferentLevelsEventsLink || null,
            }
          : null,
      results_info_in_site:
        project.resultsOnWebsite || project.resultsOnWebsiteLink
          ? {
              description: project.resultsOnWebsite || null,
              link: project.resultsOnWebsiteLink || null,
            }
          : null,
      results_info_in_media:
        project.resultsInformationInMassMedia ||
        project.resultsInformationInMassMediaLink
          ? {
              description: project.resultsInformationInMassMedia || null,
              link: project.resultsInformationInMassMediaLink || null,
            }
          : null,
      results_seminars:
        project.resultsMasterClasses || project.resultsMasterClassesLink
          ? {
              description: project.resultsMasterClasses || null,
              link: project.resultsMasterClassesLink || null,
            }
          : null,
    },

    contacts: {
      fio: project.responsible,
      phone: project.contactNumber,
      email: project.email,
    },

    reporting_periods: project.membersInfo.map((memberInfo) => ({
      total: memberInfo.commonMembersCount,
      year: memberInfo.year,
      families: memberInfo.familiesCount,
      children: memberInfo.childrenCount,
      men: memberInfo.menCount,
      women: memberInfo.womenCount,
    })),

    ...addon,
  };
};

export const mapProjectFromAPI = (project: IFullAPIProject): IProjectData => {
  return {
    name: project.primary.name,
    bestPracticeForLeadership: project.primary.is_best_practice,
    annotation: project.primary.annotation,
    purpose: project.primary.purpose,
    tasks: project.primary.objectives,
    organisator: project.info.participant?.description ?? null,
    //TODO: it's textarea string, not nullable field, fix
    period: project.info.implementation_period,
    realisationForCitizen: project.primary.payment_method_id,
    canBeDistant: project.primary.is_remote_format_possible,
    organizationLevel: project.info.implementation_level_id,
    partnership: project.primary.partnership?.description ?? null,
    attractingVolunteer: project.primary.volunteer_id,
    rnsuCategories: project.info.rnsu_category_ids,
    categories: project.primary.needy_category_ids,
    groups: project.primary.needy_category_target_group_ids,
    worksKinds: project.info.service_type_ids,
    worksNames: project.info.service_name_ids,
    gosWorkNames: project.info.public_work_ids,
    circumstancesRecognitionNeed: project.info.need_recognition_ids,
    socialHelpForm: project.primary.social_service_ids,

    basicQualityResults: project.primary.qualitative_results,
    socialResults: project.primary.social_results,
    replicability: project.primary.replicability,
    innovationGround: project.primary.approbation?.description ?? null,
    hasExpertOpinion: project.primary.expert_opinion?.description ?? null,
    hasExpertReview: project.primary.review?.description ?? null,
    hasExpertMention: project.primary.comment?.description ?? null,
    photo: project.primary.photo_file
      ? {
          id: project.primary.photo_file.id,
          name: project.primary.photo_file.original_name,
          path: project.primary.photo_file.path,
        }
      : null,
    gallery: project.primary.gallery_files.map((gf) => {
      return {
        id: gf.id,
        name: gf.original_name,
        path: gf.path,
      };
    }),
    video: project.primary.video,
    resourcesDescription: project.primary.required_resources_description,

    resultsDescriptionInJournal:
      project.experience.results_in_journal?.description ?? null,
    resultsDescriptionInJournalLink:
      project.experience.results_in_journal?.link ?? null,
    resultsInformationInMassMedia:
      project.experience.results_info_in_media?.description ?? null,
    resultsInformationInMassMediaLink:
      project.experience.results_info_in_media?.link ?? null,
    resultsInformationInDifferentLevelsEvents:
      project.experience.results_of_various_events?.description ?? null,
    resultsInformationInDifferentLevelsEventsLink:
      project.experience.results_of_various_events?.link ?? null,
    resultsMasterClasses:
      project.experience.results_seminars?.description ?? null,
    resultsMasterClassesLink: project.experience.results_seminars?.link ?? null,
    resultsOnWebsite:
      project.experience.results_info_in_site?.description ?? null,
    resultsOnWebsiteLink: project.experience.results_info_in_site?.link ?? null,

    responsible: project.contacts.fio,
    contactNumber: project.contacts.phone,
    email: project.contacts.email,

    membersInfo: project.reporting_periods.map((rp) => {
      return {
        commonMembersCount: rp.total,
        familiesCount: rp.families,
        childrenCount: rp.children,
        menCount: rp.men,
        womenCount: rp.women,
        year: rp.year,
      };
    }),

    id: project.id,
    status:
      EProposalStatus[
        project.status.toUpperCase() as keyof typeof EProposalStatus
      ],
    cause: project.rejected_status_description,
    isBest: project.is_best,
  };
};
