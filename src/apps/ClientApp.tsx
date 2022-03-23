import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CommonBaseRoutesInfo, Main } from 'components';
import NotFound from 'components/404/404';
import { useAuth, useInfos } from 'hooks';
import { useEffect } from 'react';
import { Profile, ProfileEditor } from 'pages';

const ClientApp = () => {
  const { addInfo } = useInfos();
  const { profile } = useAuth();

  useEffect(() => {
    addInfo(`Добро пожаловать в систему Homekid, ${profile?.company?.name}`);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<CommonBaseRoutesInfo />}>
          <Route index element={<Main />} />
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="edit" element={<ProfileEditor />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default ClientApp;
