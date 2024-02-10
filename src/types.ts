type HandlerResponse = {
  code: number;
  data: Object | string;
};

type ApiHandler = {
  (resourceId?: string): HandlerResponse;
};

type ApiRouter = {
  (method?: string, url?: string): ApiHandler;
};

type HandlersDictionary = {
  [resource: string]: {
    [action: string]: ApiHandler;
  };
};

export { ApiHandler, ApiRouter, HandlerResponse, HandlersDictionary };
