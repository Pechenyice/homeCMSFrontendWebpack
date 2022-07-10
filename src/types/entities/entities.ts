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
  //common info
  primary_info: {
    name: string; //наименование проекта
    purpose: string | null; //Цель проекта
    objectives: string | null; //Основные задачи
    annotation: string | null; //Аннотация
    main_results: /* TODO: переименовать */ string | null; //Основные качественные результаты реализации проекта
    brief_description_of_resources: string | null; //Краткое описание необходимого ресурсного обеспечения
    best_practice: string | null; //Лучшая практика по мнению руководства организации
    social_outcome: string | null; //Социальный результат
    photo_file_path: string | null; //Фотография
    video_link: string | null; //Видеоролик
    implementation_for_citizen_id: number; //Реализация для гражданина
    category_id: number; //Категория
    form_of_social_service_id: number; //Форма социального обслуживания (сопровождения)
    engagement_of_volunteers_id: number; //Привлечение добровольцев и волонтеров
    target_group_ids: number[]; //Целевые группы
    is_possibility_in_remote: boolean; //Возможность реализации в дистанционном формате
    is_innovation_site: boolean; //Апробация на инновационной площадке
    is_has_expert_opinion: boolean; //Наличие экспертного заключения
    is_has_expert_review: boolean; //Наличие экспертного рецензии
    is_has_innovative_platform: /* TODO: переименовать */ boolean; //Наличие экспертного отзыва
  };

  //info
  info: {
    implementation_period: string | null; //Период реализации проекта
    technologies_forms_methods: string | null; //Технологии, формы, методы
    main_results: /* TODO: переименовать */ string | null; //Основные количественные результаты
    diagnostic_toolkit: string | null; //Диагностический инструментарий оценки результатов
    prevalence: string | null; //Распространенность
    is_participant: boolean; // true если поле ниже есть, по сути deprecated
    organizer: string | null; //Организатор/участник
    status_id: number; //Статус проекта
    service_type_id: number; //Вид услуги
    work_name_id: number; //Наименование работ
    recognition_of_need_id: number; //Обстоятельства признания нуждаемости
    rnsu_category_id: number; //Категория по РНСУ
    partner_ids: number[]; //Партнеры
  };

  // expierience partition
  experience: {
    results_in_district_and_media: IAPIOptionalResult | null;
    results_on_radio: IAPIOptionalResult | null;
    results_on_television: IAPIOptionalResult | null;
    results_in_article: IAPIOptionalResult | null;
    results_at_various_levels_events: IAPIOptionalResult | null;
    conducting_master_classes: IAPIOptionalResult | null;
    results_on_website_of_institution: IAPIOptionalResult | null;
  };

  // contacts partition
  contacts: {
    responsible_name: string | null; //ФИО ответственного лица
    phone: string | null; //Контактный телефон
    email: string | null; //Электронная почта
  };

  // members partition
  participants: IAPIMembersInfo[];

  // additional
  status: string;
  rejected_status_description: string | null;
  is_best: boolean;
}

export interface IAPIMembersInfo {
  total_number_of_participants: number;
  number_of_families: number;
  number_of_children: number;
  number_of_men: number;
  number_of_women: number;
  reporting_period_year: number;
}

export interface IAPIOptionalResult {
  desc: string | null;
  link: string | null;
}
