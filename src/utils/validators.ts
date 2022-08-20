import { IValidationObject, IValidationResult } from 'types/interfaces';
import { isValidDate } from '.';

export const textInputValidator = (
  value?: string | number
): IValidationResult => {
  value = value?.toString();

  if (!value || !value.length) {
    return {
      success: false,
      text: 'Пустое значение',
    };
  }

  if (value.length > 1000) {
    return {
      success: false,
      text: 'Значение не может быть длиннее 1000 символов',
    };
  }

  return {
    success: true,
    text: '',
  };
};

export const annotationValidator = (
  value?: string | number
): IValidationResult => {
  value = value?.toString();

  if (!value || !value.length) {
    return {
      success: false,
      text: 'Пустое значение',
    };
  }

  if (value.length > 2500) {
    return {
      success: false,
      text: 'Значение не может быть длиннее 2500 символов',
    };
  }

  return {
    success: true,
    text: '',
  };
};

export const dateInputValidator = (value?: string): IValidationResult => {
  if (!value || !value.length) {
    return {
      success: false,
      text: 'Пустое значение',
    };
  }

  if (!isValidDate(value)) {
    return {
      success: false,
      text:
        'Формат даты должен соответствовать паттерну ДД.ММ.ГГГГ и быть настоящей датой',
    };
  }

  if (value.length !== 10) {
    return {
      success: false,
      text: 'Формат даты должен соответствовать паттерну ДД.ММ.ГГГГ',
    };
  }

  if (value.split('.').length !== 3) {
    return {
      success: false,
      text: 'Формат даты должен соответствовать паттерну ДД.ММ.ГГГГ',
    };
  }

  if (
    value.split('.')[0].length !== 2 ||
    value.split('.')[1].length !== 2 ||
    value.split('.')[2].length !== 4
  ) {
    return {
      success: false,
      text: 'Формат даты должен соответствовать паттерну ДД.ММ.ГГГГ',
    };
  }

  return {
    success: true,
    text: '',
  };
};

export const numberInputValidator = (
  value: number | null | undefined
): IValidationResult => {
  if (value === undefined || value === null) {
    return {
      success: false,
      text: 'Пустое значение',
    };
  }

  if (isNaN(value)) {
    return {
      success: false,
      text: 'Значение должно быть числом',
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
