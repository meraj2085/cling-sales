const { authKey } = require("@/constants/storageKey");
const { decodedToken } = require("@/utils/jwt");
const {
  getFromLocalStorage,
  setToLocalStorage,
} = require("@/utils/localStorage");

export const removeUserInfo = (key) => {
  return localStorage.removeItem(key);
};

export const storeUserInfo = ({ accessToken }) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  const decodedData = authToken ? decodedToken(authToken) : null;
  if (decodedData) {
    const exp = decodedData.exp * 1000;
    const currentTime = new Date().getTime();
    if (currentTime > exp) {
      removeUserInfo(authKey);
    }
  }
  return !!authToken;
};
