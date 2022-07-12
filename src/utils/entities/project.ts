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
        is_best: project.isBest,
      };

  return {
    primary_info: {
      name: project.name,
      purpose: project.purpose || null,
      objectives: project.tasks || null,
      annotation: project.annotation || null,
      main_qualitative_results: project.basicQualityResults || null,
      brief_description_of_resources: project.briefResourcesDescription || null,
      best_practice: project.bestPractiseForLeadership || null,
      social_outcome: project.socialResult || null,
      photo_file_path: project.photo.path,
      video_link: project.video || null,
      implementation_for_citizen_id: project.realisationForCitizen,
      category_id: project.category,
      form_of_social_service_id: project.socialHelpForm,
      engagement_of_volunteers_id: project.attractingVolunteer,
      target_group_ids: project.groups,
      is_possibility_in_remote: project.canBeDistant,
      is_innovation_site: project.innovationGround,
      is_has_expert_opinion: project.hasExpertOpinion,
      is_has_expert_review: project.hasExpertReview,
      is_has_expert_feedback: project.hasExpertMention,
    },

    info: {
      implementation_period: project.period || null,
      technologies_forms_methods: project.technologies || null,
      main_quantitative_results: project.basicAmountResults || null,
      diagnostic_toolkit: project.diagnosticInstruments || null,
      prevalence: project.prevalence || null,
      is_participant: !!project.organisator?.length || false,
      organizer: project.organisator || null,
      status_id: project.projectStatus,
      service_type_id: project.kind,
      work_name_id: project.worksName,
      recognition_of_need_id: project.circumstancesRecognitionNeed,
      rnsu_category_id: project.rnsuCategory,
      partner_ids: project.partners,
    },

    experience: {
      results_in_district_and_media:
        project.resultsInformationInMassMedia ||
        project.resultsInformationInMassMediaLink
          ? {
              desc: project.resultsInformationInMassMedia || null,
              link: project.resultsInformationInMassMediaLink || null,
            }
          : null,
      results_on_radio:
        project.resultsInformationInRadio ||
        project.resultsInformationInRadioLink
          ? {
              desc: project.resultsInformationInRadio || null,
              link: project.resultsInformationInRadioLink || null,
            }
          : null,
      results_on_television:
        project.resultsInformationInTV || project.resultsInformationInTVLink
          ? {
              desc: project.resultsInformationInTV || null,
              link: project.resultsInformationInTVLink || null,
            }
          : null,
      results_in_article:
        project.resultsDescriptionInJournal ||
        project.resultsDescriptionInJournalLink
          ? {
              desc: project.resultsDescriptionInJournal || null,
              link: project.resultsDescriptionInJournalLink || null,
            }
          : null,
      results_at_various_levels_events:
        project.resultsInformationInDifferentLevelsEvents ||
        project.resultsInformationInDifferentLevelsEventsLink
          ? {
              desc: project.resultsInformationInDifferentLevelsEvents || null,
              link:
                project.resultsInformationInDifferentLevelsEventsLink || null,
            }
          : null,
      conducting_master_classes:
        project.resultsMasterClasses || project.resultsMasterClassesLink
          ? {
              desc: project.resultsMasterClasses || null,
              link: project.resultsMasterClassesLink || null,
            }
          : null,
      results_on_website_of_institution:
        project.resultsOnWebsite || project.resultsOnWebsiteLink
          ? {
              desc: project.resultsOnWebsite || null,
              link: project.resultsOnWebsiteLink || null,
            }
          : null,
    },

    contacts: {
      responsible_name: project.responsible || null,
      phone: project.contactNumber || null,
      email: project.email || null,
    },

    participants: project.membersInfo.map((memberInfo) => ({
      total_number_of_participants: memberInfo.commonMembersCount,
      number_of_families: memberInfo.familiesCount,
      number_of_children: memberInfo.childrenCount,
      number_of_men: memberInfo.menCount,
      number_of_women: memberInfo.womenCount,
      reporting_period_year: memberInfo.year,
    })),

    ...addon,
  };
};

mapProjectToAPI;
