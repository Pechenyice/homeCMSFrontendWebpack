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
  status: number; //Статус проекта
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

export interface IProjectData extends IProjectMainPartition, IProjectExpieriencePartition, IProjectContactsPartition, IProjectMembersPartition {
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