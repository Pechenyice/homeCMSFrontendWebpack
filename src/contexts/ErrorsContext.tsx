import { FC, useState } from 'react';
import { IEvent } from 'types/interfaces';
import { createContext } from 'react';
import { ErrorsList } from 'components';

export interface IErrorsContextValues {
  addError: (text: string) => void;
  removeError: (id: number) => void;
  removeAllErrors: () => void;
  errors: IEvent[];
}

export const ErrorsContext = createContext({} as IErrorsContextValues);

export const ErrorsProvider: FC = ({ children }) => {
  const [errors, setErrors] = useState<IErrorsContextValues['errors']>([]);

  const addError = (text: IEvent['text']) => {
    const id = errors.length ? errors[errors.length - 1].id + 1 : 0;
    setErrors([...errors, { id, text }]);
  };

  const removeError = (id: IEvent['id']) => {
    setErrors(errors.filter((e) => e.id !== id));
  };

  const removeAllErrors = () => {
    setErrors([]);
  };

  return (
    <ErrorsContext.Provider
      value={{
        errors,
        addError,
        removeError,
        removeAllErrors,
      }}
    >
      <ErrorsList />
      {children}
    </ErrorsContext.Provider>
  );
};
