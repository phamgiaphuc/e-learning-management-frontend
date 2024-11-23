export const getToken = (key: string) => {
  return localStorage.getItem(key);
};

export const setToken = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export const removeToken = (key: string) => {
  return localStorage.removeItem(key);
};
