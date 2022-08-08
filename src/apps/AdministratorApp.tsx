import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CommonBaseAdminRoutesInfo from 'components/CommonRoutesNesting/CommonBaseAdminRoutesInfo';
import { Project } from 'pages/admin';
import NotFound from 'components/404/404';
import { AdminMain } from 'components/AdminMain/AdminMain';

const AdministratorApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<CommonBaseAdminRoutesInfo />}>
          <Route index element={<AdminMain />} />

          <Route path="users">
            {/* <Route index element={<Companies />} /> */}
            <Route path=":userId">
              {/* <Route index element={<Company />} /> */}
              <Route path="projects/:id" element={<Project />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AdministratorApp;
