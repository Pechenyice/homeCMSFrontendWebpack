import { EProposalStatus } from 'types/enums';

export interface IMainHelpers {
  organisatorOrMember: boolean;
}

export interface IFileInput {
  path: string | null;
  name: string | null;
}

export interface IProjectMainPartition {
  name: string; //Наименование
  bestPracticeForLeadership: boolean; //Лучшая практика по мнению руководства организации
  annotation: string; //Аннотация
  purpose: string; //Цель проекта
  tasks: string; //Основные задачи
  organisator: string | null; //Организатор/участник
  period: string; //Период реализации проекта
  realisationForCitizen: number; //Реализация для гражданина
  canBeDistant: boolean; //Возможность реализации в дистанционном формате
  organizationLevel: number; //Уровень реализации проекта
  partnership: string | null;
  attractingVolunteer: number; //Привлечение добровольцев и волонтеров
  rnsuCategories: number[]; //Категории по РНСУ
  categories: number[]; //Категории
  groups: number[]; //Целевые группы
  worksKinds: number[] | null; //Вид услуги
  worksNames: number[] | null; //Наименования услуг
  gosWorkNames: number[] | null; //Наименование государственной работы
  circumstancesRecognitionNeed: number[]; //Обстоятельства признания нуждаемости
  socialHelpForm: number[]; //Форма социального обслуживания (сопровождения)
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

export interface IExpieriencePartition {
  resultsDescriptionInJournal: string | null; //Описание результатов в виде статьи, опубликованной в сборнике, журнале
  resultsDescriptionInJournalLink: string | null;
  resultsInformationInMassMedia: string | null; //Представление информации о результатах в СМИ
  resultsInformationInMassMediaLink: string | null;
  resultsInformationInDifferentLevelsEvents: string | null; //Представление результатов на мероприятиях различного уровня
  resultsInformationInDifferentLevelsEventsLink: string | null;
  resultsMasterClasses: string | null; //Проведение мастер-классов (семинаров) по результатам
  resultsMasterClassesLink: string | null;
  resultsOnWebsite: string | null; //Проведение информации о результатах на сайте учреждения
  resultsOnWebsiteLink: string | null;
}

export interface IContactsPartition {
  responsible: string; //ФИО ответственного лица
  contactNumber: string; //Контактный телефон
  email: string; //Электронная почта
}

export interface IMembersPartition {
  membersInfo: IMembersInfo[];
}

export interface ICommonEntityMetadata {
  status: EProposalStatus;
  cause: string | null;
}

export interface IProjectData
  extends IProjectMainPartition,
    IExpieriencePartition,
    IContactsPartition,
    IMembersPartition,
    ICommonEntityMetadata {
  // main partition
  // expierience partition
  // contacts partition
  // members partition
}

export interface IMembersInfo {
  commonMembersCount: number;
  familiesCount: number | null;
  childrenCount: number | null;
  menCount: number | null;
  womenCount: number | null;
  year: number;
}

export interface IAPIProject {
  //common info
  primary_info: {
    name: string; //наименование проекта
    purpose: string | null; //Цель проекта
    objectives: string | null; //Основные задачи
    annotation: string | null; //Аннотация
    main_qualitative_results: string | null; //Основные качественные результаты реализации проекта
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
    is_has_expert_feedback: boolean; //Наличие экспертного отзыва
  };

  //info
  info: {
    implementation_period: string | null; //Период реализации проекта
    technologies_forms_methods: string | null; //Технологии, формы, методы
    main_quantitative_results: string | null; //Основные количественные результаты
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
