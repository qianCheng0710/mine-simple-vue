const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const resolve = (...file) => path.resolve(__dirname, ...file);
const log = message => console.log(chalk.blue(`${message}`));
const successLog = success => console.log(chalk.green(`${success}`));
const errorLog = error => console.log(chalk.red(`${error}`));
const { vueTemplate } = require('./template');

const createFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog('文件已存在');
    return;
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

// 递归创建目录
function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory);
  if (exists) {
    callback();
  } else {
    mkdirs(path.dirname(directory), function() {
      fs.mkdirSync(directory);
      callback();
    });
  }
}

function dotExistDirectoryCreate(directory) {
  return new Promise(resolve => {
    mkdirs(directory, function() {
      resolve(true);
    });
  });
}

log('请输入要生成的组件名称');

let viewName = '';
process.stdin.on('data', async chunk => {
  const inputName = String(chunk)
    .trim()
    .toString();
  /**
   * vue页面组件
   */
  let viewVueName = resolve('../src/views', inputName);
  // 如果不是以 .vue 结尾的话，自动加上
  if (!viewVueName.endsWith('.vue')) {
    viewVueName += '.vue';
  }
  /**
   * vue页面组件路径
   */
  const componentDirectory = path.dirname(viewVueName);
  const hasComponentExists = fs.existsSync(viewVueName);
  if (hasComponentExists) {
    errorLog(`${inputName}页面组件已存在，请重新输入`);
    return;
  } else {
    log(`正在生成 view 目录 ${componentDirectory}`);
    await dotExistDirectoryCreate(componentDirectory);
  }

  try {
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/');
      viewName = inputArr[inputArr.length - 1];
    } else {
      viewName = inputName;
    }
    log(`正在生成 vue 文件 ${viewVueName}`);
    await createFile(viewVueName, vueTemplate(viewName));
    successLog('生成成功');
  } catch (e) {
    errorLog(e.message);
  }

  process.stdin.emit('end');
});

process.stdin.on('end', () => {
  log('exit');
  process.exit();
});
