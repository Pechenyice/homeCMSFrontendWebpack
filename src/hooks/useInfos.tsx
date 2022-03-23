import { InfosContext } from 'contexts/InfosContext';
import { useContext } from 'react';

export const useInfos = () => {
  const { infos, addInfo, removeInfo, removeAllInfos } = useContext(InfosContext);

  return {
    infos,
    addInfo,
    removeInfo,
    removeAllInfos,
  };
};
