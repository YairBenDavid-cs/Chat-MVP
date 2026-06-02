import { HttpResponse } from 'msw';

export type ErrorBody = { code: string; message: string };

export function unauthorized(
  message: string = 'Missing or invalid token',
): HttpResponse<ErrorBody> {
  return HttpResponse.json({ code: 'UNAUTHORIZED', message }, { status: 401 });
}

export function notFound(message: string): HttpResponse<ErrorBody> {
  return HttpResponse.json({ code: 'NOT_FOUND', message }, { status: 404 });
}

export function forbidden(message: string): HttpResponse<ErrorBody> {
  return HttpResponse.json({ code: 'FORBIDDEN', message }, { status: 403 });
}

export function badRequest(message: string): HttpResponse<ErrorBody> {
  return HttpResponse.json({ code: 'BAD_REQUEST', message }, { status: 400 });
}
