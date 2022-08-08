import { Outlet } from 'react-router-dom';
import { AdminHeader } from 'components';

const CommonBaseAdminRoutesInfo = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};

export default CommonBaseAdminRoutesInfo;
