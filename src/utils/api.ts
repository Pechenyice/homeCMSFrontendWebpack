import {prefix} from 'api';

const constructAPIRoute = (route: string): string => `${prefix}${route}`;

export { constructAPIRoute };
