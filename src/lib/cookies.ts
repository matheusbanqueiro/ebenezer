import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, maxAgeInSeconds: number) => {
  Cookies.set(name, value, { expires: maxAgeInSeconds / 86400 }); // expires in days
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const clearCookie = (name: string) => {
  Cookies.remove(name);
};
