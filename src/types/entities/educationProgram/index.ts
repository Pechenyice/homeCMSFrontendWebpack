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

export interface IEducationProgramData
  extends IEducationProgramMainPartition,
    IExpieriencePartition,
    IContactsPartition,
    IMembersPartition,
    ICommonEntityMetadata {
  // main partition
  // expierience partition
  // contacts partition
  // members partition
}

export interface IEducationProgramMainPartition {
  direction: number; //Направленность
  conductingClassesForm: number; //Форма проведения занятий
  //[Removed 12.10.2022 by clients correction] datesAndModeOfStudy: string; //Сроки, режим занятий

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

export interface IAPIEducationProgram {
  //common info
  primary: IAPICommonPrimaryPart;

  //info
  info: IAPIEducationProgramInfoPart;

  // expierience partition
  experience: IAPICommonExpieriencePart;

  // contacts partition
  contacts: IAPICommonContactsPart;

  // members partition
  reporting_periods: IAPIMembersInfo[];
}

export interface IFullAPIEducationProgram
  extends Omit<IAPIEducationProgram, 'primary' | 'reporting_periods'> {
  primary: IAPICommonFullPrimaryPart;

  reporting_periods: IFullAPIMembersInfo[];

  id: number;
  status: string;
  rejected_status_description: string | null;
  is_favorite: boolean;
  is_deleted: boolean;
}

export interface IAPIEducationProgramInfoPart {
  direction_id: number;
  conducting_classes_form_id: number;
  //[Removed 12.10.2022 by clients correction] dates_and_mode_of_study: string;
}

/**
 *
 *
 *
 * State
 *
 */

export interface IEducationProgramSwitchers extends ICommonSwitchers {}

export interface IEducationProgramState {
  // main partition
  mainPartition: {
    direction: number; //Направленность
    conductingClassesForm: number; //Форма проведения занятий
    //[Removed 12.10.2022 by clients correction] datesAndModeOfStudy: IInput; //Сроки, режим занятий

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
