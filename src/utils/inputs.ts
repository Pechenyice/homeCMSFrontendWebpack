import { IDateInput, IInput, INumberInput } from 'types/interfaces';

export const registerInput = (
  value: string,
  validator: IInput['validator']
): IInput => ({
  value,
  validator,
  error: {
    exist: false,
    text: '',
  },
});

export const registerDateInput = (
  value: string,
  validator: IDateInput['validator']
): IDateInput => ({
  value,
  validator,
  error: {
    exist: false,
    text: '',
  },
});

export const registerNumberInput = (
  value: number,
  validator: INumberInput['validator']
): INumberInput => ({
  value,
  validator,
  error: {
    exist: false,
    text: '',
  },
});
