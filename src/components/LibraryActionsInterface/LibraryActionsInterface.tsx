import {
  Checkbox,
  ESkeletonMode,
  HelperEnableSelect,
  Input,
  MultipleSelect,
  Select,
  Skeleton,
  Text,
  TextArea,
} from 'components/kit';
import { ChangeEvent } from 'react';
import {
  ICommonContactsPartitionState,
  ILibraryWordState,
} from 'types/entities/states';
import styles from './PartitionStep.module.scss';

type Props = {
  state: ILibraryWordState;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const LibraryActionsInterface = ({ state, onChange }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Input
        name="word"
        value={state.word.value}
        onChange={onChange}
        error={state.word.error}
        heading="Слово *"
        placeholder="Слово"
      />
      <TextArea
        name="meaning"
        value={state.meaning.value}
        onChange={onChange}
        error={state.meaning.error}
        heading="Значение *"
        placeholder="Значение"
      />
    </div>
  );
};
