import {
  MouseEvent,
  ChangeEvent,
  HTMLAttributes,
  useRef,
  useState,
} from 'react';
import styles from './PhotoInput.module.scss';
import { combineClasses } from 'utils';
import { H3 } from '../H3/H3';
import { Text } from '../Text/Text';
import { API } from 'api/controller';
import { useErrors } from 'hooks/useErrors';
import { CloseIcon } from 'assets/icons';
import { ELoaderPalette, Loader } from '../Loader/Loader';

type Props = {
  name: string;
  category: string;
  photoPath: string | null;
  photoName: string | null;
  onPhotoChange: (path: string | null, name: string | null) => void;
  heading: string;
};

export const PhotoInput = ({
  name,
  category,
  photoName,
  photoPath,
  onPhotoChange,
  heading,
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
      {heading && <H3 className={styles.heading}>{heading}</H3>}
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
