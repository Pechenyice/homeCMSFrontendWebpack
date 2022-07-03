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
  organisator: string; //Организатор/участник
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
  resultsInformationInMassMedia: string; //Представление информации о результатах в районных, городских СМИ
  resultsInformationInMassMediaLink: string;
  resultsInformationInRadio: string; //Представление информации о результатах на радио
  resultsInformationInRadioLink: string;
  resultsInformationInTV: string; //Представление информации о результатах на телевидении
  resultsInformationInTVLink: string;
  resultsDescriptionInJournal: string; //Описание результатов в виде статьи, опубликованной в сборнике, журнале
  resultsDescriptionInJournalLink: string;
  resultsInformationInDifferentLevelsEvents: string; //Представление результатов на мероприятиях различного уровня
  resultsInformationInDifferentLevelsEventsLink: string;
  resultsMasterClasses: string; //Проведение мастер-классов (семинаров) по результатам
  resultsMasterClassesLink: string;
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