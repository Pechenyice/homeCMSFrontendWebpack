import { Routes, Route } from 'react-router-dom';
import CommonBaseAdminRoutesInfo from 'components/CommonRoutesNesting/CommonBaseAdminRoutesInfo';
import { Companies, Project, Projects, ProjectsArchive } from 'pages/admin';
import NotFound from 'components/404/404';
import { AdminMain } from 'components/AdminMain/AdminMain';
import { Company } from 'pages/admin/Company/Company';
import { EducationProgram } from 'pages/admin/educationPrograms/EducationProgram/EducationProgram';
import { EducationPrograms } from 'pages/admin/educationPrograms/EducationPrograms/EducationPrograms';
import { EducationProgramsArchive } from 'pages/admin/educationPrograms/EducationProgramsArchive/EducationProgramsArchive';
import { SocialWork } from 'pages/admin/socialWorks/SocialWork/SocialWork';
import { SocialWorks } from 'pages/admin/socialWorks/SocialWorks/SocialWorks';
import { SocialWorksArchive } from 'pages/admin/socialWorks/SocialWorksArchive/SocialWorksArchive';
import { Club } from 'pages/admin/clubs/Club/Club';
import { Clubs } from 'pages/admin/clubs/Clubs/Clubs';
import { ClubsArchive } from 'pages/admin/clubs/ClubsArchive/ClubsArchive';
import { AdminPanel } from 'pages/admin/AdminPanel/AdminPanel';
import { Library } from 'pages/admin/Library/Library';
import { Statistic } from 'pages/admin/Statistic/Statistic';
import { Methodology } from 'pages/admin/methodologies/Methodology/Methodology';
import { Methodologies } from 'pages/admin/methodologies/Methodologies/Methodologies';
import { MethodologiesArchive } from 'pages/admin/methodologies/MethodologiesArchive/MethodologiesArchive';

const AdministratorApp = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />

      <Route path="/" element={<CommonBaseAdminRoutesInfo />}>
        <Route index element={<AdminMain />} />

        <Route path="admin" element={<AdminPanel />} />
        <Route path="library" element={<Library />} />
        <Route path="statistic" element={<Statistic />} />

        <Route path="users">
          <Route index element={<Companies />} />
          <Route path=":userId">
            <Route index element={<Company />} />

            <Route path="projects/:id" element={<Project />} />
            <Route path="education/:id" element={<EducationProgram />} />
            <Route path="social/:id" element={<SocialWork />} />
            <Route path="clubs/:id" element={<Club />} />
            <Route path="methodologies/:id" element={<Methodology />} />
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
          <Route index element={<SocialWorks />} />
          <Route path="archive" element={<SocialWorksArchive />} />
        </Route>

        <Route path="clubs">
          <Route index element={<Clubs />} />
          <Route path="archive" element={<ClubsArchive />} />
        </Route>

        <Route path="methodologies">
          <Route index element={<Methodologies />} />
          <Route path="archive" element={<MethodologiesArchive />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdministratorApp;
