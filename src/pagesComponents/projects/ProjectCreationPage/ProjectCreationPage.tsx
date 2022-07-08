import { EntityCreationSteps } from 'components';
import { ProjectCreationStepsInterface } from 'components/entities';
import { Action, Button, Text } from 'components/kit';
import { useErrors } from 'hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { IProjectState } from 'types/entities/states';
import { EEntityPartition } from 'types/enums';
import { IInputsState } from 'types/interfaces';
import { registerInput, registerNumberInput } from 'utils/inputs';
import {
  numberInputValidator,
  textInputValidator,
  validateAll,
} from 'utils/validators';
import styles from './ProjectCreationPage.module.scss';

const CURRENT_STEPS_NUMBER = 4;

export const ProjectCreationPage = () => {
  const { addError } = useErrors();

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
    isMemberAndNotOrganisator: false,
    organisator: registerInput('', textInputValidator),
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

  const [expieriencePartition, setExpieriencePartition] = useState<
    IProjectState['expieriencePartition']
  >({
    hasResultsInformationInMassMedia: false,
    resultsInformationInMassMedia: registerInput('', textInputValidator),
    resultsInformationInMassMediaLink: registerInput('', textInputValidator),
    hasResultsInformationInRadio: false,
    resultsInformationInRadio: registerInput('', textInputValidator),
    resultsInformationInRadioLink: registerInput('', textInputValidator),
    hasResultsInformationInTV: false,
    resultsInformationInTV: registerInput('', textInputValidator),
    resultsInformationInTVLink: registerInput('', textInputValidator),
    hasResultsDescriptionInJournal: false,
    resultsDescriptionInJournal: registerInput('', textInputValidator),
    resultsDescriptionInJournalLink: registerInput('', textInputValidator),
    hasResultsInformationInDifferentLevelsEvents: false,
    resultsInformationInDifferentLevelsEvents: registerInput(
      '',
      textInputValidator
    ),
    resultsInformationInDifferentLevelsEventsLink: registerInput(
      '',
      textInputValidator
    ),
    hasResultsMasterClasses: false,
    resultsMasterClasses: registerInput('', textInputValidator),
    resultsMasterClassesLink: registerInput('', textInputValidator),
    hasResultsOnWebsite: false,
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
      case EEntityPartition.EXPIERIENCE:
        return [expieriencePartition, setExpieriencePartition];
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
    const isValidationSuccessful = validatePartition();
    if (isValidationSuccessful) {
      setCurrentStep(currentStep + 1);
    } else {
      addError(
        'Проверьте все поля на правильность и заполните все обязательные поля (со знаком *)'
      );
    }
  };

  const validatePartition = () => {
    switch (currentStep) {
      case 0: {
        const needValidation = {
          name: mainPartition.name,
        };

        const validationSuccess = validateAll(
          Object.values(needValidation).map((val) => ({
            value: val.value,
            validator: val.validator,
          }))
        );

        return validationSuccess;
      }
      default:
        return true;
    }
  };

  return (
    <>
      <EntityCreationSteps active={currentStep} />
      <ProjectCreationStepsInterface
        active={currentStep}
        mainPartition={mainPartition}
        expieriencePartition={expieriencePartition}
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
