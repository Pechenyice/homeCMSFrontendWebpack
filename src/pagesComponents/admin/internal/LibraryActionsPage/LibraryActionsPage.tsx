import { API, EEntity } from 'api';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { EntityCreationSteps } from 'components';
import { EntityActionsStepsInterface } from 'components/entities/common/action/EntityActionsStepsInterface';
import { Action, Button, Modal, Text } from 'components/kit';
import { LibraryActionsInterface } from 'components/LibraryActionsInterface/LibraryActionsInterface';
import { useAuth, useErrors, useInfos } from 'hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ILibraryWord } from 'types/admin/library';
import {
  ISocialWorkData,
  ISocialWorkState,
  ISocialWorkSwitchers,
} from 'types/entities/socialWork';
import {
  ICommonContactsPartitionState,
  ICommonExpieriencePartitionState,
  ICommonMembersPartitionState,
  ILibraryWordState,
} from 'types/entities/states';
import { EEntityPartition, EProposalStatus } from 'types/enums';
import { IFileInfo, IInputsState } from 'types/interfaces';
import { isValueProvided, simpleUuid } from 'utils/common';
import { mapSocialWorkToAPI } from 'utils/entities/socialWork';
import { registerInput, registerNumberInput } from 'utils/inputs';
import {
  annotationValidator,
  numberInputValidator,
  scanAll,
  textInputValidator,
  validateAll,
} from 'utils/validators';
import styles from './LibraryActionsPage.module.scss';

type Props = {
  data: ILibraryWord | null;
};

export const LibraryActionsPage = ({ data }: Props) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { profile, handleLogout } = useAuth();

  const { addInfo } = useInfos();
  const { addError } = useErrors();

  const [modalState, setModalState] = useState(false);

  const [fetchInProgress, setFetchInProgress] = useState(false);

  const [state, setState] = useState<ILibraryWordState>({
    word: registerInput(data?.word ?? '', textInputValidator),
    meaning: registerInput(data?.meaning ?? '', textInputValidator),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const [key, value] = [e.target.name, e.target.value];

    const validationResult = ((state as unknown) as IInputsState)[
      key
    ].validator(value);

    (setState as any)({
      ...state,
      [key]: {
        ...((state as unknown) as IInputsState)[key],
        value,
        error: {
          exist: !validationResult.success,
          text: validationResult.text,
        },
      },
    });
  };

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const handleEntityUpdate = () => {
    handleSave();
  };

  const validateData = () => {
    const needValidation = {
      word: state.word,
      meaning: state.meaning,
    };

    const validationSuccess = validateAll(
      Object.values(needValidation)
        .filter((val) => !!val)
        .map((val) => ({
          value: val!.value,
          validator: val!.validator,
        }))
    );

    if (!validationSuccess) {
      const validationScanner = scanAll(needValidation);

      setState({ ...state, ...validationScanner });
    }

    return validationSuccess;
  };

  const handleSave = async () => {
    setFetchInProgress(true);
    toggleModal();

    try {
      if (!profile?.id) throw new AuthError('Данные пользователя не найдены');

      const stateValues: Partial<ILibraryWord> = {
        word: state.word.value,
        meaning: state.meaning.value,
      };

      if (!data) {
        await API.admin.library.create(stateValues);

        addInfo('Термин успешно добавлен');
      } else {
        await API.admin.library.update(stateValues, data.id);

        queryClient.invalidateQueries('libraryWord');

        addInfo('Термин успешно обновлен');
      }

      navigate('/library');
    } catch (e) {
      setFetchInProgress(false);

      if (e instanceof ServerError) {
        addError('Произошла критическая ошибка при обновлении термина!');
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
  };

  const handleSaveAttempt = () => {
    if (validateData()) toggleModal();
  };

  return (
    <>
      <LibraryActionsInterface state={state} onChange={handleChange} />
      <div className={styles.controls}>
        <Button
          className={styles.controls__button}
          onClick={!fetchInProgress ? handleSaveAttempt : undefined}
          isLoading={fetchInProgress}
        >
          <Text isMedium>{!!data ? 'Сохранить' : 'Создать'}</Text>
        </Button>
      </div>
      <Modal
        isOpen={modalState}
        text={`Вы точно хотите ${!!data ? 'сохранить' : 'создать'} термин?`}
        submitText="Отправить"
        cancelText="Отменить"
        onSubmit={handleEntityUpdate}
        onCancel={toggleModal}
      />
    </>
  );
};
