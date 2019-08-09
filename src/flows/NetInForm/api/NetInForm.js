import request from '@/utils/request';

export default {
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
