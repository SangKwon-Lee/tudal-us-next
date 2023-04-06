import dayjs from "dayjs";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
export const setCookie = (name: string, value: string, option?: any) => {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getMonth() + 1);
  return cookies.set(name, value);
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};
