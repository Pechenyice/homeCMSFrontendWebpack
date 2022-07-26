import { API } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { EntityCreationSteps } from 'components';
import { ProjectCreationStepsInterface } from 'components/entities';
import { Action, Button, Text } from 'components/kit';
import { useAuth, useErrors, useInfos } from 'hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProjectData } from 'types/entities/entities';
import { IProjectState, IProjectSwitchers } from 'types/entities/states';
import { EEntityPartition, EProposalStatus } from 'types/enums';
import { IInputsState } from 'types/interfaces';
import { isValueProvided, simpleUuid } from 'utils/common';
import { mapProjectToAPI } from 'utils/entities/project';
import { registerInput, registerNumberInput } from 'utils/inputs';
import {
  annotationValidator,
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

  const [switchers, setSwitchers] = useState<IProjectSwitchers>({
    hasResultsDescriptionInJournal: false,
    hasResultsInformationInMassMedia: false,
    hasResultsInformationInDifferentLevelsEvents: false,
    hasResultsMasterClasses: false,
    hasResultsOnWebsite: false,
    organisator: false,
    partnership: false,
    innovationGround: false,
    hasExpertOpinion: false,
    hasExpertReview: false,
    hasExpertMention: false,
  });

  const [mainPartition, setMainPartition] = useState<
    IProjectState['mainPartition']
  >({
    name: registerInput('', textInputValidator), //Наименование
    bestPracticeForLeadership: false, //Лучшая практика по мнению руководства организации
    annotation: registerInput('', annotationValidator), //Аннотация
    purpose: registerInput('', textInputValidator), //Цель проекта
    tasks: registerInput('', textInputValidator), //Основные задачи
    organisator: registerInput('', textInputValidator), //Организатор/участник
    period: registerInput('', textInputValidator), //Период реализации проекта
    realisationForCitizen: -1, //Реализация для гражданина
    canBeDistant: false, //Возможность реализации в дистанционном формате
    organizationLevel: -1, //Уровень реализации проекта
    partnership: registerInput('', textInputValidator),
    attractingVolunteer: -1, //Привлечение добровольцев и волонтеров
    rnsuCategories: [], //Категории по РНСУ
    categories: [], //Категории
    groups: [], //Целевые группы
    worksKinds: [], //Вид услуги
    worksNames: [], //Наименования услуг
    gosWorkNames: [], //Наименование государственной работы
    circumstancesRecognitionNeed: [], //Обстоятельства признания нуждаемости
    socialHelpForm: [], //Форма социального обслуживания (сопровождения)
    basicQualityResults: registerInput('', textInputValidator), //Основные качественные результаты
    socialResults: registerInput('', textInputValidator), //Социальный результаты
    replicability: registerInput('', textInputValidator), //Тиражируемость
    innovationGround: registerInput('', textInputValidator), //Апробация на инновационной площадке
    hasExpertOpinion: registerInput('', textInputValidator), //Наличие экспертного заключения
    hasExpertReview: registerInput('', textInputValidator), //Наличие экспертного рецензии
    hasExpertMention: registerInput('', textInputValidator), //Наличие экспертного отзыва
    photo: {
      path: null,
      name: null,
    }, //Фотография
    gallery: [], //Галерея
    video: registerInput('', textInputValidator), //Видеоролик
    resourcesDescription: registerInput('', textInputValidator), //Краткое описание необходимого ресурсного обеспечения
  });

  const [expieriencePartition, setExpieriencePartition] = useState<
    IProjectState['expieriencePartition']
  >({
    resultsDescriptionInJournal: registerInput('', textInputValidator), //Описание результатов в виде статьи, опубликованной в сборнике, журнале
    resultsDescriptionInJournalLink: registerInput('', textInputValidator),
    resultsInformationInMassMedia: registerInput('', textInputValidator), //Представление информации о результатах в СМИ
    resultsInformationInMassMediaLink: registerInput('', textInputValidator),
    resultsInformationInDifferentLevelsEvents: registerInput(
      '',
      textInputValidator
    ), //Представление результатов на мероприятиях различного уровня
    resultsInformationInDifferentLevelsEventsLink: registerInput(
      '',
      textInputValidator
    ),
    resultsMasterClasses: registerInput('', textInputValidator), //Проведение мастер-классов (семинаров) по результатам
    resultsMasterClassesLink: registerInput('', textInputValidator),
    resultsOnWebsite: registerInput('', textInputValidator), //Проведение информации о результатах на сайте учреждения
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
        id: simpleUuid(),
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

  const handleSwitcherChange = (switcherName: string, value: boolean) => {
    setSwitchers({ ...switchers, [switcherName]: value });
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

  const handlePhotoChange = (
    partition: EEntityPartition,
    name: string,
    photoPath: string | null,
    photoName: string | null
  ) => {
    const [state, setState] = selectPartition(partition);

    (setState as any)({
      ...state,
      [name]: {
        path: photoPath,
        name: photoName,
      },
    });
  };

  const handleAddMembersEntry = () => {
    setMembersPartition({
      ...membersPartition,
      membersInfo: [
        ...membersPartition.membersInfo,
        {
          id: simpleUuid(),
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

  const handleRemoveMembersEntry = (id: any) => {
    setMembersPartition({
      ...membersPartition,
      membersInfo: membersPartition.membersInfo.filter(
        (entry) => entry.id !== id
      ),
    });
  };

  const handleMembersEntryChange = (
    partition: EEntityPartition,
    id: any,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const targetElem = membersPartition.membersInfo.find(
      (info) => info.id === id
    );

    if (!targetElem) return;

    const validationResult = (targetElem as any)[e.target.name].validator(
      e.target.value
    );

    const newMembersInfoEntry = {
      ...targetElem,
      [e.target.name]: {
        ...(targetElem as any)[e.target.name],
        value: e.target.value !== '' ? e.target.value : undefined,
        error: {
          exist: !validationResult.success,
          text: validationResult.text,
        },
      },
    };

    const newMembersInfo = [
      ...membersPartition.membersInfo.filter((info) => info.id !== id),
      newMembersInfoEntry,
    ];

    setMembersPartition({
      ...membersPartition,
      membersInfo: newMembersInfo,
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
    if (!isValidationSuccessful) {
      if (currentStep !== 3) {
        addError(
          'Проверьте все поля на правильность и заполните все обязательные поля (со знаком *)'
        );
      } else {
        addError(
          'Проверьте все поля на правильность и заполните все поля в отчетном периоде'
        );
      }
      return;
    }

    if (currentStep !== 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSave();
    }
  };

  const validatePartition = () => {
    switch (currentStep) {
      case 0: {
        const needValidation = {
          //required
          name: mainPartition.name,
          annotation: mainPartition.annotation,
          purpose: mainPartition.purpose,
          tasks: mainPartition.tasks,
          period: mainPartition.period,
          basicQualityResults: mainPartition.basicQualityResults,
          socialResults: mainPartition.socialResults,
          resourcesDescription: mainPartition.resourcesDescription,

          //required on switch checked
          organisator: switchers.organisator ? mainPartition.organisator : null,
          partnership: switchers.partnership ? mainPartition.partnership : null,
          innovationGround: switchers.innovationGround
            ? mainPartition.innovationGround
            : null,
          hasExpertOpinion: switchers.hasExpertOpinion
            ? mainPartition.hasExpertOpinion
            : null,
          hasExpertReview: switchers.hasExpertReview
            ? mainPartition.hasExpertReview
            : null,
          hasExpertMention: switchers.hasExpertMention
            ? mainPartition.hasExpertMention
            : null,

          //not required
          replicability: mainPartition.replicability.value.length
            ? mainPartition.replicability
            : null,
          video: mainPartition.video.value.length ? mainPartition.video : null,
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
          mainPartition.organizationLevel !== -1 &&
          mainPartition.attractingVolunteer !== -1;

        const multipleSelectSuccess =
          mainPartition.rnsuCategories.length &&
          mainPartition.categories.length &&
          mainPartition.groups.length &&
          mainPartition.circumstancesRecognitionNeed.length &&
          mainPartition.socialHelpForm.length;

        // if work kind is selected, work name must be selected too
        const optionalMultipleSelectSuccess = mainPartition.worksKinds.length
          ? mainPartition.worksNames.length
          : false;

        return (
          validationSuccess &&
          selectSuccess &&
          multipleSelectSuccess &&
          optionalMultipleSelectSuccess
        );
      }
      case 1: {
        const needValidation = {
          resultsDescriptionInJournal: switchers.hasResultsDescriptionInJournal
            ? expieriencePartition.resultsDescriptionInJournal
            : null,
          resultsDescriptionInJournalLink:
            switchers.hasResultsDescriptionInJournal &&
            expieriencePartition.resultsDescriptionInJournalLink.value.length
              ? expieriencePartition.resultsDescriptionInJournal
              : null,
          resultsInformationInMassMedia: switchers.hasResultsInformationInMassMedia
            ? expieriencePartition.resultsInformationInMassMedia
            : null,
          resultsInformationInMassMediaLink:
            switchers.hasResultsInformationInMassMedia &&
            expieriencePartition.resultsInformationInMassMediaLink.value.length
              ? expieriencePartition.resultsInformationInMassMediaLink
              : null,
          resultsInformationInDifferentLevelsEvents: switchers.hasResultsInformationInDifferentLevelsEvents
            ? expieriencePartition.resultsInformationInDifferentLevelsEvents
            : null,
          resultsInformationInDifferentLevelsEventsLink:
            switchers.hasResultsInformationInDifferentLevelsEvents &&
            expieriencePartition.resultsInformationInDifferentLevelsEventsLink
              .value.length
              ? expieriencePartition.resultsInformationInDifferentLevelsEventsLink
              : null,
          resultsMasterClasses: switchers.hasResultsMasterClasses
            ? expieriencePartition.resultsMasterClasses
            : null,
          resultsMasterClassesLink:
            switchers.hasResultsMasterClasses &&
            expieriencePartition.resultsMasterClassesLink.value.length
              ? expieriencePartition.resultsMasterClassesLink
              : null,
          resultsOnWebsite: switchers.hasResultsOnWebsite
            ? expieriencePartition.resultsOnWebsite
            : null,
          resultsOnWebsiteLink:
            switchers.hasResultsOnWebsite &&
            expieriencePartition.resultsOnWebsiteLink.value.length
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
          responsible: contactsPartition.responsible,
          contactNumber: contactsPartition.contactNumber,
          email: contactsPartition.email,
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

          // if required fields validation fails - fails partition validation
          if (
            !membersInfoEntry.commonMembersCount.validator(
              membersInfoEntry.commonMembersCount.value
            ).success ||
            !membersInfoEntry.year.validator(membersInfoEntry.year.value)
              .success
          ) {
            return false;
          }

          // if any field is fullfilled and any validation fails - fails partition validation
          if (
            (isValueProvided(membersInfoEntry.familiesCount.value) &&
              !membersInfoEntry.familiesCount.validator(
                membersInfoEntry.familiesCount.value
              ).success) ||
            (isValueProvided(membersInfoEntry.childrenCount.value) &&
              !membersInfoEntry.childrenCount.validator(
                membersInfoEntry.childrenCount.value
              ).success) ||
            (isValueProvided(membersInfoEntry.menCount.value) &&
              !membersInfoEntry.menCount.validator(
                membersInfoEntry.menCount.value
              ).success) ||
            (isValueProvided(membersInfoEntry.womenCount.value) &&
              !membersInfoEntry.womenCount.validator(
                membersInfoEntry.womenCount.value
              ).success)
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
        annotation: mainPartition.annotation.value,
        purpose: mainPartition.purpose.value,
        tasks: mainPartition.tasks.value,
        organisator: mainPartition.organisator.value || null,
        period: mainPartition.period.value,
        partnership: mainPartition.partnership.value || null,
        basicQualityResults: mainPartition.basicQualityResults.value,
        socialResults: mainPartition.socialResults.value,
        replicability: mainPartition.replicability.value || null,
        innovationGround: mainPartition.innovationGround.value || null,
        hasExpertOpinion: mainPartition.hasExpertOpinion.value || null,
        hasExpertReview: mainPartition.hasExpertReview.value || null,
        hasExpertMention: mainPartition.hasExpertMention.value || null,
        video: mainPartition.video.value || null,
        resourcesDescription: mainPartition.resourcesDescription.value,

        worksKinds: mainPartition.worksKinds.length
          ? mainPartition.worksKinds
          : null,
        worksNames: mainPartition.worksNames.length
          ? mainPartition.worksNames
          : null,
        gosWorkNames: mainPartition.gosWorkNames.length
          ? mainPartition.gosWorkNames
          : null,

        //TODO: maybe refactor - photo is controlled by path, not name
        photo: mainPartition.photo.path ? mainPartition.photo : null,
        gallery: mainPartition.gallery.length ? mainPartition.gallery : null,

        resultsDescriptionInJournal:
          expieriencePartition.resultsDescriptionInJournal.value || null,
        resultsDescriptionInJournalLink:
          expieriencePartition.resultsDescriptionInJournalLink.value || null,
        resultsInformationInMassMedia:
          expieriencePartition.resultsInformationInMassMedia.value || null,
        resultsInformationInMassMediaLink:
          expieriencePartition.resultsInformationInMassMediaLink.value || null,
        resultsInformationInDifferentLevelsEvents:
          expieriencePartition.resultsInformationInDifferentLevelsEvents
            .value || null,
        resultsInformationInDifferentLevelsEventsLink:
          expieriencePartition.resultsInformationInDifferentLevelsEventsLink
            .value || null,
        resultsMasterClasses:
          expieriencePartition.resultsMasterClasses.value || null,
        resultsMasterClassesLink:
          expieriencePartition.resultsMasterClassesLink.value || null,
        resultsOnWebsite: expieriencePartition.resultsOnWebsite.value || null,
        resultsOnWebsiteLink:
          expieriencePartition.resultsOnWebsiteLink.value || null,

        responsible: contactsPartition.responsible.value,
        contactNumber: contactsPartition.contactNumber.value,
        email: contactsPartition.email.value,

        membersInfo: membersPartition.membersInfo
          .filter(
            (entry) =>
              isValueProvided(entry.commonMembersCount.value) &&
              isValueProvided(entry.year.value)
          )
          .map((entry) => ({
            commonMembersCount: Number(entry.commonMembersCount.value!),
            year: Number(entry.year.value!),
            familiesCount: isValueProvided(entry.familiesCount.value)
              ? Number(entry.familiesCount.value)
              : null,
            childrenCount: isValueProvided(entry.childrenCount.value)
              ? Number(entry.childrenCount.value)
              : null,
            menCount: isValueProvided(entry.menCount.value)
              ? Number(entry.menCount.value)
              : null,
            womenCount: isValueProvided(entry.womenCount.value)
              ? Number(entry.womenCount.value)
              : null,
          })),

        status: EProposalStatus['PENDING'],
        cause: null,
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
        switchers={switchers}
        mainPartition={mainPartition}
        expieriencePartition={expieriencePartition}
        contactsPartition={contactsPartition}
        membersPartition={membersPartition}
        onChange={handleChange}
        onSwitcherChange={handleSwitcherChange}
        onSelectChange={handleSelectChange}
        onMultipleSelectChange={handleMultipleSelectChange}
        onCheckToggle={handleCheckToggle}
        onMembersEntryChange={handleMembersEntryChange}
        onAddMembersEntry={handleAddMembersEntry}
        onRemoveMembersEntry={handleRemoveMembersEntry}
        onPhotoChange={handlePhotoChange}
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
