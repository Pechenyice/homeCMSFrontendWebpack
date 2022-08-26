import styles from './Methodology.module.scss';
import { Dropdown, PageHeading } from 'components';
import { Action, Breadcrumbs, Layout, Modal, Text } from 'components/kit';
import { EditIcon } from 'assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { getMethodologyKey } from 'hooks/queries/keys';
import { API } from 'api/controller';
import { useProject } from 'hooks/queries/entities/project/useProject';
import PageLoader from 'components/PageLoader/PageLoader';
import { useState } from 'react';
import { useErrors } from 'hooks/useErrors';
import { useInfos } from 'hooks/useInfos';
import { ApiError, AuthError, ServerError } from 'api/errors';
import { useAuth } from 'hooks';
import { downloadMethodology } from 'utils/print';
import { useMethodology } from 'hooks/queries/entities/methodology/useMethodology';
import { MethodologyPage } from 'pagesComponents/methodologies/MethodologyPage/MethodologyPage';

export const Methodology = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleLogout, profile } = useAuth();
  const { addError } = useErrors();
  const { addInfo } = useInfos();

  const {
    apiData: methodology,
    isLoading: isMethodologyLoading,
    isError: isMethodologyError,
  } = useMethodology(id as string);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePrint = async () => {
    try {
      if (!profile?.id) throw new AuthError('Данные пользователя не найдены');

      await downloadMethodology(profile.id as any, id as any);
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при скачивании методики и технологии!'
        );
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (!profile?.id || !id || isNaN(id as any)) {
        addError('Не удалось отклонить заявку');
        return;
      }

      setIsLoading(true);

      await API.methodology.delete(id as any, profile.id as any);

      setIsLoading(false);

      addInfo('Методика и технология успешно удалена!');

      await queryClient.invalidateQueries(
        getMethodologyKey(id as any, profile.id as any)
      );

      navigate('/methodologies');
    } catch (e) {
      if (e instanceof ServerError) {
        addError(
          'Произошла критическая ошибка при удалении методики и технологии!'
        );
      } else if (e instanceof AuthError) {
        handleLogout();
      } else if (e instanceof ApiError) {
        addError(e.message);
      }
    }
  };

  return (
    <Layout>
      <Breadcrumbs
        paths={[
          { link: '/methodologies', alias: 'Методики и технологии' },
          { alias: 'Просмотр методики и технологии' },
        ]}
      />
      {isMethodologyLoading ? (
        <PageLoader />
      ) : isMethodologyError ? (
        <></>
      ) : (
        <>
          <PageHeading
            heading="Просмотр методики и технологии"
            status={methodology!.status}
            isDeleted={methodology!.isDeleted}
            isBest={methodology!.isBest}
            cause={
              <Text isMedium>
                Методика и технология отклонена со следующими ошибками:
                <br />
                {methodology!.cause}
              </Text>
            }
            action={
              <Action
                text="Редактировать"
                icon={<EditIcon />}
                onClick={() => navigate(`/methodologies/${id}/edit`)}
              />
            }
            menu={
              <Dropdown placement="right">
                <div className={styles.dropdownElem} onClick={handlePrint}>
                  <Text isMedium>Распечатать</Text>
                </div>
                <div
                  className={styles.dropdownElem}
                  onClick={handleToggleModal}
                >
                  <Text isMedium className={styles.delete}>
                    Удалить
                  </Text>
                </div>
              </Dropdown>
            }
          />
          <MethodologyPage methodology={methodology!} />
        </>
      )}
      {isModalOpen && (
        <Modal
          isOpen
          isNegative
          text="Вы действительно хотите удалить методику и технологию?"
          submitText="Удалить"
          cancelText="Отмена"
          onSubmit={isLoading ? undefined : (handleDelete as any)}
          onCancel={handleToggleModal}
        />
      )}
    </Layout>
  );
};
