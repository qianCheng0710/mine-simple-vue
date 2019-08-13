// 防抖
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
    let last = +new Date() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = +new Date();
    // 第一次调用该方法时，且immediate为true，则调用func函数
    let callNow = immediate && !timeout;
    // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
// 数字2位转换
export function toDouble(num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return num;
  }
}
// 数字位数
export function getNumBit(num) {
  let intNum = num.toFixed(0);
  return intNum.length;
}
// 动态加载js
export function loadApi(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = '';
    script.src = src;
    document.head.appendChild(script);

    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
  });
}
// 动态加载css
export function loadCss(src) {
  return new Promise(resolve => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = src;
    document.head.appendChild(link);
    resolve();
  });
}
// 对象取值
export function getVal(obj, path, returnedVal) {
  if (path == null || obj == null) {
    return returnedVal;
  }
  const pathArr = path.split('.');
  let result = obj;
  for (let i = 0, l = pathArr.length; i < l; i++) {
    const prop = pathArr[i];
    result = result[prop];
    if (result == null) {
      result = returnedVal
      break;
    }
  }
  return result;
}
// 冒泡排序
export function bubbleSort(arr) {
  let i = arr.length - 1;
  while (i > 0) {
    let maxIndex = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        maxIndex = j;
      }
    }
    i = maxIndex;
  }
  return arr;
}
// 通过属性值冒泡排序
export function bubbleSortByProp(arr, prop) {
  let i = arr.length - 1;
  while (i > 0) {
    let maxIndex = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j][prop] > arr[j + 1][prop]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        maxIndex = j;
      }
    }
    i = maxIndex;
  }
  return arr;
}
// 按照属性值把数组分类
export function arrClassifyByProp(arr, prop) {
  let result = {};
  arr.forEach(item => {
    const key = item[prop];
    if (result[key]) {
      result[key].push(item);
    } else {
      result[key] = [item];
    }
  });
  return result;
}
// 获取指定月份天数
export function getDateByMon(year, month) {
  let d = new Date(year, month, 0);
  return d.getDate();
}
// 判断时间是不是今天
export function isTodayDate(time) {
  if (time.toDateString() === new Date().toDateString()) {
    return true;
  } else {
    return false;
  }
}
// 扁平化对象数组
export function flatObjArr(obj) {
  let result = [];
  Object.keys(obj).forEach(key => {
    const list = obj[key];
    result = result.concat(list);
  });
  return result;
}
// 数组对象属性值转换映射对象 (参数 'a:b' [{a: c, b: d}] --> {c: d})
export function arrPropValToMap(arr, format) {
  const pArr = format.split(':');
  const p1 = pArr[0];
  const p2 = pArr[1];
  let res = {};
  for (let i = 0, l = arr.length; i < l; i++) {
    let v1 = arr[i][p1];
    let v2 = arr[i][p2];
    result[v1] = result[v2];
  }
  return res;
}
// 首字母大写
export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
// 过滤值为空字符串或者为null的请求参数
export function getQuery(query) {
  let res = {};
  for (let [key, val] of Object.entries(query)) {
    if (typeof val === 'string') {
      if (!val.trim()) {
        continue;
      }
    } else {
      if (val == null) {
        continue;
      }
    }
    res[key] = val;
  }
  return res;
}
