import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: `http://localhost:${process.env.PORT}/api/`,
  baseURL: `http://14.161.28.224:4001/api/`,
  timeout: 25000,
  // headers: {
  //   'X-Access-Token': 'accessToken'
  // }
});

export function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};