import { IAPIFileInfo, IInput } from 'types/interfaces';
import {
  IAPICommonContactsPart,
  IAPICommonExpieriencePart,
  IAPIMembersInfo,
  IAPIOptionalDescriptionResult,
  IAPICommonFullPrimaryPart,
  IAPICommonPrimaryPart,
  ICommonEntityMetadata,
  IContactsPartition,
  IExpieriencePartition,
  IFileInput,
  IFullAPIMembersInfo,
  IMembersPartition,
} from '../entities';
import {
  ICommonContactsPartitionState,
  ICommonExpieriencePartitionState,
  ICommonMembersPartitionState,
  ICommonSwitchers,
} from '../states';

export interface IMethodologyData
  extends IMethodologyMainPartition,
    IExpieriencePartition,
    IContactsPartition,
    IMembersPartition,
    ICommonEntityMetadata {
  // main partition
  // expierience partition
  // contacts partition
  // members partition
}

export interface IMethodologyMainPartition {
  direction: number; //Направленность
  prevalence: number; //Распространенность методики
  activityOrganizationForm: number; //Форма организации деятельности при реализации технологии/методики
  applicationPeriod: number; //Период применения (продолжительность реализации)
  authors: string | null; //Автор(ы) (составитель) технологии/методики, информация о согласовании (при наличии)
  publicationLink: string | null; //Ссылка на публикацию
  effectivenessStudy: string | null; //Исследование эффективности или доказательности методики/технологии
  effectivenessStudyLink: string | null; //Ссылка на Исследование эффективности или доказательности методики/технологии
  realizedCycles: string; //Количество реализованных полных циклов
  cycleDuration: string; //Продолжительность одного цикла
  worksKinds: number[] | null; //Вид услуги
  worksNames: number[] | null; //Наименования услуг
  gosWorkNames: number[] | null; //Наименование государственной работы

  //common
  name: string; //Наименование
  bestPracticeForLeadership: boolean; //Лучшая практика по мнению руководства организации
  annotation: string; //Аннотация
  purpose: string; //Цель проекта
  tasks: string; //Основные задачи
  //[Removed 12.10.2022 by clients correction] realisationForCitizen: number; //Реализация для гражданина
  canBeDistant: boolean; //Возможность реализации в дистанционном формате
  isInASI: boolean; //Практика размещена в АСИ "Смартека"
  partnership: string | null;
  attractingVolunteer: number; //Привлечение добровольцев и волонтеров
  rnsuCategories: number[]; //Категории по РНСУ
  categories: number[]; //Категории
  groups: number[]; //Целевые группы
  socialHelpForm: number[]; //Форма социального обслуживания (сопровождения)
  circumstancesRecognitionNeed: number[]; //Обстоятельства признания нуждаемости
  basicQualityResults: string; //Основные качественные результаты
  socialResults: string; //Социальный результаты
  replicability: string | null; //Тиражируемость
  innovationGround: string | null; //Апробация на инновационной площадке
  hasExpertOpinion: string | null; //Наличие экспертного заключения
  hasExpertReview: string | null; //Наличие экспертного рецензии
  hasExpertMention: string | null; //Наличие экспертного отзыва
  photo: IFileInput | null; //Фотография
  gallery: IFileInput[] | null; //Галерея
  video: string | null; //Видеоролик
  resourcesDescription: string; //Краткое описание необходимого ресурсного обеспечения
}

export interface IAPIMethodology {
  //common info
  primary: IAPICommonPrimaryPart;

  //info
  info: IAPIMethodologyInfoPart;

  // expierience partition
  experience: IAPICommonExpieriencePart;

  // contacts partition
  contacts: IAPICommonContactsPart;

  // members partition
  reporting_periods: IAPIMembersInfo[];
}

export interface IFullAPIMethodology
  extends Omit<IAPIMethodology, 'primary' | 'reporting_periods'> {
  primary: IAPICommonFullPrimaryPart;

  reporting_periods: IFullAPIMembersInfo[];

  id: number;
  status: string;
  rejected_status_description: string | null;
  is_favorite: boolean;
  is_deleted: boolean;
}

export interface IAPIMethodologyInfoPart {
  direction_id: number;
  prevalence_id: number;
  activity_organization_form_id: number;
  application_period_id: number;
  authors: string | null;
  publication_link: string | null;
  effectiveness_study: string | null;
  effectiveness_study_link: string | null;
  realized_cycles: string;
  cycle_duration: string;
  public_work_ids: number[];
  service_type_ids: number[];
  service_name_ids: number[];
}

/**
 *
 *
 *
 * State
 *
 */

export interface IMethodologySwitchers extends ICommonSwitchers {}

export interface IMethodologyState {
  // main partition
  mainPartition: {
    direction: number; //Направленность
    prevalence: number; //Распространенность методики
    activityOrganizationForm: number; //Форма организации деятельности при реализации технологии/методики
    applicationPeriod: number; //Период применения (продолжительность реализации)
    authors: IInput; //Автор(ы) (составитель) технологии/методики, информация о согласовании (при наличии)
    publicationLink: IInput; //Ссылка на публикацию
    effectivenessStudy: IInput; //Исследование эффективности или доказательности методики/технологии
    effectivenessStudyLink: IInput; //Ссылка на Исследование эффективности или доказательности методики/технологии
    realizedCycles: IInput; //Количество реализованных полных циклов
    cycleDuration: IInput; //Продолжительность одного цикла
    worksKinds: number[]; //Вид услуги
    worksNames: number[]; //Наименования услуг
    gosWorkNames: number[]; //Наименование государственной работы

    //common
    name: IInput; //Наименование
    bestPracticeForLeadership: boolean; //Лучшая практика по мнению руководства организации
    annotation: IInput; //Аннотация
    purpose: IInput; //Цель проекта
    tasks: IInput; //Основные задачи
    //[Removed 12.10.2022 by clients correction] realisationForCitizen: number; //Реализация для гражданина
    canBeDistant: boolean; //Возможность реализации в дистанционном формате
    isInASI: boolean; //Практика размещена в АСИ "Смартека"
    partnership: IInput;
    attractingVolunteer: number; //Привлечение добровольцев и волонтеров
    rnsuCategories: number[]; //Категории по РНСУ
    categories: number[]; //Категории
    groups: number[]; //Целевые группы
    socialHelpForm: number[]; //Форма социального обслуживания (сопровождения)
    circumstancesRecognitionNeed: number[]; //Обстоятельства признания нуждаемости
    basicQualityResults: IInput; //Основные качественные результаты
    socialResults: IInput; //Социальный результаты
    replicability: IInput; //Тиражируемость
    innovationGround: IInput; //Апробация на инновационной площадке
    hasExpertOpinion: IInput; //Наличие экспертного заключения
    hasExpertReview: IInput; //Наличие экспертного рецензии
    hasExpertMention: IInput; //Наличие экспертного отзыва
    photo: IFileInput; //Фотография
    gallery: IFileInput[]; //Галерея
    video: IInput; //Видеоролик
    resourcesDescription: IInput; //Краткое описание необходимого ресурсного обеспечения
  };

  // expierience partition
  expieriencePartition: ICommonExpieriencePartitionState;

  // contacts partition
  contactsPartition: ICommonContactsPartitionState;

  // members partition
  membersPartition: ICommonMembersPartitionState;
}
