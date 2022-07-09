import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { EntityCreationSteps } from 'components';
import { ProjectCreationStepsInterface } from 'components/entities';
import { Action, Button, Text } from 'components/kit';
import { useAuth, useErrors, useInfos } from 'hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProjectData } from 'types/entities/entities';
import { IProjectState } from 'types/entities/states';
import { EEntityPartition, EProposalStatus } from 'types/enums';
import { IInputsState } from 'types/interfaces';
import { mapProjectToAPI } from 'utils/entities/project';
import { registerInput, registerNumberInput } from 'utils/inputs';
import {
  numberInputValidator,
  textInputValidator,
  validateAll,
} from 'utils/validators';
import styles from './ProjectCreationPage.module.scss';

const CURRENT_STEPS_NUMBER = 4;

export const ProjectCreationPage = () => {
  const navigate = useNavigate();

  const { handleLogout } = useAuth();

  const { addInfo } = useInfos();
  const { addError } = useErrors();

  const [modalState, setModalState] = useState(false);

  const [fetchInProgress, setFetchInProgress] = useState(false);

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
    projectStatus: -1,
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
        commonMembersCount: registerNumberInput(
          undefined,
          numberInputValidator
        ),
        familiesCount: registerNumberInput(undefined, numberInputValidator),
        childrenCount: registerNumberInput(undefined, numberInputValidator),
        menCount: registerNumberInput(undefined, numberInputValidator),
        womenCount: registerNumberInput(undefined, numberInputValidator),
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

  const handleMembersEntryChange = (
    partition: EEntityPartition,
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const validationResult = (membersPartition.membersInfo[index] as any)[
      e.target.name
    ].validator(e.target.value);

    const newMembersInfoEntry = {
      ...membersPartition.membersInfo[index],
      [e.target.name]: {
        ...(membersPartition.membersInfo[index] as any)[e.target.name],
        value: e.target.value !== '' ? e.target.value : undefined,
        error: {
          exist: !validationResult.success,
          text: validationResult.text,
        },
      },
    };

    const newMembersInfo = [...membersPartition.membersInfo];
    newMembersInfo[index] = newMembersInfoEntry;

    setMembersPartition({
      ...membersPartition,
      membersInfo: newMembersInfo,
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

  const handleAddMembersEntry = () => {
    setMembersPartition({
      ...membersPartition,
      membersInfo: [
        ...membersPartition.membersInfo,
        {
          commonMembersCount: registerNumberInput(
            undefined,
            numberInputValidator
          ),
          familiesCount: registerNumberInput(undefined, numberInputValidator),
          childrenCount: registerNumberInput(undefined, numberInputValidator),
          menCount: registerNumberInput(undefined, numberInputValidator),
          womenCount: registerNumberInput(undefined, numberInputValidator),
          year: registerNumberInput(undefined, numberInputValidator),
        },
      ],
    });
  };

  const handleRemoveMembersEntry = (index: number) => {
    setMembersPartition({
      ...membersPartition,
      membersInfo: membersPartition.membersInfo.filter(
        (entry, entryIndex) => entryIndex !== index
      ),
    });
  };

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNextStep = () => {
    const isValidationSuccessful = validatePartition();
    if (isValidationSuccessful) {
      if (currentStep !== 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSave();
      }
    } else {
      if (currentStep !== 3) {
        addError(
          'Проверьте все поля на правильность и заполните все обязательные поля (со знаком *)'
        );
      } else {
        addError(
          'Проверьте все поля на правильность и заполните все поля в отчетном периоде'
        );
      }
    }
  };

  const validatePartition = () => {
    switch (currentStep) {
      case 0: {
        const needValidation = {
          //required
          name: mainPartition.name,
          //not required
          purpose: mainPartition.purpose.value.length
            ? mainPartition.purpose
            : null,
          tasks: mainPartition.tasks.value.length ? mainPartition.tasks : null,
          period: mainPartition.period.value.length
            ? mainPartition.period
            : null,
          technologies: mainPartition.technologies.value.length
            ? mainPartition.technologies
            : null,
          annotation: mainPartition.annotation.value.length
            ? mainPartition.annotation
            : null,
          organisator: mainPartition.organisator.value.length
            ? mainPartition.organisator
            : null,
          basicQualityResults: mainPartition.basicQualityResults.value.length
            ? mainPartition.basicQualityResults
            : null,
          basicAmountResults: mainPartition.basicAmountResults.value.length
            ? mainPartition.basicAmountResults
            : null,
          diagnosticInstruments: mainPartition.diagnosticInstruments.value
            .length
            ? mainPartition.diagnosticInstruments
            : null,
          briefResourcesDescription: mainPartition.briefResourcesDescription
            .value.length
            ? mainPartition.briefResourcesDescription
            : null,
          bestPractiseForLeadership: mainPartition.bestPractiseForLeadership
            .value.length
            ? mainPartition.bestPractiseForLeadership
            : null,
          socialResult: mainPartition.socialResult.value.length
            ? mainPartition.socialResult
            : null,
          video: mainPartition.video.value.length ? mainPartition.video : null,
          prevalence: mainPartition.prevalence.value.length
            ? mainPartition.prevalence
            : null,
        };

        const validationSuccess = validateAll(
          Object.values(needValidation)
            .filter((val) => !!val)
            .map((val) => ({
              value: val!.value,
              validator: val!.validator,
            }))
        );

        const selectSuccess =
          mainPartition.realisationForCitizen !== -1 &&
          mainPartition.attractingVolunteer !== -1 &&
          mainPartition.projectStatus !== -1 &&
          mainPartition.category !== -1 &&
          mainPartition.kind !== -1 &&
          mainPartition.worksName !== -1 &&
          mainPartition.circumstancesRecognitionNeed !== -1 &&
          mainPartition.socialHelpForm !== -1 &&
          mainPartition.rnsuCategory !== -1;

        const multipleSelectSuccess =
          mainPartition.groups.length && mainPartition.partners.length;

        return validationSuccess && selectSuccess && multipleSelectSuccess;
      }
      case 1: {
        const needValidation = {
          resultsInformationInMassMedia: expieriencePartition
            .resultsInformationInMassMedia.value.length
            ? expieriencePartition.resultsInformationInMassMedia
            : null,
          resultsInformationInMassMediaLink: expieriencePartition
            .resultsInformationInMassMediaLink.value.length
            ? expieriencePartition.resultsInformationInMassMediaLink
            : null,
          resultsInformationInRadio: expieriencePartition
            .resultsInformationInRadio.value.length
            ? expieriencePartition.resultsInformationInRadio
            : null,
          resultsInformationInRadioLink: expieriencePartition
            .resultsInformationInRadioLink.value.length
            ? expieriencePartition.resultsInformationInRadioLink
            : null,
          resultsInformationInTV: expieriencePartition.resultsInformationInTV
            .value.length
            ? expieriencePartition.resultsInformationInTV
            : null,
          resultsInformationInTVLink: expieriencePartition
            .resultsInformationInTVLink.value.length
            ? expieriencePartition.resultsInformationInTVLink
            : null,
          resultsDescriptionInJournal: expieriencePartition
            .resultsDescriptionInJournal.value.length
            ? expieriencePartition.resultsDescriptionInJournal
            : null,
          resultsDescriptionInJournalLink: expieriencePartition
            .resultsDescriptionInJournalLink.value.length
            ? expieriencePartition.resultsDescriptionInJournalLink
            : null,
          resultsInformationInDifferentLevelsEvents: expieriencePartition
            .resultsInformationInDifferentLevelsEvents.value.length
            ? expieriencePartition.resultsInformationInDifferentLevelsEvents
            : null,
          resultsInformationInDifferentLevelsEventsLink: expieriencePartition
            .resultsInformationInDifferentLevelsEventsLink.value.length
            ? expieriencePartition.resultsInformationInDifferentLevelsEventsLink
            : null,
          resultsMasterClasses: expieriencePartition.resultsMasterClasses.value
            .length
            ? expieriencePartition.resultsMasterClasses
            : null,
          resultsMasterClassesLink: expieriencePartition
            .resultsMasterClassesLink.value.length
            ? expieriencePartition.resultsMasterClassesLink
            : null,
          resultsOnWebsite: expieriencePartition.resultsOnWebsite.value.length
            ? expieriencePartition.resultsOnWebsite
            : null,
          resultsOnWebsiteLink: expieriencePartition.resultsOnWebsiteLink.value
            .length
            ? expieriencePartition.resultsOnWebsiteLink
            : null,
        };

        const validationSuccess = validateAll(
          Object.values(needValidation)
            .filter((val) => !!val)
            .map((val) => ({
              value: val!.value,
              validator: val!.validator,
            }))
        );

        return validationSuccess;
      }
      case 2: {
        const needValidation = {
          responsible: contactsPartition.responsible.value.length
            ? contactsPartition.responsible
            : null,
          contactNumber: contactsPartition.contactNumber.value.length
            ? contactsPartition.contactNumber
            : null,
          email: contactsPartition.email.value.length
            ? contactsPartition.email
            : null,
        };

        const validationSuccess = validateAll(
          Object.values(needValidation)
            .filter((val) => !!val)
            .map((val) => ({
              value: val!.value,
              validator: val!.validator,
            }))
        );

        return validationSuccess;
      }
      case 3: {
        for (const membersInfoEntry of membersPartition.membersInfo) {
          // if not any field is fullfilled - skip entity
          if (
            (membersInfoEntry.commonMembersCount.value === null ||
              membersInfoEntry.commonMembersCount.value === undefined) &&
            (membersInfoEntry.year.value === null ||
              membersInfoEntry.year.value === undefined) &&
            (membersInfoEntry.familiesCount.value === null ||
              membersInfoEntry.familiesCount.value === undefined) &&
            (membersInfoEntry.childrenCount.value === null ||
              membersInfoEntry.childrenCount.value === undefined) &&
            (membersInfoEntry.menCount.value === null ||
              membersInfoEntry.menCount.value === undefined) &&
            (membersInfoEntry.womenCount.value === null ||
              membersInfoEntry.womenCount.value === undefined)
          ) {
            continue;
          }

          // if any field is fullfilled and any validation fails - fails partition validation
          if (
            !membersInfoEntry.commonMembersCount.validator(
              membersInfoEntry.commonMembersCount.value
            ).success ||
            !membersInfoEntry.year.validator(membersInfoEntry.year.value)
              .success ||
            !membersInfoEntry.familiesCount.validator(
              membersInfoEntry.familiesCount.value
            ).success ||
            !membersInfoEntry.childrenCount.validator(
              membersInfoEntry.childrenCount.value
            ).success ||
            !membersInfoEntry.menCount.validator(
              membersInfoEntry.menCount.value
            ).success ||
            !membersInfoEntry.womenCount.validator(
              membersInfoEntry.womenCount.value
            ).success
          ) {
            return false;
          }
        }

        return true;
      }
      default:
        return true;
    }
  };

  const handleSave = async () => {
    toggleModal();
    setFetchInProgress(true);

    try {
      const stateValues: Partial<IProjectData> = {
        ...mainPartition,
        ...expieriencePartition,
        ...contactsPartition,
        ...membersPartition,

        name: mainPartition.name.value,
        purpose: mainPartition.purpose.value,
        tasks: mainPartition.tasks.value,
        period: mainPartition.period.value,
        technologies: mainPartition.technologies.value,
        annotation: mainPartition.annotation.value,
        organisator: mainPartition.organisator.value,
        basicQualityResults: mainPartition.basicQualityResults.value,
        basicAmountResults: mainPartition.basicAmountResults.value,
        diagnosticInstruments: mainPartition.diagnosticInstruments.value,
        briefResourcesDescription:
          mainPartition.briefResourcesDescription.value,
        bestPractiseForLeadership:
          mainPartition.bestPractiseForLeadership.value,
        socialResult: mainPartition.socialResult.value,
        video: mainPartition.video.value,
        prevalence: mainPartition.prevalence.value,

        resultsInformationInMassMedia:
          expieriencePartition.resultsInformationInMassMedia.value,
        resultsInformationInMassMediaLink:
          expieriencePartition.resultsInformationInMassMediaLink.value,
        resultsInformationInRadio:
          expieriencePartition.resultsInformationInRadio.value,
        resultsInformationInRadioLink:
          expieriencePartition.resultsInformationInRadioLink.value,
        resultsInformationInTV:
          expieriencePartition.resultsInformationInTV.value,
        resultsInformationInTVLink:
          expieriencePartition.resultsInformationInTVLink.value,
        resultsDescriptionInJournal:
          expieriencePartition.resultsDescriptionInJournal.value,
        resultsDescriptionInJournalLink:
          expieriencePartition.resultsDescriptionInJournalLink.value,
        resultsInformationInDifferentLevelsEvents:
          expieriencePartition.resultsInformationInDifferentLevelsEvents.value,
        resultsInformationInDifferentLevelsEventsLink:
          expieriencePartition.resultsInformationInDifferentLevelsEventsLink
            .value,
        resultsMasterClasses: expieriencePartition.resultsMasterClasses.value,
        resultsMasterClassesLink:
          expieriencePartition.resultsMasterClassesLink.value,
        resultsOnWebsite: expieriencePartition.resultsOnWebsite.value,
        resultsOnWebsiteLink: expieriencePartition.resultsOnWebsiteLink.value,

        responsible: contactsPartition.responsible.value,
        contactNumber: contactsPartition.contactNumber.value,
        email: contactsPartition.email.value,

        membersInfo: membersPartition.membersInfo
          .filter(
            (entry) =>
              entry.commonMembersCount.value !== null &&
              entry.commonMembersCount.value !== undefined &&
              entry.year.value !== null &&
              entry.year.value !== undefined &&
              entry.familiesCount.value !== null &&
              entry.familiesCount.value !== undefined &&
              entry.childrenCount.value !== null &&
              entry.childrenCount.value !== undefined &&
              entry.menCount.value !== null &&
              entry.menCount.value !== undefined &&
              entry.womenCount.value !== null &&
              entry.womenCount.value !== undefined
          )
          .map((entry) => ({
            commonMembersCount: Number(entry.commonMembersCount.value!),
            year: Number(entry.year.value!),
            familiesCount: Number(entry.familiesCount.value!),
            childrenCount: Number(entry.childrenCount.value!),
            menCount: Number(entry.menCount.value!),
            womenCount: Number(entry.womenCount.value!),
          })),

        status: EProposalStatus['PENDING'],
        cause: null,
        isBest: false,
      };

      const { data } = await API.project.create(
        mapProjectToAPI(stateValues as IProjectData, false)
      );

      addInfo(
        'Новая заявка успешно создана и отправлена на рассмотрение в ГИМЦ «Семья»'
      );
      navigate('/projects');
    } catch (e) {
      setFetchInProgress(false);

      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при обновлении данных профиля!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
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
        onMembersEntryChange={handleMembersEntryChange}
        onAddMembersEntry={handleAddMembersEntry}
        onRemoveMembersEntry={handleRemoveMembersEntry}
      />
      <div className={styles.controls}>
        <Button
          className={styles.controls__button}
          onClick={!fetchInProgress ? handleNextStep : undefined}
          isLoading={fetchInProgress}
        >
          {currentStep + 1 === CURRENT_STEPS_NUMBER ? (
            <Text isMedium>Сохранить</Text>
          ) : (
            <Text isMedium>
              {currentStep + 1}/{CURRENT_STEPS_NUMBER} Следующий шаг
            </Text>
          )}
        </Button>
        {!!currentStep && (
          <Action
            text="Назад"
            onClick={!fetchInProgress ? handlePrevStep : undefined}
          />
        )}
      </div>
    </>
  );
};
