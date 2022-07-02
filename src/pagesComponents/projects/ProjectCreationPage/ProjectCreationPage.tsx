import { useState } from 'react';
import { IProjectState } from 'types/entities/states';
import { registerInput, registerNumberInput } from 'utils/inputs';
import { numberInputValidator, textInputValidator } from 'utils/validators';
import { ProjectCreationPresentational } from './ProjectCreation.presentational';
import styles from './ProjectCreationPage.module.scss';

export const ProjectCreationPage = () => {
  const [mainPartition, setMainPartition] = useState<
    IProjectState['mainPartition']
  >({
    purpose: registerInput('', textInputValidator),
    tasks: registerInput('', textInputValidator),
    period: registerInput('', textInputValidator),
    technologies: registerInput('', textInputValidator),
    annotation: registerInput('', textInputValidator),
    organisatorOrMember: -1,
    realisationForCitizen: -1,
    attractingVolunteer: -1,
    status: -1,
    category: -1,
    groups: -1,
    kind: -1,
    worksName: -1,
    partners: -1,
    circumstancesRecognitionNeed: -1,
    socialHelpForm: -1,
    rnsuCategory: -1,
    photo: undefined,
    basicQualityResults: registerInput('', textInputValidator),
    basicAmountResults: registerInput('', textInputValidator),
    diagnosticInstruments: registerInput('', textInputValidator),
    briefResourcesDescription: registerInput('', textInputValidator),
    bestPractiseForLeadership: registerInput('', textInputValidator),
    socialResult: registerInput('', textInputValidator),
    video: registerInput('', textInputValidator),
    prevalence: registerInput('', textInputValidator),
    canBeDistant: false,
    innovationGround: false,
    hasExpertOpinion: false,
    hasExpertReview: false,
    hasExpertMention: false,
  });

  const [
    expierienceHelpersPartition,
    setExpierienceHelpersPartition,
  ] = useState({
    resultsInformationInMassMedia: false,
    resultsInformationInRadio: false,
    resultsInformationInTV: false,
    resultsDescriptionInJournal: false,
    resultsInformationInDifferentLevelsEvents: false,
    resultsMasterClasses: false,
    resultsOnWebsite: false,
  });

  const [expieriencePartition, setExpieriencePartition] = useState<
    IProjectState['expieriencePartition']
  >({
    resultsInformationInMassMedia: registerInput('', textInputValidator),
    resultsInformationInMassMediaLink: registerInput('', textInputValidator),
    resultsInformationInRadio: registerInput('', textInputValidator),
    resultsInformationInRadioLink: registerInput('', textInputValidator),
    resultsInformationInTV: registerInput('', textInputValidator),
    resultsInformationInTVLink: registerInput('', textInputValidator),
    resultsDescriptionInJournal: registerInput('', textInputValidator),
    resultsDescriptionInJournalLink: registerInput('', textInputValidator),
    resultsInformationInDifferentLevelsEvents: registerInput(
      '',
      textInputValidator
    ),
    resultsInformationInDifferentLevelsEventsLink: registerInput(
      '',
      textInputValidator
    ),
    resultsMasterClasses: registerInput('', textInputValidator),
    resultsMasterClassesLink: registerInput('', textInputValidator),
    resultsOnWebsite: registerInput('', textInputValidator),
    resultsOnWebsiteLink: registerInput('', textInputValidator),
  });

  const [contactsPartition, setContactsPartition] = useState<
    IProjectState['contactsPartition']
  >({
    responsible: registerInput('', textInputValidator),
    contactNumber: registerInput('', textInputValidator),
    email: registerInput('', textInputValidator),
  });

  const [membersPartition, setMembersPartition] = useState<
    IProjectState['membersPartition']
  >({
    membersInfo: [
      {
        commonMembersCount: registerNumberInput(0, numberInputValidator),
        familiesCount: registerNumberInput(0, numberInputValidator),
        childrenCount: registerNumberInput(0, numberInputValidator),
        menCount: registerNumberInput(0, numberInputValidator),
        womenCount: registerNumberInput(0, numberInputValidator),
        year: registerNumberInput(
          new Date().getFullYear(),
          numberInputValidator
        ),
      },
    ],
  });

  return (
    <ProjectCreationPresentational
      mainPartition={mainPartition}
      expieriencePartition={expieriencePartition}
      expierienceHelpersPartition={expierienceHelpersPartition}
      contactsPartition={contactsPartition}
      membersPartition={membersPartition}
    />
  );
};
