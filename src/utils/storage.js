export const localStore = {
  setItem(key, val) {
    try {
      const strVal = JSON.stringify(val); 
      localStorage.setItem(key, strVal);
    } catch {
      console.log('"localStorage.setItem" is invalid');
    }
  },
  getItem(key, defaultVal) {
    try {
      const val = localStorage.getItem(key);
      return JSON.parse(val);
    } catch {
      console.log('"localStorage.getItem" is invalid');
      return defaultVal;
    }
  }
}

export const sessionStore = {
  setItem(key, val) {
    try {
      const strVal = JSON.stringify(val); 
      sessionStorage.setItem(key, strVal);
    } catch {
      console.log('"sessionStorage.setItem" is invalid');
    }
  },
  getItem(key, defaultVal) {
    try {
      const val = sessionStorage.getItem(key);
      return JSON.parse(val);
    } catch {
      console.log('"sessionStorage.getItem" is invalid');
      return defaultVal;
    }
  }
}