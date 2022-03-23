import { IInput } from 'types/interfaces';

export const registerInput = (value: string, validator: IInput['validator']): IInput => ({
  value,
  validator,
  error: {
    exist: false,
    text: '',
  },
});
