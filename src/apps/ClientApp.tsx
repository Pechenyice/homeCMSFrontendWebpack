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
import { EducationPrograms } from 'pages/educationPrograms/EducationPrograms/EducationPrograms';
import { EducationProgram } from 'pages/educationPrograms/EducationProgram/EducationProgram';
import { EducationProgramCreation } from 'pages/educationPrograms/EducationProgramCreation/EducationProgramCreation';
import { EducationProgramEdition } from 'pages/educationPrograms/EducationProgramEdition/EducationProgramEdition';
import { SocialWorks } from 'pages/socialWorks/SocialWorks/SocialWorks';
import { SocialWork } from 'pages/socialWorks/SocialWork/SocialWork';
import { SocialWorkCreation } from 'pages/socialWorks/SocialWorkCreation/SocialWorkCreation';
import { SocialWorkEdition } from 'pages/socialWorks/SocialWorkEdition/SocialWorkEdition';
import { Clubs } from 'pages/clubs/Clubs/Clubs';
import { Club } from 'pages/clubs/Club/Club';
import { ClubCreation } from 'pages/clubs/ClubCreation/ClubCreation';
import { ClubEdition } from 'pages/clubs/ClubEdition/ClubEdition';
import { Methodologoies } from 'pages/methodologies/Methodologoies/Methodologoies';
import { Methodology } from 'pages/methodologies/Methodology/Methodology';
import { MethodologyCreation } from 'pages/methodologies/MethodologyCreation/MethodologyCreation';
import { MethodologyEdition } from 'pages/methodologies/MethodologyEdition/MethodologyEdition';

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

          <Route path="education">
            <Route index element={<EducationPrograms />} />
            <Route path="create" element={<EducationProgramCreation />} />
            <Route path=":id">
              <Route index element={<EducationProgram />} />
              <Route path="edit" element={<EducationProgramEdition />} />
            </Route>
          </Route>

          <Route path="social">
            <Route index element={<SocialWorks />} />
            <Route path="create" element={<SocialWorkCreation />} />
            <Route path=":id">
              <Route index element={<SocialWork />} />
              <Route path="edit" element={<SocialWorkEdition />} />
            </Route>
          </Route>

          <Route path="clubs">
            <Route index element={<Clubs />} />
            <Route path="create" element={<ClubCreation />} />
            <Route path=":id">
              <Route index element={<Club />} />
              <Route path="edit" element={<ClubEdition />} />
            </Route>
          </Route>

          <Route path="methodologies">
            <Route index element={<Methodologoies />} />
            <Route path="create" element={<MethodologyCreation />} />
            <Route path=":id">
              <Route index element={<Methodology />} />
              <Route path="edit" element={<MethodologyEdition />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default ClientApp;
