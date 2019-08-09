import axios from 'axios';
import { Message } from 'ffitm-vue-ui';

// 创建axios实例
const service = axios.create({
  timeout: 60000,
  headers: {
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache'
  }
});

// 请求拦截
service.interceptors.request.use(config => ({ ...config, params: { ...(config.params || {}), _t: +new Date() } }), (error) => {
  // 错误处理
  // eslint-disable-next-line
  console.log(error);
  Promise.reject(error);
});

// 返回拦截
service.interceptors.response.use(
  // response => response.data,
  (response) => {
    const { code, msg, errorMsg } = response.data || {};
    if ((code && code !== '0' && code !== '0SB' && code !== '0SA') || errorMsg) {
      Message({
        showClose: true,
        message: msg || errorMsg,
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject(new Error(msg));
    }
    return Promise.resolve(response.data);
  },
  (error) => {
    // eslint-disable-next-line
    console.error(error);
    let msg;
    if (error.response && error.response.data && error.response.data.msg) {
      msg = error.response.data.msg;
    } else {
      msg = error.message;
    }
    Message({
      showClose: true,
      message: msg,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  });

export default service;
