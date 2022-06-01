export const parseDateToAPI = (date: string) => {
  return date.split('-').reverse().join('.');
};
