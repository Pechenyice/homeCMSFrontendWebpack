import { API } from 'api/controller';

export const exportCsv = async (path: string) => {
  console.log('here');
  const response = await API.statistic.exportCsv(path);

  console.log('here1');

  console.log(response);

  const blob = await response.blob();

  const a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = `export_${path}_${Date.now()}.csv`;
  a.click();
};
