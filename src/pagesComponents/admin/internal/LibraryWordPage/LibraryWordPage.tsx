import { ProjectViewMainPartition } from 'components/entities/project/ProjectViewStepsInterface/ProjectViewMainPartition';
import { EntityCreationSteps } from 'components/EntityCreationSteps/EntityCreationSteps';
import { ChangeEvent, useState } from 'react';
import styles from './LibraryWordPage.module.scss';

import {
  Action,
  Button,
  Checkbox,
  Input,
  Modal,
  Text,
  TextArea,
} from 'components/kit';
import { combineClasses } from 'utils/common';
import { ExpierienceView } from 'components/entities/common/ExpierienceView';
import { ContactsView } from 'components/entities/common/ContactsView';
import { MembersView } from 'components/entities/common/MembersView';
import { API } from 'api/controller';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useErrors } from 'hooks/useErrors';
import { useAuth, useInfos } from 'hooks/index';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { ISocialWorkData } from 'types/entities/socialWork';
import { SocialWorkViewMainPartition } from 'components/entities/socialWork/SocialWorkViewStepsInterface/SocialWorkViewMainPartition';
import { ILibraryWord } from 'types/admin/library';

type Props = {
  libraryWord: ILibraryWord;
};

export const LibraryWordPage = ({ libraryWord }: Props) => {
  return (
    <div>
      <div className={styles.content}>
        <Input
          readOnly
          name="word"
          value={libraryWord.word}
          heading="Слово"
          placeholder="Слово"
        />
        <TextArea
          className={styles.nextInput}
          readOnly
          name="meaning"
          value={libraryWord.meaning}
          heading="Значение"
          placeholder="Значение"
        />
      </div>
    </div>
  );
};
