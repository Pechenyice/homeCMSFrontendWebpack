import { IInput, ISelectValue } from 'types/interfaces';

export const combineClasses = (...classes: string[]) => classes.filter((c) => c).join(' ');

export const simpleUuid = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const getValueByIdFromSelect = (
  values: ISelectValue[] | undefined,
  id: number | undefined
) => {
  if (!values || id === undefined) return undefined;
  return values.filter((value) => value.id === id)[0].value;
};
