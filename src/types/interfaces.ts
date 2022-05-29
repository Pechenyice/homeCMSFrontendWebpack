import { EProposalStatus } from './enums';

export interface ISelectValue {
  id: number;
  label: string;
}

export interface IUser {
  login: string;
  password: string;
}

export interface IAPIAuthToken {
  value: string;
  type: string;
}

export interface IProfileData {
  id: number;
  login: string;
  isAdmin: boolean;
}

export interface IProfile extends IProfileData {
  company: ICompany | null;
}

export interface ICompany {
  name: string;
  fullName: string;
  type: number;
  district: number;
  educationLicense: boolean;
  educationLicenseNumber?: string;
  educationLicenseDate?: string;
  educationLicenseKind?: string;
  medicineLicense: boolean;
  medicineLicenseNumber?: string;
  medicineLicenseDate?: string;
  innovationGround: boolean;
  supervisor: string;
  responsible: string;
  link: string;
  phoneNumber: string;
  email: string;
  responsiblePhoneNumber: string;
  status: EProposalStatus;
  cause: string | null;
}

export interface IAPICompany {
  id: string;
  name: string;
  full_name: string;
  owner: string;
  responsible: string;
  organization_type_id: number;
  district_id: number;
  is_has_education_license: boolean;
  is_has_mdedical_license: boolean;
  is_has_innovative_platform: boolean;
  status: string;
  rejected_status_description: string | null;
}

export interface IPreloader {
  shouldDisplay: boolean;
}

export interface IInternal {
  authFinished: boolean;
  isAuthed: boolean;
}

export interface IEvent {
  id: number;
  text: string;
}

export interface IErrorsList {
  list: IEvent[];
}

export interface IInputsState {
  [key: string]: IInput;
}

export interface IProfileState {
  name: IInput;
  fullName: IInput;
  type: number;
  district: number;
  link: IInput;
  phoneNumber: IInput;
  email: IInput;
  responsiblePhoneNumber: IInput;
  supervisor: IInput;
  responsible: IInput;
  educationLicense: boolean;
  educationLicenseNumber: IInput;
  educationLicenseDate: IInput;
  educationLicenseKind: IInput;
  medicineLicense: boolean;
  medicineLicenseNumber: IInput;
  medicineLicenseDate: IInput;
  innovationGround: boolean;
}

export interface IInput {
  value: string;
  validator: (value: string | number) => IValidationResult;
  error: IInputError;
}

export interface IInputError {
  exist: boolean;
  text: string;
}

export interface IValidationResult {
  success: boolean;
  text: string;
}

export interface IValidationObject {
  value: string | number;
  validator: (value: string | number) => IValidationResult;
}

export interface IBreadcrumbsPath {
  link: string;
  alias: string;
}
