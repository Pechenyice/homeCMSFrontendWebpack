import { ParsedQuery } from 'query-string';

export const parseDateToAPI = (date: string) => {
  return date.split('-').reverse().join('.');
};

export const parseFilterParams = (
  params: ParsedQuery,
  multipleFilterKeys: string[]
) => {
  const parsedParams = Object.entries(params).reduce(
    (acc: any, [key, value]) => {
      if (multipleFilterKeys.includes(key)) {
        acc[key] = (value as string).split(',').map((val) => +val);
        return acc;
      }

      acc[key] = value as string;
      return acc;
    },
    {}
  );
  return parsedParams;
};
