import { API } from 'api/controller';

export const downloadCompany = async (userId: number) => {
  const response = await API.company.download(userId);

  const blob = await response.blob();

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = `company_${userId}.pdf`;
  a.click();
};

export const downloadProject = async (userId: number, id: number) => {
  const response = await API.project.download(userId, id);

  const blob = await response.blob();

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = `company_${userId}_project_${id}.pdf`;
  a.click();
};
