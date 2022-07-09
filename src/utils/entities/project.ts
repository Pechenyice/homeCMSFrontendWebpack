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
        isBest: project.isBest,
      };

  return {
    name: project.name,
    purpose: project.purpose || null,
    tasks: project.tasks || null,
    period: project.period || null,
    technologies: project.technologies || null,
    annotation: project.annotation || null,
    organisator: project.organisator || null,
    realisationForCitizen: project.realisationForCitizen,
    attractingVolunteer: project.attractingVolunteer,
    projectStatus: project.projectStatus,
    category: project.category,
    groups: project.groups,
    kind: project.kind,
    worksName: project.worksName,
    partners: project.partners,
    circumstancesRecognitionNeed: project.circumstancesRecognitionNeed,
    socialHelpForm: project.socialHelpForm,
    rnsuCategory: project.rnsuCategory,
    photo: project.photo,
    basicQualityResults: project.basicQualityResults || null,
    basicAmountResults: project.basicAmountResults || null,
    diagnosticInstruments: project.diagnosticInstruments || null,
    briefResourcesDescription: project.briefResourcesDescription || null,
    bestPractiseForLeadership: project.bestPractiseForLeadership || null,
    socialResult: project.socialResult || null,
    video: project.video || null,
    prevalence: project.prevalence || null,
    canBeDistant: project.canBeDistant,
    innovationGround: project.innovationGround,
    hasExpertOpinion: project.hasExpertOpinion,
    hasExpertReview: project.hasExpertReview,
    hasExpertMention: project.hasExpertMention,

    resultsInformationInMassMedia:
      project.resultsInformationInMassMedia ||
      project.resultsInformationInMassMediaLink
        ? {
            description: project.resultsInformationInMassMedia || null,
            link: project.resultsInformationInMassMediaLink || null,
          }
        : null,
    resultsInformationInRadio:
      project.resultsInformationInRadio || project.resultsInformationInRadioLink
        ? {
            description: project.resultsInformationInRadio || null,
            link: project.resultsInformationInRadioLink || null,
          }
        : null,
    resultsInformationInTV:
      project.resultsInformationInTV || project.resultsInformationInTVLink
        ? {
            description: project.resultsInformationInTV || null,
            link: project.resultsInformationInTVLink || null,
          }
        : null,
    resultsDescriptionInJournal:
      project.resultsDescriptionInJournal ||
      project.resultsDescriptionInJournalLink
        ? {
            description: project.resultsDescriptionInJournal || null,
            link: project.resultsDescriptionInJournalLink || null,
          }
        : null,
    resultsInformationInDifferentLevelsEvents:
      project.resultsInformationInDifferentLevelsEvents ||
      project.resultsInformationInDifferentLevelsEventsLink
        ? {
            description:
              project.resultsInformationInDifferentLevelsEvents || null,
            link: project.resultsInformationInDifferentLevelsEventsLink || null,
          }
        : null,
    resultsMasterClasses:
      project.resultsMasterClasses || project.resultsMasterClassesLink
        ? {
            description: project.resultsMasterClasses || null,
            link: project.resultsMasterClassesLink || null,
          }
        : null,
    resultsOnWebsite:
      project.resultsOnWebsite || project.resultsOnWebsiteLink
        ? {
            description: project.resultsOnWebsite || null,
            link: project.resultsOnWebsiteLink || null,
          }
        : null,

    responsible: project.responsible || null,
    contactNumber: project.contactNumber || null,
    email: project.email || null,

    membersInfo: project.membersInfo,

    ...addon,
  };
};

mapProjectToAPI;
