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

export interface IClubData
  extends IClubMainPartition,
    IExpieriencePartition,
    IContactsPartition,
    IMembersPartition,
    ICommonEntityMetadata {
  // main partition
  // expierience partition
  // contacts partition
  // members partition
}

export interface IClubMainPartition {
  //[Removed 12.10.2022 by clients correction] schedule: string; //График
  conductingClassesForm: number; //Форма проведения занятий
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

export interface IAPIClub {
  //common info
  primary: IAPICommonPrimaryPart;

  //info
  info: IAPIClubInfoPart;

  // expierience partition
  experience: IAPICommonExpieriencePart;

  // contacts partition
  contacts: IAPICommonContactsPart;

  // members partition
  reporting_periods: IAPIMembersInfo[];
}

export interface IFullAPIClub
  extends Omit<IAPIClub, 'primary' | 'reporting_periods'> {
  primary: IAPICommonFullPrimaryPart;

  reporting_periods: IFullAPIMembersInfo[];

  id: number;
  status: string;
  rejected_status_description: string | null;
  is_favorite: boolean;
  is_deleted: boolean;
}

export interface IAPIClubInfoPart {
  //[Removed 12.10.2022 by clients correction]  schedule: string;
  conducting_classes_form_id: number;
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

export interface IClubSwitchers extends ICommonSwitchers {}

export interface IClubState {
  // main partition
  mainPartition: {
    //[Removed 12.10.2022 by clients correction] schedule: IInput; //График
    conductingClassesForm: number; //Форма проведения занятий
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
