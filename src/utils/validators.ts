import { IValidationObject, IValidationResult } from 'types/interfaces';

export const textInputValidator = (value: string | number): IValidationResult => {
  value = value.toString();

  if (!value || !value.length) {
    return {
      success: false,
      text: 'Пустое значение',
    };
  }

  if (value.length > 100) {
    return {
      success: false,
      text: 'Значение не может быть длиннее 100 символов',
    };
  }
  return {
    success: true,
    text: '',
  };
};

export const validateAll = (inputs: IValidationObject[]) => {
  return inputs.every((input) => input.validator(input.value).success);
};
