export const HOST = import.meta.env.VITE_SERVER_URL;

//--------------------AUTH ROUTES---------------------------//

export const AUTH_ROUTE = "/auth";
export const SIGN_UP = `${AUTH_ROUTE}/signup`;
export const LOG_IN = `${AUTH_ROUTE}/login`;

//--------------------BLOG ROUTES---------------------------//

export const BLOG_ROUTE = "/blogs";
export const GET_ALL_BLOGS = `${BLOG_ROUTE}`;
