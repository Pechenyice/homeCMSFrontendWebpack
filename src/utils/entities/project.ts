import { IAPIProject, IProjectData } from 'types/entities/entities';
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

mapProjectToAPI;
