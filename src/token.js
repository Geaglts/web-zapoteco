const AUTH_TOKEN = "Token";
const IS_ADMIN = "Admin";

// TOKEN SESSION
export const getToken = () => sessionStorage.getItem(AUTH_TOKEN);
export const setToken = (token) => sessionStorage.setItem(AUTH_TOKEN, token);
export const deleteToken = () => sessionStorage.removeItem(AUTH_TOKEN);

// ADMIN
export const setAdmin = (value) => sessionStorage.setItem(IS_ADMIN, value);
export const getAdmin = () => sessionStorage.getItem(IS_ADMIN);
export const deleteAdmin = () => sessionStorage.removeItem(IS_ADMIN);
