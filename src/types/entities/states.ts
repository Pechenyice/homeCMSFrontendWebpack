import { IInput, INumberInput } from "types/interfaces";

export interface IProjectState {
  // main partition
  mainPartition: {
    name: IInput; //Наименование
    purpose: IInput; //Цель проекта
    tasks: IInput; //Основные задачи
    period: IInput; //Период реализации проекта
    technologies: IInput; //Технологии, формы, методы
    annotation: IInput; //Аннотация
    organisatorOrMember: IInput; //Организатор/участник
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
    basicQualityResults: IInput; //Основные качественные результаты реализации проекта
    basicAmountResults: IInput; //Основные количественные результаты
    diagnosticInstruments: IInput; //Диагностический инструментарий оценки результатов
    briefResourcesDescription: IInput; //Краткое описание необходимого ресурсного обеспечения
    bestPractiseForLeadership: IInput; //Лучшая практика по мнению руководства организации
    socialResult: IInput; //Социальный результат
    video: IInput; //Видеоролик
    prevalence: IInput; //Распространенность
    canBeDistant: boolean; //Возможность реализации в дистанционном формате
    innovationGround: boolean; //Апробация на инновационной площадке
    hasExpertOpinion: boolean; //Наличие экспертного заключения
    hasExpertReview: boolean; //Наличие экспертного рецензии
    hasExpertMention: boolean; //Наличие экспертного отзыва
  }

  // expierience partition
  expieriencePartition: {
    resultsInformationInMassMedia: IInput; //Представление информации о результатах в районных, городских СМИ
    resultsInformationInMassMediaLink: IInput;
    resultsInformationInRadio: IInput; //Представление информации о результатах на радио
    resultsInformationInRadioLink: IInput;
    resultsInformationInTV: IInput; //Представление информации о результатах на телевидении
    resultsInformationInTVLink: IInput;
    resultsDescriptionInJournal: IInput; //Описание результатов в виде статьи, опубликованной в сборнике, журнале
    resultsDescriptionInJournalLink: IInput;
    resultsInformationInDifferentLevelsEvents: IInput; //Представление результатов на мероприятиях различного уровня
    resultsInformationInDifferentLevelsEventsLink: IInput;
    resultsMasterClasses: IInput; //Проведение мастер-классов (семинаров) по результатам
    resultsMasterClassesLink: IInput;
    resultsOnWebsite: IInput; //Проведение информации о результатах на сайте учреждения
    resultsOnWebsiteLink: IInput;
  }

  // contacts partition
  contactsPartition: {
    responsible: IInput; //ФИО ответственного лица
    contactNumber: IInput; //Контактный телефон
    email: IInput; //Электронная почта
  }

  // members partition
  membersPartition: {
    membersInfo: IMembersStateInfo[];
  }
} 

export interface IMembersStateInfo {
  commonMembersCount: INumberInput;
  familiesCount: INumberInput;
  childrenCount: INumberInput;
  menCount: INumberInput;
  womenCount: INumberInput;
  year: INumberInput;
}