import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CommonBaseRoutesInfo, Main } from 'components';
import NotFound from 'components/404/404';
import {
  Profile,
  ProfileEditor,
  Project,
  ProjectCreation,
  Projects,
} from 'pages';
import { ProjectEdition } from 'pages/projects/ProjectEdition/ProjectEdition';

const ClientApp = () => {
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

          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path="create" element={<ProjectCreation />} />
            <Route path=":id">
              <Route index element={<Project />} />
              <Route path="edit" element={<ProjectEdition />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default ClientApp;
