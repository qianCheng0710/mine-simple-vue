import axios from 'axios';
import router from '../../router';
import Cookie from 'js-cookie';
import ELEMENT from 'element-ui';

export const BASE_URL = process.env.VUE_APP_BASE_URL;

export const loginService = axios.create({
  timeout: 30000,
  baseURL: BASE_URL,
  withCredentials: true
});

export const service = axios.create({
  timeout: 30000,
  baseURL: BASE_URL,
  withCredentials: true
});

service.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';

service.interceptors.request.use(
  config => {
    if (config.getUrl) {
      config.url = config.getUrl(config.url);
    }
    const token = localStorage.getItem('access_token') || null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      if (error.message.includes('timeout')) {
        // 网络超时
      } else {
        // 断网状态
      }
      return;
    }
    const status = error.response.status;
    switch (status) {
      case 401:
        // 无权限
        localStorage.removeItem('access_token');
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        }, 600);
        ELEMENT.Message.error('身份过期，请重新登录');
        break;
      case 403:
        // 登录信息过期，请重新登录
        localStorage.removeItem('access_token');
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        }, 600);
        break;
      case 404:
        // 网络请求不存在
        break;
      default:
        // 其他错误
        console.log(error.message);
    }
    return Promise.reject(error);
  }
);
