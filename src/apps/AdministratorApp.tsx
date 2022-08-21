import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CommonBaseAdminRoutesInfo from 'components/CommonRoutesNesting/CommonBaseAdminRoutesInfo';
import { Companies, Project, Projects, ProjectsArchive } from 'pages/admin';
import NotFound from 'components/404/404';
import { AdminMain } from 'components/AdminMain/AdminMain';
import { Company } from 'pages/admin/Company/Company';
import { EducationProgram } from 'pages/admin/educationPrograms/EducationProgram/EducationProgram';
import { EducationPrograms } from 'pages/admin/educationPrograms/EducationPrograms/EducationPrograms';
import { EducationProgramsArchive } from 'pages/admin/educationPrograms/EducationProgramsArchive/EducationProgramsArchive';
import { SocialWork } from 'pages/admin/socialWorks/SocialWork/SocialWork';
import { SocialWorksPrograms } from 'pages/admin/socialWorks/SocialWorksPrograms/SocialWorksPrograms';
import { SocialWorksArchive } from 'pages/admin/socialWorks/SocialWorksArchive/SocialWorksArchive';

const AdministratorApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<CommonBaseAdminRoutesInfo />}>
          <Route index element={<AdminMain />} />

          <Route path="users">
            <Route index element={<Companies />} />
            <Route path=":userId">
              <Route index element={<Company />} />

              <Route path="projects/:id" element={<Project />} />
              <Route path="education/:id" element={<EducationProgram />} />
              <Route path="social/:id" element={<SocialWork />} />
            </Route>
          </Route>

          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path="archive" element={<ProjectsArchive />} />
          </Route>

          <Route path="education">
            <Route index element={<EducationPrograms />} />
            <Route path="archive" element={<EducationProgramsArchive />} />
          </Route>

          <Route path="social">
            <Route index element={<SocialWorksPrograms />} />
            <Route path="archive" element={<SocialWorksArchive />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AdministratorApp;
