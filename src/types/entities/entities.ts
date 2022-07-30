import { EProposalStatus } from 'types/enums';

export interface IMainHelpers {
  organisatorOrMember: boolean;
}

export interface IFileInput {
  id: number | null;
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
  primary: {
    name: string; //наименование проекта
    annotation: string; //Аннотация
    objectives: string; //Основные задачи
    purpose: string; //Цель проекта
    payment_method_id: number; //Реализация для гражданина бесплатно/платно
    partnership: IAPIOptionalDescriptionResult | null; //Взаимодействие, партнерство с другими организациями
    volunteer_id: number; //Привлечение добровольцев и волонтеров
    needy_category_ids: number[]; //Категории
    needy_category_target_group_ids: number[]; // Целевые группы
    social_service_ids: number[]; //Форма социального обслуживания (сопровождения)
    qualitative_results: string; //Основные качественные результаты
    social_results: string; //Социальные результаты
    replicability: string | null; // Тиражируемость
    approbation: IAPIOptionalDescriptionResult | null; //	Апробация на инновационной площадке/в ресурсном центре
    expert_opinion: IAPIOptionalDescriptionResult | null; //Наличие экспертного заключения
    review: IAPIOptionalDescriptionResult | null; //Наличие отзыва
    comment: IAPIOptionalDescriptionResult | null; //Наличие рецензии
    video: string | null; //Видео ролик
    required_resources_description: string; //Краткое описание необходимого ресурсного обеспечения
    photo_file_id: number | null; //ID файла обложки
    gallery_file_ids: number[]; //Галерея
    is_best_practice: boolean; //Лучшая практика по мнению руководства организации
    is_remote_format_possible: boolean; //Возможность реализации в дистанционном формате
  };

  //info
  info: {
    participant: IAPIOptionalDescriptionResult | null; //	участник, а не организатор
    implementation_period: IAPIOptionalDescriptionResult | null; //	Период реализации проекта
    implementation_level_id: number; //Уровень реализации проекта
    rnsu_category_ids: number[]; //Категории по РНСУ
    public_work_ids: number[]; //	Наименование государственной работы
    service_type_ids: number[]; //Вид услуги
    service_name_ids: number[]; //Наименование услуги
    need_recognition_ids: number[]; //Обстоятельства признания нуждаемости
  };

  // expierience partition
  experience: {
    results_in_journal: IAPIOptionalExpierienceResult | null;
    results_of_various_events: IAPIOptionalExpierienceResult | null;
    results_info_in_site: IAPIOptionalExpierienceResult | null;
    results_info_in_media: IAPIOptionalExpierienceResult | null;
    results_seminars: IAPIOptionalExpierienceResult | null;
  };

  // contacts partition
  contacts: {
    fio: string; //ФИО ответственного лица
    email: string; //Электронная почта
    phone: string; //Контактный телефон
  };

  // members partition
  reporting_periods: IAPIMembersInfo[];
}

export interface IAPIProjectWithMetadata extends IAPIProject {
  // additional
  status: string;
  rejected_status_description: string | null;
}

export interface IAPIMembersInfo {
  total: number;
  year: number;
  families: number | null;
  children: number | null;
  men: number | null;
  women: number | null;
}

export interface IAPIOptionalDescriptionResult {
  description: string;
}

export interface IAPIOptionalExpierienceResult {
  description: string | null;
  link: string | null;
}
