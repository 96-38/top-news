export type TODO_FROM_JS_TO_TS = any;

export type GetElms = (
  page: any,
  url: string,
  titleSelector: string,
  linkSelector: string,
  imgSelector?: string
) => Promise<TODO_FROM_JS_TO_TS>;
