export const HOST = import.meta.env.VITE_SERVER_URL;

//--------------------AUTH ROUTES---------------------------//

export const AUTH_ROUTE = "/auth";
export const SIGN_UP = `${AUTH_ROUTE}/signup`;
export const LOG_IN = `${AUTH_ROUTE}/login`;

//--------------------BLOG ROUTES---------------------------//

export const BLOG_ROUTE = "/blogs";
export const GET_ALL_BLOGS = `${BLOG_ROUTE}`;
export const FILTER_BLOGS = (categories = [], authors = []) => {
  const authorQuery = authors.join(",");
  const categoryQuery = categories.join(",");
  const queryParams = [];

  if (categories.length > 0)
    queryParams.push(`category=${encodeURIComponent(categoryQuery)}`);
  if (authors.length > 0)
    queryParams.push(`author=${encodeURIComponent(authorQuery)}`);

  return `${BLOG_ROUTE}/filter?${queryParams.join("&")}`;
};
