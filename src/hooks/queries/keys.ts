export const districtsKey = 'district';
export const organizationTypesKey = 'organization-type';
export const realisationForCitizenKey = 'payment-method';
export const realizationLevelsKey = 'implementation-level';
export const attractingVolunteerKey = 'volunteer';
export const rnsuCategoriesKey = 'rnsu-category';
export const categoriesKey = 'needy-category';
export const groupsKey = 'needy-category-target-group';
export const circumstancesRecognitionNeedKey = 'need-recognition';
export const worksKindsKey = 'service-type';
export const worksNamesKey = 'service-name';
export const gosWorkNamesKey = 'public-work';
export const socialHelpFormKey = 'social-service';
export const directionsKey = 'direction';
export const conductingClassesFormKey = 'conducting-classes-form';
export const programTypesKey = 'program-type';
export const prevalencesKey = 'prevalence';
export const applicationPeriodsKey = 'application-period';
export const activityOrganizationFormsKey = 'activity-organization-form';

export const getEntitiesYearsKey = 'entitiesYears';

export const getLibraryWordKey = (id: string) => ['libraryWord', id];

export const getProjectKey = (id: string, userId?: number) => [
  'project',
  id,
  userId,
];

export const getEducationProgramKey = (id: string, userId?: number) => [
  'educationProgram',
  id,
  userId,
];

export const getSocialWorkKey = (id: string, userId?: number) => [
  'socialWork',
  id,
  userId,
];

export const getClubKey = (id: string, userId?: number) => ['club', id, userId];

export const getMethodologyKey = (id: string, userId?: number) => [
  'methodology',
  id,
  userId,
];

export const getCompanyKey = (userId: string) => ['company', userId];
