import axios from 'axios';
import { service, loginService } from './index';

const STATUS_OK = 200;
const STATUS_DEL = 204;
const STATUS_CREATE = 201;

export function login(url) {
  return function(data) {
    return loginService
      .post(url, data)
      .then(res => {
        const { status, data } = res;
        if (status === STATUS_OK) {
          return data;
        } else {
          return Promise.reject(res);
        }
      })
      .catch(err => Promise.reject(err.response.data));
  };
}

export function get(url) {
  return function(params, config) {
    return service
      .get(url, {
        ...config,
        params
      })
      .then(res => {
        const { status, data } = res;
        if (status === STATUS_OK) {
          return data;
        } else {
          return Promise.reject(res);
        }
      })
      .catch(err => Promise.reject(err.response.data));
  };
}

export function getJson(url) {
  return function() {
    return axios
      .get(url)
      .then(res => {
        const { status, data } = res;
        if (status === STATUS_OK) {
          return data;
        } else {
          return Promise.reject(res);
        }
      })
      .catch(err => Promise.reject(err.response.data));
  };
}

export function post(url) {
  return function(data, config) {
    return service
      .post(url, data, config)
      .then(res => {
        const { status, data } = res;
        if (status === STATUS_OK || status === STATUS_CREATE) {
          return data;
        } else {
          return Promise.reject(res);
        }
      })
      .catch(err => Promise.reject(err.response.data));
  };
}

export function del(url) {
  return function(params, config) {
    return service
      .delete(url, {
        ...config,
        params
      })
      .then(res => {
        const { status, data } = res;
        if (status === STATUS_OK || status === STATUS_DEL) {
          return data;
        } else {
          return Promise.reject(res);
        }
      })
      .catch(err => Promise.reject(err.response.data));
  };
}

export function put(url) {
  return function(data, config) {
    return service
      .put(url, data, config)
      .then(res => {
        const { status, data } = res;
        if (status === STATUS_OK) {
          return data;
        } else {
          return Promise.reject(res);
        }
      })
      .catch(err => Promise.reject(err.response.data));
  };
}

export function getBlob(url) {
  return function(params, config) {
    return service
      .get(url, {
        params,
        ...config,
        responseType: 'blob'
      })
      .then(res => {
        const { status, data } = res;
        if (status === STATUS_OK) {
          const URL = window.URL || window.webkitURL;
          return URL.createObjectURL(data);
        }
      });
  };
}

export function postform(url) {
  return function(data, config) {
    return service
      .post(url, data, {
        ...config,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
        const { status, data } = res;
        if (status === STATUS_OK || status === STATUS_CREATE) {
          return data;
        } else {
          return Promise.reject(res);
        }
      })
      .catch(err => Promise.reject(err.response.data));
  };
}
