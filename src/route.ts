import { ApiHandler, ApiRouter } from 'types.ts';
import { routes } from './routes.ts';

export const notFoundHandler: ApiHandler = () => {
  return { code: 404, data: 'Not Found' };
};
export const badRequestHandler: ApiHandler = () => {
  return { code: 400, data: 'Bad Request' };
};
export const serverErrorHandler: ApiHandler = () => {
  return { code: 500, data: 'Internal Server Error' };
};

export const route: ApiRouter = (method?: string, url?: string) => {
  const apiRoot = process.env.API_ROOT || '/api/';
  if (!method || !url || !url.startsWith(apiRoot)) return badRequestHandler;
  const relativeUrl = url.slice(apiRoot.length);
  const [resource, resourceId] = relativeUrl.split('/');
  const action = (() => {
    if (method == 'GET' && !resourceId) return 'list';
    if (method == 'POST' && !resourceId) return 'create';
    if (method == 'GET' && resourceId) return 'read';
    if (method == 'PUT' && resourceId) return 'update';
    if (method == 'DELETE' && resourceId) return 'delete';
  })();
  if (!action || !resource || !routes[resource]?.[action])
    return badRequestHandler;
  const handler: ApiHandler = (requestData?) => {
    return routes[resource]![action]!({
      ...(requestData || { get: {}, post: {} }),
      resourceId,
    });
  };
  return handler;
};
