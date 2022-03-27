import { ApiError, AuthError, ServerError } from './errors';

async function checkResponse(response: any) {
  if (response.status === 200) {
    return response.json();
  }
  if (response.status === 401) {
    throw new AuthError(response.error);
  }
  if (response.status === 500) {
    throw new ServerError(
      'Произошла ошибка при взаимодействии с сервером, попробуйте позже!'
    );
  }
  throw new ApiError((await response.json()).error);
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
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    signal: controller.signal,
  };

  if (method === 'POST') options.body = JSON.stringify(body);
  if (method === 'PUT') options.body = JSON.stringify(body);

  return fetch(url, options).then(checkResponse);
}
