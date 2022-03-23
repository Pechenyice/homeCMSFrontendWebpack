import { FC, useState } from 'react';
import { IEvent } from 'types/interfaces';
import { createContext } from 'react';
import { InfosList } from 'components';

export interface IInfosContextValues {
  addInfo: (text: string) => void;
  removeInfo: (id: number) => void;
  removeAllInfos: () => void;
  infos: IEvent[];
}

export const InfosContext = createContext({} as IInfosContextValues);

export const InfosProvider: FC = ({ children }) => {
  const [infos, setInfos] = useState<IInfosContextValues['infos']>([]);

  const addInfo = (text: IEvent['text']) => {
    const id = infos.length ? infos[infos.length - 1].id + 1 : 0;
    setInfos([...infos, { id, text }]);
  };

  const removeInfo = (id: IEvent['id']) => {
    setInfos(infos.filter((e) => e.id !== id));
  };

  const removeAllInfos = () => {
    setInfos([]);
  };

  return (
    <InfosContext.Provider
      value={{
        infos,
        addInfo,
        removeInfo,
        removeAllInfos,
      }}
    >
      <InfosList />
      {children}
    </InfosContext.Provider>
  );
};
