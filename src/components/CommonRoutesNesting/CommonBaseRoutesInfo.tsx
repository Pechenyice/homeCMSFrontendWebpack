import { Outlet } from 'react-router-dom';
import { Header } from 'components';

const CommonBaseRoutesInfo = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default CommonBaseRoutesInfo;
