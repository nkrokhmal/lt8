export const Protocol = {
  HTTP: 'http',
  HTTPS: 'https'
};

export const HTTPStatus = {
  Ok: 200,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
  ServiceUnavailable: 503
};

const api_url = 'leaders-api.northeurope.cloudapp.azure.com';
export const openviduServerUrl = 'https://openvidu-lt.northeurope.cloudapp.azure.com';
export const openviduSecret = 'SECRET';
export const DEFAULT_HOST = process.env.API_URL || api_url;
export const DEFAULT_PROTOCOL = Protocol.HTTPS;
export const DEFAULT_TIMEOUT = 30000;
export const DEFAULT_API_ROOT = 'api';
