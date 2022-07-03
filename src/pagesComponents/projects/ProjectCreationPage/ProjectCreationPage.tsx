import { EntityCreationSteps } from 'components';
import { ProjectCreationStepsInterface } from 'components/entities';
import { Action, Button, Text } from 'components/kit';
import { ChangeEvent, useState } from 'react';
import { IProjectState } from 'types/entities/states';
import { EEntityPartition } from 'types/enums';
import { IInputsState } from 'types/interfaces';
import { registerInput, registerNumberInput } from 'utils/inputs';
import { numberInputValidator, textInputValidator } from 'utils/validators';
import styles from './ProjectCreationPage.module.scss';

const CURRENT_STEPS_NUMBER = 4;

export const ProjectCreationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [mainPartition, setMainPartition] = useState<
    IProjectState['mainPartition']
  >({
    name: registerInput('', textInputValidator),
    purpose: registerInput('', textInputValidator),
    tasks: registerInput('', textInputValidator),
    period: registerInput('', textInputValidator),
    technologies: registerInput('', textInputValidator),
    annotation: registerInput('', textInputValidator),
    organisatorOrMember: registerInput('', textInputValidator),
    realisationForCitizen: -1,
    attractingVolunteer: -1,
    status: -1,
    category: -1,
    groups: [],
    kind: -1,
    worksName: -1,
    partners: [],
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

  const [mainHelpersPartition, setMainHelpersPartition] = useState({
    organisatorOrMember: false,
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

  const selectPartition = (partition: EEntityPartition) => {
    switch (partition) {
      case EEntityPartition.MAIN:
        return [mainPartition, setMainPartition];
      case EEntityPartition.MAIN_HELPER:
        return [mainHelpersPartition, setMainHelpersPartition];
      case EEntityPartition.EXPIERIENCE:
        return [expieriencePartition, setExpieriencePartition];
      case EEntityPartition.EXPIERIENCE_HELPER:
        return [expierienceHelpersPartition, setExpierienceHelpersPartition];
      case EEntityPartition.CONTACTS:
        return [contactsPartition, setContactsPartition];
      case EEntityPartition.MEMBERS:
        return [membersPartition, setMembersPartition];
    }
  };

  const handleCheckToggle = (partition: EEntityPartition, name: string) => {
    const [state, setState] = selectPartition(partition);

    (setState as any)({
      ...state,
      [name]: !(state as any)[name],
    });
  };

  const handleMultipleSelectChange = (
    partition: EEntityPartition,
    name: string,
    option: number
  ) => {
    const [state, setState] = selectPartition(partition);

    (setState as any)({
      ...state,
      [name]: (state as any)[name].includes(option)
        ? (state as any)[name].filter((opt: number) => opt !== option)
        : [...(state as any)[name], option],
    });
  };

  const handleSelectChange = (
    partition: EEntityPartition,
    name: string,
    option: number
  ) => {
    const [state, setState] = selectPartition(partition);

    (setState as any)({
      ...state,
      [name]: option,
    });
  };

  const handleHelperChange = (
    partition: EEntityPartition,
    helperName: string,
    value: boolean
  ) => {
    const [state, setState] = selectPartition(partition);

    (setState as any)({
      ...state,
      [helperName]: value,
    });
  };

  const handleChange = (
    partition: EEntityPartition,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [state, setState] = selectPartition(partition);

    const [key, value] = [e.target.name, e.target.value];

    const validationResult = ((state as unknown) as IInputsState)[
      key
    ].validator(value);

    (setState as any)({
      ...state,
      [key]: {
        ...((state as unknown) as IInputsState)[key],
        value,
        error: {
          exist: !validationResult.success,
          text: validationResult.text,
        },
      },
    });
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <>
      <EntityCreationSteps active={currentStep} />
      <ProjectCreationStepsInterface
        active={currentStep}
        mainPartition={mainPartition}
        mainHelpersPartition={mainHelpersPartition}
        expieriencePartition={expieriencePartition}
        expierienceHelpersPartition={expierienceHelpersPartition}
        contactsPartition={contactsPartition}
        membersPartition={membersPartition}
        onChange={handleChange}
        onHelperChange={handleHelperChange}
        onSelectChange={handleSelectChange}
        onMultipleSelectChange={handleMultipleSelectChange}
        onCheckToggle={handleCheckToggle}
      />
      <div className={styles.controls}>
        <Button className={styles.controls__button} onClick={handleNextStep}>
          {currentStep + 1 === CURRENT_STEPS_NUMBER ? (
            <Text isMedium>Сохранить</Text>
          ) : (
            <Text isMedium>
              {currentStep + 1}/{CURRENT_STEPS_NUMBER} Следующий шаг
            </Text>
          )}
        </Button>
        {!!currentStep && <Action text="Назад" onClick={handlePrevStep} />}
      </div>
    </>
  );
};
