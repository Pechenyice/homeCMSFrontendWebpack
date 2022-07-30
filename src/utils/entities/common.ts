import { ISelectRelations, ISelectValue } from 'types/interfaces';

export const getRelatedCategoriesOptions = (
  parents: number[],
  children: ISelectValue[],
  relations: ISelectRelations
): ISelectValue[] => {
  if (!parents.length) return [];

  let options: number[] = [];

  parents.forEach((parent) => {
    if (relations[`${parent}`])
      options = [...options, ...relations[`${parent}`]];
  });

  if (!options.length) return [];

  return children.filter((child) => options.includes(child.id));
};
