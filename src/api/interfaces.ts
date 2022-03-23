import { EAPIMethod } from './enums';

export interface IAPIRoute {
  url: string;
  method: EAPIMethod;
}

export interface IAPIRoutesConfig {
  [key: string]: IAPIRoute;
}
