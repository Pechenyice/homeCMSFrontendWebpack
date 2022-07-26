import {
  MouseEvent,
  ChangeEvent,
  HTMLAttributes,
  useRef,
  useState,
} from 'react';
import styles from './GalleryInput.module.scss';
import { combineClasses } from 'utils';
import { H3 } from '../H3/H3';
import { Text } from '../Text/Text';
import { API } from 'api/controller';
import { useErrors } from 'hooks/useErrors';
import { CloseIcon } from 'assets/icons';
import { ELoaderPalette, Loader } from '../Loader/Loader';
import { Hint } from '../Hint/Hint';
import { IFileInput } from 'types/entities/entities';

type Props = {
  name: string;
  category: string;
  gallery: IFileInput[];
  heading: string;
  hint?: string;
};

export const GalleryInput = ({
  name,
  category,
  gallery,
  heading,
  hint,
  className,
  ...rest
}: Props & HTMLAttributes<HTMLDivElement>) => {
  const { addError } = useErrors();

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleNewFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setIsLoading(true);

    const preparedData = new FormData();

    preparedData.append('category', category);
    preparedData.append('file', e.target.files[0]);

    let fileInfo = null;
    try {
      fileInfo = await API.file.upload(preparedData);
    } catch (e: any) {
      addError(e.message);
      setIsLoading(false);
      return;
    }

    onPhotoChange(fileInfo.data?.path ?? null, e.target.files[0].name);
    setIsLoading(false);
  };

  const handleClearPhoto = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    onPhotoChange(null, null);
  };

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
          accept="image/png, image/gif, image/jpeg"
          name="file"
          className={styles.input__file}
          ref={hiddenFileInput}
          onChange={handleNewFile}
        />
        <div onClick={handleClick}>
          {isLoading ? (
            <div className={styles.loaderWrapper}>
              <Loader palette={ELoaderPalette.DARK} />
            </div>
          ) : (
            <>
              <Text className={photoName ? '' : styles.text__inactive}>
                {photoName ? photoName : 'Выберите файл'}
              </Text>

              {photoName && (
                <CloseIcon
                  className={styles.clear}
                  onClick={handleClearPhoto}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
