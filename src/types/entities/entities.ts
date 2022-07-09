import { EProposalStatus } from 'types/enums';

export interface IExpierienceHelpers {
  resultsInformationInMassMedia: boolean;
  resultsInformationInRadio: boolean;
  resultsInformationInTV: boolean;
  resultsDescriptionInJournal: boolean;
  resultsInformationInDifferentLevelsEvents: boolean;
  resultsMasterClasses: boolean;
  resultsOnWebsite: boolean;
}

export interface IMainHelpers {
  organisatorOrMember: boolean;
}

export interface IProjectMainPartition {
  name: string; //наименование проекта
  purpose: string; //Цель проекта
  tasks: string; //Основные задачи
  period: string; //Период реализации проекта
  technologies: string; //Технологии, формы, методы
  annotation: string; //Аннотация
  isMemberAndNotOrganisator: boolean; //Свитчер для Организатор/участник
  organisator: string | null; //Организатор/участник
  realisationForCitizen: number; //Реализация для гражданина
  attractingVolunteer: number; //Привлечение добровольцев и волонтеров
  projectStatus: number; //Статус проекта
  category: number; //Категория
  groups: number[]; //Целевые группы
  kind: number; //Вид услуги
  worksName: number; //Наименование работ
  partners: number[]; //Партнеры
  circumstancesRecognitionNeed: number; //Обстоятельства признания нуждаемости
  socialHelpForm: number; //Форма социального обслуживания (сопровождения)
  rnsuCategory: number; //Категория по РНСУ
  photo: any; //Фотография
  basicQualityResults: string; //Основные качественные результаты реализации проекта
  basicAmountResults: string; //Основные количественные результаты
  diagnosticInstruments: string; //Диагностический инструментарий оценки результатов
  briefResourcesDescription: string; //Краткое описание необходимого ресурсного обеспечения
  bestPractiseForLeadership: string; //Лучшая практика по мнению руководства организации
  socialResult: string; //Социальный результат
  video: string; //Видеоролик
  prevalence: string; //Распространенность
  canBeDistant: boolean; //Возможность реализации в дистанционном формате
  innovationGround: boolean; //Апробация на инновационной площадке
  hasExpertOpinion: boolean; //Наличие экспертного заключения
  hasExpertReview: boolean; //Наличие экспертного рецензии
  hasExpertMention: boolean; //Наличие экспертного отзыва
}

export interface IProjectExpieriencePartition {
  hasResultsInformationInMassMedia: boolean;
  resultsInformationInMassMedia: string; //Представление информации о результатах в районных, городских СМИ
  resultsInformationInMassMediaLink: string;
  hasResultsInformationInRadio: boolean;
  resultsInformationInRadio: string; //Представление информации о результатах на радио
  resultsInformationInRadioLink: string;
  hasResultsInformationInTV: boolean;
  resultsInformationInTV: string; //Представление информации о результатах на телевидении
  resultsInformationInTVLink: string;
  hasResultsDescriptionInJournal: boolean;
  resultsDescriptionInJournal: string; //Описание результатов в виде статьи, опубликованной в сборнике, журнале
  resultsDescriptionInJournalLink: string;
  hasResultsInformationInDifferentLevelsEvents: boolean;
  resultsInformationInDifferentLevelsEvents: string; //Представление результатов на мероприятиях различного уровня
  resultsInformationInDifferentLevelsEventsLink: string;
  hasResultsMasterClasses: boolean;
  resultsMasterClasses: string; //Проведение мастер-классов (семинаров) по результатам
  resultsMasterClassesLink: string;
  hasResultsOnWebsite: boolean;
  resultsOnWebsite: string; //Проведение информации о результатах на сайте учреждения
  resultsOnWebsiteLink: string;
}

export interface IProjectContactsPartition {
  responsible: string; //ФИО ответственного лица
  contactNumber: string; //Контактный телефон
  email: string; //Электронная почта
}

export interface IProjectMembersPartition {
  membersInfo: IMembersInfo[];
}

export interface ICommonEntityMetadata {
  status: EProposalStatus;
  cause: string | null;
  isBest: boolean;
}

export interface IProjectData
  extends IProjectMainPartition,
    IProjectExpieriencePartition,
    IProjectContactsPartition,
    IProjectMembersPartition,
    ICommonEntityMetadata {
  // main partition
  // expierience partition
  // contacts partition
  // members partition
}

export interface IMembersInfo {
  commonMembersCount: number;
  familiesCount: number;
  childrenCount: number;
  menCount: number;
  womenCount: number;
  year: number;
}

export interface IAPIProject {
  // main partition
  name: string; //наименование проекта
  purpose: string | null; //Цель проекта
  tasks: string | null; //Основные задачи
  period: string | null; //Период реализации проекта
  technologies: string | null; //Технологии, формы, методы
  annotation: string | null; //Аннотация
  organisator: string | null; //Организатор/участник
  realisationForCitizen: number; //Реализация для гражданина
  attractingVolunteer: number; //Привлечение добровольцев и волонтеров
  projectStatus: number; //Статус проекта
  category: number; //Категория
  groups: number[]; //Целевые группы
  kind: number; //Вид услуги
  worksName: number; //Наименование работ
  partners: number[]; //Партнеры
  circumstancesRecognitionNeed: number; //Обстоятельства признания нуждаемости
  socialHelpForm: number; //Форма социального обслуживания (сопровождения)
  rnsuCategory: number; //Категория по РНСУ
  photo: any; //Фотография
  basicQualityResults: string | null; //Основные качественные результаты реализации проекта
  basicAmountResults: string | null; //Основные количественные результаты
  diagnosticInstruments: string | null; //Диагностический инструментарий оценки результатов
  briefResourcesDescription: string | null; //Краткое описание необходимого ресурсного обеспечения
  bestPractiseForLeadership: string | null; //Лучшая практика по мнению руководства организации
  socialResult: string | null; //Социальный результат
  video: string | null; //Видеоролик
  prevalence: string | null; //Распространенность
  canBeDistant: boolean; //Возможность реализации в дистанционном формате
  innovationGround: boolean; //Апробация на инновационной площадке
  hasExpertOpinion: boolean; //Наличие экспертного заключения
  hasExpertReview: boolean; //Наличие экспертного рецензии
  hasExpertMention: boolean; //Наличие экспертного отзыва

  // expierience partition
  resultsInformationInMassMedia: IAPIOptionalResult | null;
  resultsInformationInRadio: IAPIOptionalResult | null;
  resultsInformationInTV: IAPIOptionalResult | null;
  resultsDescriptionInJournal: IAPIOptionalResult | null;
  resultsInformationInDifferentLevelsEvents: IAPIOptionalResult | null;
  resultsMasterClasses: IAPIOptionalResult | null;
  resultsOnWebsite: IAPIOptionalResult | null;

  // contacts partition
  responsible: string | null; //ФИО ответственного лица
  contactNumber: string | null; //Контактный телефон
  email: string | null; //Электронная почта

  // members partition
  membersInfo: IMembersInfo[];

  //additional
  status: string;
  rejected_status_description: string | null;
  isBest: boolean;
}

interface IAPIOptionalResult {
  description: string | null;
  link: string | null;
}
