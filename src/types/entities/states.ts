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
  id: any;
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

export interface ICommonSwitchers extends ICommonExpierienceSwitchers {
  partnership: boolean;
  innovationGround: boolean;
  hasExpertOpinion: boolean;
  hasExpertReview: boolean;
  hasExpertMention: boolean;
}

export interface ILibraryWordState {
  word: IInput;
  meaning: IInput;
}
