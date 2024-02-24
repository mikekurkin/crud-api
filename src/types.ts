type HandlerResponse = {
  code: number;
  data: Object | string;
};

type ApiHandler = {
  (requestData?: RequestData): HandlerResponse;
};

type RequestData = { resourceId?: string; get: {}; post: {} };

type ApiRouter = {
  (method?: string, url?: string): ApiHandler;
};

type HandlersDictionary = {
  [resource: string]: {
    [action: string]: ApiHandler;
  };
};

export {
  ApiHandler,
  ApiRouter,
  HandlerResponse,
  HandlersDictionary,
  RequestData,
};
