import { ApiError, AuthError, ServerError } from './errors';

export function checkStatus(response: any) {
  if (response.status === 200) {
    return response;
  }
  if (response.status === 401) {
    throw new AuthError(response.error);
  }
  if (response.status === 500) {
    throw new ServerError(
      'Произошла ошибка при взаимодействии с сервером, попробуйте позже!'
    );
  }
  throw new ApiError(response.error);
}

export function safeFetch(
  url: string,
  method: string,
  controller: AbortController,
  body: any = {}
) {
  const options: any = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    signal: controller.signal,
  };

  if (method === 'POST') options.body = JSON.stringify(body);
  if (method === 'PUT') options.body = JSON.stringify(body);

  return fetch(url, options)
    .then(checkStatus)
    .then((response) => response.json());
}
