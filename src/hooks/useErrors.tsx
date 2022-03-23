import { ErrorsContext } from 'contexts/ErrorsContext';
import { useContext } from 'react';

export const useErrors = () => {
  const { errors, addError, removeError, removeAllErrors } = useContext(ErrorsContext);

  return {
    errors,
    addError,
    removeError,
    removeAllErrors,
  };
};
