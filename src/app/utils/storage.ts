const APP_ID = "ng-bs_";

export const setItem = (key, data) => {
  localStorage.setItem(APP_ID + key, JSON.stringify(data));
};

export const getItem = (key, defaultVal) => {
  try {
    return JSON.parse(localStorage.getItem(APP_ID + key)) || defaultVal;
  } catch (e) {
    return defaultVal || false;
  }
};

export const deleteItem = key => {
  localStorage.removeItem(APP_ID + key);
};
