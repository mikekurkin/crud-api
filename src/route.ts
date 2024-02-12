import {
  BadRequestError,
  HttpError,
  NotFoundError,
  ServerError,
} from './errors.ts';
import { routes } from './controller.ts';
import { ApiHandler, ApiRouter } from './types.ts';

const errorHandler = (err: Error): ApiHandler => {
  const httpErr = err instanceof HttpError ? err : new ServerError(err.message);
  return () => ({
    code: httpErr.code,
    data: `${httpErr.code}: ${httpErr.message}`,
  });
};

export const route: ApiRouter = (method?: string, url?: string) => {
  const apiRoot = process.env.API_ROOT || '/api/';
  if (!method || !url || !url.startsWith(apiRoot))
    return errorHandler(new BadRequestError());
  const relativeUrl = url.slice(apiRoot.length);
  const [resource, resourceId] = relativeUrl.split('/');
  const action = (() => {
    if (method == 'GET' && !resourceId) return 'list';
    if (method == 'POST' && !resourceId) return 'create';
    if (method == 'GET' && resourceId) return 'read';
    if (method == 'PUT' && resourceId) return 'update';
    if (method == 'DELETE' && resourceId) return 'delete';
  })();
  if (!action) return errorHandler(new BadRequestError('Method Now Allowed'));
  if (!resource || !routes[resource]?.[action])
    return errorHandler(new NotFoundError('Resource Not Found'));
  const handler: ApiHandler = (requestData?) => {
    try {
      return routes[resource]![action]!({
        ...(requestData || { get: {}, post: {} }),
        resourceId,
      });
    } catch (err) {
      return errorHandler(err as Error)();
    }
  };
  return handler;
};
