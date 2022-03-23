import { IAPIRoutesConfig } from "./interfaces";
import { EAPIMethod } from "./enums";

export const prefix = "/API";

const API_ROUTES: IAPIRoutesConfig = {
	PROFILE_INFO: {
		url: "/profileInfo",
		method: EAPIMethod.GET,
	},

	MY_FORMS: {
		url: "/myForms",
		method: EAPIMethod.GET,
	},
	MY_PROJECTS: {
		url: "/myProjects",
		method: EAPIMethod.GET,
	},
	MY_EDUCATION_PROGRAMS: {
		url: "/myEducationPrograms",
		method: EAPIMethod.GET,
	},
	MY_SOCIAL_PROGRAMS: {
		url: "/mySocialPrograms",
		method: EAPIMethod.GET,
	},
	MY_CLUBS: {
		url: "/myClubs",
		method: EAPIMethod.GET,
	},
	MY_TECHNOLOGIES: {
		url: "/myTechnologies",
		method: EAPIMethod.GET,
	},

	ADMIN_FORMS: {
		url: "/adminForms",
		method: EAPIMethod.GET,
	},

	PUBLIC_FORMS: {
		url: "/publicForms",
		method: EAPIMethod.GET,
	},
};

export default API_ROUTES;
