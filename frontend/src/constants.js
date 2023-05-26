export const ROUTE_HOME = "/";
export const ROUTE_ARTICLE_PREFIX = "/articles";
export const ROUTE_ARTICLE_LIST = "/articles/list";
export const ROUTE_ARTICLE_CREATE = "/articles/create";
export const ROUTE_ARTICLE_EDIT = "/articles/:articleId";
export const ROUTE_AUTHOR_PREFIX = "/authors";
export const ROUTE_AUTHOR_LIST = "/authors/list";
export const ROUTE_AUTHOR_CREATE = "/authors/create";
export const ROUTE_AUTHOR_EDIT = "/authors/:authorId";
const AUTHOR_DEFAULT_VALUE_ID = "id";
const AUTHOR_DEFAULT_VALUE_FRIST_NAME = "firstName";
const AUTHOR_DEFAULT_VALUE_LAST_NAME = "lastName";
export const AUTHOR_DEFAULT_VALUE = {
  [AUTHOR_DEFAULT_VALUE_ID]: 0,
  [AUTHOR_DEFAULT_VALUE_FRIST_NAME]: "No Author",
  [AUTHOR_DEFAULT_VALUE_LAST_NAME]: "Selected",
};
export const SNACKBAR_VARIANT_ERROR = "error";
export const SNACKBAR_VARIANT_SUCCESS = "success";
