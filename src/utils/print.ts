import { API } from 'api/controller';

export const downloadCompany = async (userId: number) => {
  const response = await API.company.download(userId);

  const blob = await response.blob();

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = `company_${userId}.pdf`;
  a.click();
};

export const downloadProject = async (
  userId: number,
  id: number,
  isAdmin?: boolean
) => {
  const response = await API.project.download(userId, id, isAdmin);

  const blob = await response.blob();

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = `company_${userId}_project_${id}.pdf`;
  a.click();
};

export const downloadEducationProgram = async (
  userId: number,
  id: number,
  isAdmin?: boolean
) => {
  const response = await API.educationProgram.download(userId, id, isAdmin);

  const blob = await response.blob();

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = `company_${userId}_edu_program_${id}.pdf`;
  a.click();
};

export const downloadSocialWork = async (
  userId: number,
  id: number,
  isAdmin?: boolean
) => {
  const response = await API.socialWork.download(userId, id, isAdmin);

  const blob = await response.blob();

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = `company_${userId}_social_work_${id}.pdf`;
  a.click();
};

export const downloadClub = async (
  userId: number,
  id: number,
  isAdmin?: boolean
) => {
  const response = await API.club.download(userId, id, isAdmin);

  const blob = await response.blob();

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = `company_${userId}_club_${id}.pdf`;
  a.click();
};

export const downloadMethodology = async (
  userId: number,
  id: number,
  isAdmin?: boolean
) => {
  const response = await API.methodology.download(userId, id, isAdmin);

  const blob = await response.blob();

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = `company_${userId}_methodology_${id}.pdf`;
  a.click();
};
