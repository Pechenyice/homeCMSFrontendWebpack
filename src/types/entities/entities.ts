import { EProposalStatus } from 'types/enums';
import { IAPIFileInfo, IFileInfo } from 'types/interfaces';

export interface IFileInput {
  id: number | null;
  path: string | null;
  name: string | null;
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
  id: number;
  status: EProposalStatus;
  cause: string | null;
  isBest: boolean;
  isDeleted: boolean;
}

export interface IMembersInfo {
  id: any;
  commonMembersCount: number;
  familiesCount: number | null;
  childrenCount: number | null;
  menCount: number | null;
  womenCount: number | null;
  year: number;
}

export interface IAPICommonExpieriencePart {
  results_in_journal: IAPIOptionalExpierienceResult | null;
  results_of_various_events: IAPIOptionalExpierienceResult | null;
  results_info_in_site: IAPIOptionalExpierienceResult | null;
  results_info_in_media: IAPIOptionalExpierienceResult | null;
  results_seminars: IAPIOptionalExpierienceResult | null;
}

export interface IAPICommonContactsPart {
  fio: string; //ФИО ответственного лица
  email: string; //Электронная почта
  phone: string; //Контактный телефон
}

export interface IAPIMembersInfo {
  total: number;
  year: number;
  families: number | null;
  children: number | null;
  men: number | null;
  women: number | null;
}

export interface IFullAPIMembersInfo {
  id: number;
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

export interface IAPICommonPrimaryPart {
  name: string; //наименование проекта
  annotation: string; //Аннотация
  objectives: string; //Основные задачи
  purpose: string; //Цель проекта
  payment_method_id: number; //Реализация для гражданина бесплатно/платно
  partnership: IAPIOptionalDescriptionResult | null; //Взаимодействие, партнерство с другими организациями
  volunteer_id: number; //Привлечение добровольцев и волонтеров
  rnsu_category_ids: number[]; //Категории по РНСУ
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
  is_practice_placed_in_asi_smarteka: boolean; //Практика размещена в АСИ "Смартека"
}

export interface IAPICommonFullPrimaryPart
  extends Omit<IAPICommonPrimaryPart, 'photo_file_id' | 'gallery_file_ids'> {
  photo_file: IAPIFileInfo['file'] | null; //ID файла обложки
  gallery_files: IAPIFileInfo['file'][]; //Галерея
}

export interface IAPIEntitiesList {
  items: IAPIEntitiesListElement[];
  total: number;
}

export interface IAPIEntitiesListElement {
  id: number;
  name: string;
  status: EProposalStatus;
  created_at: string;
  updated_at: string;
  rating: IAPIRating;
}

export interface IAPIAdminEntitiesList {
  items: IAPIAdminEntitiesListElement[];
  total: number;
}

export interface IAPIAdminEntitiesListElement {
  id: number;
  name: string;
  user_id: number;
  company_name: string;
  status: EProposalStatus;
  created_at: string;
  updated_at: string;
  rating: IAPIRating;
}

export interface IAPIAdminEntitiesArchiveList {
  items: IAPIAdminEntitiesArchiveListElement[];
  total: number;
}

export interface IAPIAdminEntitiesArchiveListElement {
  id: number;
  name: string;
  user_id: number;
  company_name: string;
  status: EProposalStatus;
  created_at: string;
  deleted_at: string;
  rating: IAPIRating;
}

export interface IAPIRating {
  count: number;
  fields: IAPIRatingFields;
}

export interface IAPIRatingFields {
  is_favorite: boolean;
  is_practice_placed_in_asi_smarteka: boolean;
  is_has_publication: boolean;
  is_has_approbation: boolean;
  is_has_replicability: boolean;
  is_has_any_review: boolean;
}
