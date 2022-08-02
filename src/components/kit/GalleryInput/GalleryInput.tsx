import {
  MouseEvent,
  ChangeEvent,
  HTMLAttributes,
  useRef,
  useState,
} from 'react';
import ImageGallery from 'react-image-gallery';
import styles from './GalleryInput.module.scss';
import { combineClasses } from 'utils';
import { H3 } from '../H3/H3';
import { Text } from '../Text/Text';
import { API } from 'api/controller';
import { useErrors } from 'hooks/useErrors';
import { CloseIcon, PlusIcon } from 'assets/icons';
import { ELoaderPalette, Loader } from '../Loader/Loader';
import { Hint } from '../Hint/Hint';
import { IFileInput } from 'types/entities/entities';
import { Button } from '../Button/Button';
import { useAuth } from 'hooks/useAuth';
import { AuthError } from 'api/errors';
import { Action } from '../Action/Action';
import { IFileInfo } from 'types/interfaces';
import 'react-image-gallery/styles/css/image-gallery.css';
import './Gallery.css';

type Props = {
  name: string;
  category: string;
  gallery: IFileInput[];
  heading: string;
  hint?: string;
  onGalleryPhotosAdd: (photos: IFileInfo['file'][]) => void;
  onGalleryPhotoDelete: (id: number) => void;
  viewMode?: boolean;
};

export const GalleryInput = ({
  name,
  category,
  gallery,
  heading,
  hint,
  onGalleryPhotosAdd,
  onGalleryPhotoDelete,
  viewMode,
  className,
  ...rest
}: Props & HTMLAttributes<HTMLDivElement>) => {
  const { profile } = useAuth();
  const { addError } = useErrors();

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleNewFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    if (!profile?.id) throw new AuthError('Данные пользователя не найдены');

    setIsLoading(true);

    try {
      const result = await Promise.all(
        Array.from(e.target.files).map(async (file) => {
          const preparedData = new FormData();

          preparedData.append('category', category);
          preparedData.append('file', file);

          let fileInfo = null;
          try {
            fileInfo = await API.file.upload(preparedData, profile.id);
          } catch (e: any) {
            addError(e.message);
            setIsLoading(false);
            return null;
          }

          if (!fileInfo.data) return null;

          return fileInfo.data.file;
        })
      );

      onGalleryPhotosAdd(
        result
          .filter((file) => !!file)
          .map((file) => ({
            id: file?.id,
            path: file?.path,
            name: file?.original_name,
          })) as any
      );
    } catch (e: any) {
      addError(e.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  const bindClearPhoto = (id: number) => (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    onGalleryPhotoDelete(id);
  };

  if (viewMode) {
    const images = gallery.map((photo) => ({
      original: photo.path,
      thumbnail: photo.path,
    }));

    return (
      <div
        className={combineClasses(styles.wrapper, className ?? '')}
        {...rest}
      >
        {heading && (
          <div className={styles.heading}>
            <H3 className={styles.heading__content}>{heading}</H3>{' '}
            {hint && <Hint text={hint} />}
          </div>
        )}
        <div className={styles.image}>
          {gallery.length ? (
            <ImageGallery showPlayButton={false} items={images as any} />
          ) : (
            <Text>[Файлы не добавлены]</Text>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={combineClasses(styles.wrapper, className ?? '')} {...rest}>
      {heading && (
        <div className={styles.heading}>
          <H3 className={styles.heading__content}>{heading}</H3>{' '}
          {hint && <Hint text={hint} />}
        </div>
      )}
      <div className={styles.inner}>
        <input
          type="file"
          multiple
          accept="image/png, image/gif, image/jpeg"
          name="file"
          className={styles.input__file}
          ref={hiddenFileInput}
          onChange={handleNewFile}
        />
        <div className={styles.photoInner}>
          {gallery.map(
            (photo) =>
              photo.id && (
                <div className={styles.photoInner__content}>
                  <Text>{photo.name}</Text>

                  <CloseIcon
                    className={styles.clear}
                    onClick={bindClearPhoto(photo.id)}
                  />
                </div>
              )
          )}
        </div>
        <div className={styles.action}>
          <Action
            onClick={handleClick}
            isDisabled={isLoading}
            isLoading={isLoading}
            icon={<PlusIcon />}
            text="Добавить фото"
            className={styles.action__content}
          />
        </div>
      </div>
    </div>
  );
};
