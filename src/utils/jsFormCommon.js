/**
 * 日期: 2018/10/8
 * 功能：获取当前时间
 */
export function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear(); // 年
  const month = now.getMonth() + 1; // 月
  const day = now.getDate(); // 日
  const hh = now.getHours(); // 时
  const mm = now.getMinutes(); // 分
  const ss = now.getSeconds(); // 秒
  let clock = `${year}-`;
  if (month < 10) { clock += '0'; }
  clock += `${month}-`;
  if (day < 10) { clock += '0'; }
  clock += `${day} `;
  if (hh < 10) { clock += '0'; }
  clock += `${hh}:`;
  if (mm < 10) clock += '0';
  clock += `${mm}:`;
  if (ss < 10) clock += '0';
  clock += ss;
  return (clock);
}


/**
 * 日期: 2018/10/6
 * 功能：获取url参数
 */
export function getUrlParams() {
  let name;
  let value;
  const paramsMap = {};
  let str = location.href;
  let num = str.indexOf('?');
  str = str.substr(num + 1);
  const arr = str.split('&');
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf('=');
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      paramsMap[name] = value;
    }
  }
  return paramsMap;
}


/**
 * 日期: 2019/2/26
 * 功能：获取两个日期差
 */
export function dateDiff2(d1, d2) {
  const date1 = new Date(d1.replace(/-/g, '/'));
  const date2 = new Date(d2.replace(/-/g, '/'));
  const date3 = date2.getTime() - date1.getTime(); // 时间差的毫秒数
  // 计算出相差天数
  const days = Math.floor(date3 / (24 * 3600 * 1000));
  // 计算出小时数
  const leave1 = date3 % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);
  const deffObj = {
    d: days, // 天
    h: hours, // 时
    m: minutes, // 分
    s: seconds // 秒
  };
  return deffObj;
}
