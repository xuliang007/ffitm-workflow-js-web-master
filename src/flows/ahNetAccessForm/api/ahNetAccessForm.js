import request from '@/utils/request';

export default {
  /**
   * @Description:描述函数功能
   * @Author: GuoYunTao
   * @Date: 2019/6/6
   */
  getSysnameByTreeId(params) {
    return request({
      url: '/ahForm/common/getSysnameByTreeId',
      method: 'get',
      params
    });
  },

  getCodelistByCodeType(params) {
    return request({
      url: '/ahForm/common/getCodelistByCodeType',
      method: 'get',
      params
    });
  },

  saveFHQTableData(data) {
    return request({
      url: '/ahForm/ahNetAccess/saveFHQTableData',
      method: 'post',
      data
    });
  },

  saveF5TableData(data) {
    return request({
      url: '/ahForm/ahNetAccess/saveF5TableData',
      method: 'post',
      data
    });
  }
};
