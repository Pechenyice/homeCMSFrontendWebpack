import { IInput, ISelectValue } from 'types/interfaces';

export const combineClasses = (...classes: string[]) =>
  classes.filter((c) => c).join(' ');

export const simpleUuid = () => {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

export const getValueByIdFromSelect = (
  values: ISelectValue[] | undefined,
  id: number | undefined
) => {
  if (!values || id === undefined) return undefined;
  return values.filter((value) => +value.id === +id).length
    ? values.filter((value) => +value.id === +id)[0].label
    : undefined;
};

export const isValidDate = (d: any) => {
  return !isNaN(Date.parse(d.split('.').reverse().join('-')));
};

export const isValueProvided = (value: any) => {
  return value !== null && value !== undefined;
};
