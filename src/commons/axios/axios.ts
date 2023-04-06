import axios from "axios";
const { NEXT_PUBLIC_CMS_TOKEN, NEXT_PUBLIC_CMS_URL, NEXT_PUBLIC_API_URL } =
  process.env;

export const CMSURL = process.env.NEXT_PUBLIC_CMS_URL;
export const CMS_TOKEN = process.env.NEXT_PUBLIC_CMS_TOKEN;
export const APIURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: CMSURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "")
);

export const apiServer = axios.create({
  baseURL: APIURL,
});

export const cmsServer = axios.create({
  baseURL: CMSURL,
});

apiServer.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || ``)
);

const pureAxiosInstance = axios.create({
  baseURL: CMSURL,
});

pureAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || ``)
);

export default pureAxiosInstance;
