import { IInput, INumberInput } from 'types/interfaces';
import { IFileInput } from './entities';

export interface ICommonExpieriencePartitionState {
  resultsDescriptionInJournal: IInput; //Описание результатов в виде статьи, опубликованной в сборнике, журнале
  resultsDescriptionInJournalLink: IInput;
  resultsInformationInMassMedia: IInput; //Представление информации о результатах в СМИ
  resultsInformationInMassMediaLink: IInput;
  resultsInformationInDifferentLevelsEvents: IInput; //Представление результатов на мероприятиях различного уровня
  resultsInformationInDifferentLevelsEventsLink: IInput;
  resultsMasterClasses: IInput; //Проведение мастер-классов (семинаров) по результатам
  resultsMasterClassesLink: IInput;
  resultsOnWebsite: IInput; //Проведение информации о результатах на сайте учреждения
  resultsOnWebsiteLink: IInput;
}

export interface ICommonContactsPartitionState {
  responsible: IInput; //ФИО ответственного лица
  contactNumber: IInput; //Контактный телефон
  email: IInput; //Электронная почта
}

export interface ICommonMembersPartitionState {
  membersInfo: IMembersStateInfo[];
}

export interface IMembersStateInfo {
  commonMembersCount: INumberInput; //Общее количество участников за отчетный период
  familiesCount: INumberInput; //Количество семей
  childrenCount: INumberInput; //Количество детей
  menCount: INumberInput; //Количество мужчин
  womenCount: INumberInput; //Количество женщин
  year: INumberInput; //Отчётный период
}

export interface ICommonExpierienceSwitchers {
  hasResultsDescriptionInJournal: boolean;
  hasResultsInformationInMassMedia: boolean;
  hasResultsInformationInDifferentLevelsEvents: boolean;
  hasResultsMasterClasses: boolean;
  hasResultsOnWebsite: boolean;
}

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
    name: IInput; //Наименование
    bestPracticeForLeadership: boolean; //Лучшая практика по мнению руководства организации
    annotation: IInput; //Аннотация
    purpose: IInput; //Цель проекта
    tasks: IInput; //Основные задачи
    organisator: IInput; //Организатор/участник
    period: IInput; //Период реализации проекта
    realisationForCitizen: number; //Реализация для гражданина
    canBeDistant: boolean; //Возможность реализации в дистанционном формате
    organizationLevel: number; //Уровень реализации проекта
    partnership: IInput;
    attractingVolunteer: number; //Привлечение добровольцев и волонтеров
    rnsuCategories: number[]; //Категории по РНСУ
    categories: number[]; //Категории
    groups: number[]; //Целевые группы
    worksKinds: number[]; //Вид услуги
    worksNames: number[]; //Наименования услуг
    gosWorkNames: number[]; //Наименование государственной работы
    circumstancesRecognitionNeed: number[]; //Обстоятельства признания нуждаемости
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
