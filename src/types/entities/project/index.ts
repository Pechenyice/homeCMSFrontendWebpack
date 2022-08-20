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
  ICommonExpierienceSwitchers,
  ICommonMembersPartitionState,
} from '../states';

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

export interface IProjectMainPartition {
  organisator: string | null; //Организатор/участник
  period: string; //Период реализации проекта
  organizationLevel: number; //Уровень реализации проекта
  worksKinds: number[] | null; //Вид услуги
  worksNames: number[] | null; //Наименования услуг
  gosWorkNames: number[] | null; //Наименование государственной работы
  circumstancesRecognitionNeed: number[]; //Обстоятельства признания нуждаемости

  //common
  name: string; //Наименование
  bestPracticeForLeadership: boolean; //Лучшая практика по мнению руководства организации
  annotation: string; //Аннотация
  purpose: string; //Цель проекта
  tasks: string; //Основные задачи
  realisationForCitizen: number; //Реализация для гражданина
  canBeDistant: boolean; //Возможность реализации в дистанционном формате
  isInASI: boolean; //Практика размещена в АСИ "Смартека"
  partnership: string | null;
  attractingVolunteer: number; //Привлечение добровольцев и волонтеров
  rnsuCategories: number[]; //Категории по РНСУ
  categories: number[]; //Категории
  groups: number[]; //Целевые группы
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

export interface IAPIProject {
  //common info
  primary: IAPICommonPrimaryPart;

  //info
  info: IAPIProjectInfoPart;

  // expierience partition
  experience: IAPICommonExpieriencePart;

  // contacts partition
  contacts: IAPICommonContactsPart;

  // members partition
  reporting_periods: IAPIMembersInfo[];
}

export interface IFullAPIProject
  extends Omit<IAPIProject, 'primary' | 'reporting_periods'> {
  primary: IAPICommonFullPrimaryPart;

  reporting_periods: IFullAPIMembersInfo[];

  id: number;
  status: string;
  rejected_status_description: string | null;
  is_favorite: boolean;
  is_deleted: boolean;
}

export interface IAPIProjectInfoPart {
  participant: IAPIOptionalDescriptionResult | null; //	участник, а не организатор
  implementation_period: string; //	Период реализации проекта
  implementation_level_id: number; //Уровень реализации проекта
  public_work_ids: number[]; //	Наименование государственной работы
  service_type_ids: number[]; //Вид услуги
  service_name_ids: number[]; //Наименование услуги
  need_recognition_ids: number[]; //Обстоятельства признания нуждаемости
}

/**
 *
 *
 *
 * State
 *
 */

export interface IProjectSwitchers extends ICommonExpierienceSwitchers {
  organisator: boolean;
  partnership: boolean;
  innovationGround: boolean;
  hasExpertOpinion: boolean;
  hasExpertReview: boolean;
  hasExpertMention: boolean;
}

export interface IProjectState {
  // main partition
  mainPartition: {
    organisator: IInput; //Организатор/участник
    period: IInput; //Период реализации проекта
    organizationLevel: number; //Уровень реализации проекта
    worksKinds: number[]; //Вид услуги
    worksNames: number[]; //Наименования услуг
    gosWorkNames: number[]; //Наименование государственной работы
    circumstancesRecognitionNeed: number[]; //Обстоятельства признания нуждаемости

    //common
    name: IInput; //Наименование
    bestPracticeForLeadership: boolean; //Лучшая практика по мнению руководства организации
    annotation: IInput; //Аннотация
    purpose: IInput; //Цель проекта
    tasks: IInput; //Основные задачи
    realisationForCitizen: number; //Реализация для гражданина
    canBeDistant: boolean; //Возможность реализации в дистанционном формате
    isInASI: boolean; //Практика размещена в АСИ "Смартека"
    partnership: IInput;
    attractingVolunteer: number; //Привлечение добровольцев и волонтеров
    rnsuCategories: number[]; //Категории по РНСУ
    categories: number[]; //Категории
    groups: number[]; //Целевые группы
    socialHelpForm: number[]; //Форма социального обслуживания (сопровождения)
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
