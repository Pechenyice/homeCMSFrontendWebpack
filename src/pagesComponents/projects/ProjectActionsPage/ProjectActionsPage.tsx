import { API, EEntity } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { EntityCreationSteps } from 'components';
import { EntityActionsStepsInterface } from 'components/entities/common/action/EntityActionsStepsInterface';
import { Action, Button, Modal, Text } from 'components/kit';
import { useAuth, useErrors, useInfos } from 'hooks';
import { getProjectKey } from 'hooks/queries/keys';
import { ChangeEvent, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IProjectData } from 'types/entities/project';
import { IProjectState, IProjectSwitchers } from 'types/entities/project';
import { EEntityPartition, EProposalStatus } from 'types/enums';
import { IFileInfo, IInputsState } from 'types/interfaces';
import { isValueProvided, simpleUuid } from 'utils/common';
import { mapProjectToAPI } from 'utils/entities/project';
import { registerInput, registerNumberInput } from 'utils/inputs';
import {
  annotationValidator,
  numberInputValidator,
  textInputValidator,
  validateAll,
} from 'utils/validators';
import styles from './ProjectActionsPage.module.scss';

const CURRENT_STEPS_NUMBER = 4;

type Props = {
  project: IProjectData | null;
};

export const ProjectActionsPage = ({ project }: Props) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { profile, handleLogout } = useAuth();

  const { addInfo } = useInfos();
  const { addError } = useErrors();

  const [modalState, setModalState] = useState(false);

  const [fetchInProgress, setFetchInProgress] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);

  const [switchers, setSwitchers] = useState<IProjectSwitchers>({
    hasResultsDescriptionInJournal:
      !!project?.resultsDescriptionInJournal ||
      !!project?.resultsDescriptionInJournalLink,
    hasResultsInformationInMassMedia:
      !!project?.resultsInformationInMassMedia ||
      !!project?.resultsInformationInMassMediaLink,
    hasResultsInformationInDifferentLevelsEvents:
      !!project?.resultsInformationInDifferentLevelsEvents ||
      !!project?.resultsInformationInDifferentLevelsEventsLink,
    hasResultsMasterClasses:
      !!project?.resultsMasterClasses || !!project?.resultsMasterClassesLink,
    hasResultsOnWebsite:
      !!project?.resultsOnWebsite || !!project?.resultsOnWebsiteLink,
    organisator: !!project?.organisator,
    partnership: !!project?.partnership,
    innovationGround: !!project?.innovationGround,
    hasExpertOpinion: !!project?.hasExpertOpinion,
    hasExpertReview: !!project?.hasExpertReview,
    hasExpertMention: !!project?.hasExpertMention,
  });

  const [mainPartition, setMainPartition] = useState<
    IProjectState['mainPartition']
  >({
    organisator: registerInput(project?.organisator ?? '', textInputValidator), //Организатор/участник
    period: registerInput(project?.period ?? '', textInputValidator), //Период реализации проекта
    organizationLevel: project?.organizationLevel ?? -1, //Уровень реализации проекта
    worksKinds: project?.worksKinds ?? [], //Вид услуги
    worksNames: project?.worksNames ?? [], //Наименования услуг
    gosWorkNames: project?.gosWorkNames ?? [], //Наименование государственной работы

    name: registerInput(project?.name ?? '', textInputValidator), //Наименование
    bestPracticeForLeadership: project?.bestPracticeForLeadership ?? false, //Лучшая практика по мнению руководства организации
    annotation: registerInput(project?.annotation ?? '', annotationValidator), //Аннотация
    purpose: registerInput(project?.purpose ?? '', textInputValidator), //Цель проекта
    tasks: registerInput(project?.tasks ?? '', textInputValidator), //Основные задачи
    realisationForCitizen: project?.realisationForCitizen ?? -1, //Реализация для гражданина
    canBeDistant: project?.canBeDistant ?? false, //Возможность реализации в дистанционном формате
    isInASI: project?.isInASI ?? false, //Возможность реализации в дистанционном формате
    partnership: registerInput(project?.partnership ?? '', textInputValidator),
    attractingVolunteer: project?.attractingVolunteer ?? -1, //Привлечение добровольцев и волонтеров
    rnsuCategories: project?.rnsuCategories ?? [], //Категории по РНСУ
    categories: project?.categories ?? [], //Категории
    groups: project?.groups ?? [], //Целевые группы
    socialHelpForm: project?.socialHelpForm ?? [], //Форма социального обслуживания (сопровождения)
    circumstancesRecognitionNeed: project?.circumstancesRecognitionNeed ?? [], //Обстоятельства признания нуждаемости
    basicQualityResults: registerInput(
      project?.basicQualityResults ?? '',
      textInputValidator
    ), //Основные качественные результаты
    socialResults: registerInput(
      project?.socialResults ?? '',
      textInputValidator
    ), //Социальный результаты
    replicability: registerInput(
      project?.replicability ?? '',
      textInputValidator
    ), //Тиражируемость
    innovationGround: registerInput(
      project?.innovationGround ?? '',
      textInputValidator
    ), //Апробация на инновационной площадке
    hasExpertOpinion: registerInput(
      project?.hasExpertOpinion ?? '',
      textInputValidator
    ), //Наличие экспертного заключения
    hasExpertReview: registerInput(
      project?.hasExpertReview ?? '',
      textInputValidator
    ), //Наличие экспертного рецензии
    hasExpertMention: registerInput(
      project?.hasExpertMention ?? '',
      textInputValidator
    ), //Наличие экспертного отзыва
    photo: project?.photo ?? {
      id: null,
      path: null,
      name: null,
    }, //Фотография
    gallery: project?.gallery ?? [], //Галерея
    video: registerInput(project?.video ?? '', textInputValidator), //Видеоролик
    resourcesDescription: registerInput(
      project?.resourcesDescription ?? '',
      textInputValidator
    ), //Краткое описание необходимого ресурсного обеспечения
  });

  const [expieriencePartition, setExpieriencePartition] = useState<
    IProjectState['expieriencePartition']
  >({
    resultsDescriptionInJournal: registerInput(
      project?.resultsDescriptionInJournal ?? '',
      textInputValidator
    ), //Описание результатов в виде статьи, опубликованной в сборнике, журнале
    resultsDescriptionInJournalLink: registerInput(
      project?.resultsDescriptionInJournalLink ?? '',
      textInputValidator
    ),
    resultsInformationInMassMedia: registerInput(
      project?.resultsInformationInMassMedia ?? '',
      textInputValidator
    ), //Представление информации о результатах в СМИ
    resultsInformationInMassMediaLink: registerInput(
      project?.resultsInformationInMassMediaLink ?? '',
      textInputValidator
    ),
    resultsInformationInDifferentLevelsEvents: registerInput(
      project?.resultsInformationInDifferentLevelsEvents ?? '',
      textInputValidator
    ), //Представление результатов на мероприятиях различного уровня
    resultsInformationInDifferentLevelsEventsLink: registerInput(
      project?.resultsInformationInDifferentLevelsEventsLink ?? '',
      textInputValidator
    ),
    resultsMasterClasses: registerInput(
      project?.resultsMasterClasses ?? '',
      textInputValidator
    ), //Проведение мастер-классов (семинаров) по результатам
    resultsMasterClassesLink: registerInput(
      project?.resultsMasterClassesLink ?? '',
      textInputValidator
    ),
    resultsOnWebsite: registerInput(
      project?.resultsOnWebsite ?? '',
      textInputValidator
    ), //Проведение информации о результатах на сайте учреждения
    resultsOnWebsiteLink: registerInput(
      project?.resultsOnWebsiteLink ?? '',
      textInputValidator
    ),
  });

  const [contactsPartition, setContactsPartition] = useState<
    IProjectState['contactsPartition']
  >({
    responsible: registerInput(project?.responsible ?? '', textInputValidator),
    contactNumber: registerInput(
      project?.contactNumber ?? '',
      textInputValidator
    ),
    email: registerInput(project?.email ?? '', textInputValidator),
  });

  const [membersPartition, setMembersPartition] = useState<
    IProjectState['membersPartition']
  >({
    membersInfo: project?.membersInfo.map((mi) => ({
      id: mi.id,
      commonMembersCount: registerNumberInput(
        mi.commonMembersCount,
        numberInputValidator
      ),
      familiesCount: registerNumberInput(
        mi.familiesCount ?? undefined,
        numberInputValidator
      ),
      childrenCount: registerNumberInput(
        mi.childrenCount ?? undefined,
        numberInputValidator
      ),
      menCount: registerNumberInput(
        mi.menCount ?? undefined,
        numberInputValidator
      ),
      womenCount: registerNumberInput(
        mi.womenCount ?? undefined,
        numberInputValidator
      ),
      year: registerNumberInput(mi.year, numberInputValidator),
    })) ?? [
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

  const handleMultipleParentSelectChange = (
    partition: EEntityPartition,
    name: string,
    child: string,
    option: number
  ) => {
    const [state, setState] = selectPartition(partition);

    (setState as any)({
      ...state,
      [name]: (state as any)[name].includes(option)
        ? (state as any)[name].filter((opt: number) => opt !== option)
        : [...(state as any)[name], option],
      [child]: [],
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
    photoId: number | null,
    photoPath: string | null,
    photoName: string | null
  ) => {
    const [state, setState] = selectPartition(partition);

    (setState as any)({
      ...state,
      [name]: {
        id: photoId,
        path: photoPath,
        name: photoName,
      },
    });
  };

  const handleGalleryPhotoAdd = (
    partition: EEntityPartition,
    name: string,
    photos: IFileInfo['file'][]
  ) => {
    const [state, setState] = selectPartition(partition);

    (setState as any)({
      ...state,
      [name]: [...((state as any)[name] as any), ...photos],
    });
  };

  const handleGalleryPhotoDelete = (
    partition: EEntityPartition,
    name: string,
    photoId: number
  ) => {
    const [state, setState] = selectPartition(partition);

    (setState as any)({
      ...state,
      [name]: [...((state as any)[name] as any)].filter(
        (photo: IFileInfo['file']) => photo.id !== photoId
      ),
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

    const newMembersInfo = [...membersPartition.membersInfo].map((mi) =>
      mi.id === id ? newMembersInfoEntry : mi
    );

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
      toggleModal();
    }
  };

  const handleEntityUpdate = () => {
    handleSave();
  };

  // organisator: string | null; //Организатор/участник
  // period: string; //Период реализации проекта
  // organizationLevel: number; //Уровень реализации проекта
  // worksKinds: number[] | null; //Вид услуги
  // worksNames: number[] | null; //Наименования услуг
  // gosWorkNames: number[] | null; //Наименование государственной работы

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
          !!mainPartition.rnsuCategories.length &&
          !!mainPartition.categories.length &&
          !!mainPartition.groups.length &&
          !!mainPartition.circumstancesRecognitionNeed.length &&
          !!mainPartition.socialHelpForm.length;

        // if work kind is selected, work name must be selected too
        const optionalMultipleSelectSuccess = !!mainPartition.worksKinds.length
          ? !!mainPartition.worksNames.length
          : true;

        return (
          validationSuccess &&
          selectSuccess &&
          multipleSelectSuccess &&
          optionalMultipleSelectSuccess
        );
      }
      case 1: {
        const needValidation = {
          resultsDescriptionInJournal:
            switchers.hasResultsDescriptionInJournal &&
            expieriencePartition.resultsDescriptionInJournal.value.length
              ? expieriencePartition.resultsDescriptionInJournal
              : null,
          resultsDescriptionInJournalLink:
            switchers.hasResultsDescriptionInJournal &&
            expieriencePartition.resultsDescriptionInJournalLink.value.length
              ? expieriencePartition.resultsDescriptionInJournalLink
              : null,
          resultsInformationInMassMedia:
            switchers.hasResultsInformationInMassMedia &&
            expieriencePartition.resultsInformationInMassMedia.value.length
              ? expieriencePartition.resultsInformationInMassMedia
              : null,
          resultsInformationInMassMediaLink:
            switchers.hasResultsInformationInMassMedia &&
            expieriencePartition.resultsInformationInMassMediaLink.value.length
              ? expieriencePartition.resultsInformationInMassMediaLink
              : null,
          resultsInformationInDifferentLevelsEvents:
            switchers.hasResultsInformationInDifferentLevelsEvents &&
            expieriencePartition.resultsInformationInDifferentLevelsEvents.value
              .length
              ? expieriencePartition.resultsInformationInDifferentLevelsEvents
              : null,
          resultsInformationInDifferentLevelsEventsLink:
            switchers.hasResultsInformationInDifferentLevelsEvents &&
            expieriencePartition.resultsInformationInDifferentLevelsEventsLink
              .value.length
              ? expieriencePartition.resultsInformationInDifferentLevelsEventsLink
              : null,
          resultsMasterClasses:
            switchers.hasResultsMasterClasses &&
            expieriencePartition.resultsMasterClasses.value.length
              ? expieriencePartition.resultsMasterClasses
              : null,
          resultsMasterClassesLink:
            switchers.hasResultsMasterClasses &&
            expieriencePartition.resultsMasterClassesLink.value.length
              ? expieriencePartition.resultsMasterClassesLink
              : null,
          resultsOnWebsite:
            switchers.hasResultsOnWebsite &&
            expieriencePartition.resultsOnWebsite.value.length
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
    setFetchInProgress(true);

    try {
      if (!profile?.id) throw new AuthError('Данные пользователя не найдены');

      const stateValues: Partial<IProjectData> = {
        ...mainPartition,
        ...expieriencePartition,
        ...contactsPartition,
        ...membersPartition,

        organisator: mainPartition.organisator.value || null,
        period: mainPartition.period.value,
        organizationLevel: mainPartition.organizationLevel,
        worksKinds: mainPartition.worksKinds.length
          ? mainPartition.worksKinds
          : null,
        worksNames: mainPartition.worksNames.length
          ? mainPartition.worksNames
          : null,
        gosWorkNames: mainPartition.gosWorkNames.length
          ? mainPartition.gosWorkNames
          : null,

        //common
        name: mainPartition.name.value,
        annotation: mainPartition.annotation.value,
        purpose: mainPartition.purpose.value,
        tasks: mainPartition.tasks.value,
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

        photo: mainPartition.photo.id ? mainPartition.photo : null,
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
            id: entry.id,
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

      if (!project) {
        await API.project.create(
          mapProjectToAPI(stateValues as IProjectData, false),
          profile.id
        );

        addInfo(
          'Новая заявка успешно создана и отправлена на рассмотрение в ГИМЦ «Семья»'
        );
      } else {
        await API.project.update(
          mapProjectToAPI(stateValues as IProjectData, false),
          project.id,
          profile.id
        );

        queryClient.invalidateQueries('project');

        addInfo(
          'Заявка успешно обновлена и отправлена на рассмотрение в ГИМЦ «Семья»'
        );
      }

      navigate('/projects');
    } catch (e) {
      setFetchInProgress(false);

      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при обновлении данных проекта!');
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
      <EntityActionsStepsInterface
        entity={EEntity.PROJECT}
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
        onMultipleParentSelectChange={handleMultipleParentSelectChange}
        onCheckToggle={handleCheckToggle}
        onMembersEntryChange={handleMembersEntryChange}
        onAddMembersEntry={handleAddMembersEntry}
        onRemoveMembersEntry={handleRemoveMembersEntry}
        onPhotoChange={handlePhotoChange}
        onGalleryPhotosAdd={handleGalleryPhotoAdd}
        onGalleryPhotoDelete={handleGalleryPhotoDelete}
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
      <Modal
        isOpen={modalState}
        text="Вы точно хотите отправить заявку на рассмотрение  в ГИМЦ «Семья»?"
        submitText="Отправить"
        cancelText="Отменить"
        onSubmit={handleEntityUpdate}
        onCancel={toggleModal}
      />
    </>
  );
};
