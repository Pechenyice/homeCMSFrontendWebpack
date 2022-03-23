export function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error: any = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
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
    },
    signal: controller.signal,
  };

  if (method === 'POST') options.body = JSON.stringify(body);
  if (method === 'PUT') options.body = JSON.stringify(body);

  return fetch(url, options)
    .then(checkStatus)
    .then((response) => response.json());
}
