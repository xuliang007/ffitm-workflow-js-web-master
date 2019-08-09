import request from '@/utils/request';

/**
 * 公共树
 * 说明：如果有动态参数需要加入body中
 * @param sysVal {string}
 * @param data {object}
 * @param data.PARENT_TYPE_CODE 等参数
 */
export function publicLoadTree(sysVal, data) { // eslint-disable-line import/prefer-default-export
  return request({
    url: `/flowRelation/publicLoadTree?sysVal=${sysVal}`,
    method: 'post',
    data
  });
}

/**
 * 根据tchNums获取tchMods
 * @param tchNums
 */
export function getTchModsByTchNums(tchNums) {
  return request({
    url: '/tache/model/getTchModsByTchNums',
    method: 'get',
    params: {
      tchNums
    }
  });
}

/**
 * 获取TpTreeType
 * @param params
 * @param params.domainType
 * @param [params.parentTypeCode]
 */
export function getTpTree(params) {
  return request({
    url: '/flowRelation/getTpTree',
    method: 'get',
    params
  });
}

/**
 * 获取TpTreeType Count
 * @param params
 * @param params.domainType
 * @param params.parentTypeCode
 */
export function getTpTreeCount(params) {
  return request({
    url: '/flowRelation/getTpTreeCount',
    method: 'get',
    params
  });
}

/**
 * 根据组织ID获取组织信息
 * @param id
 */
export function getOrgInfoByOrgId(id) {
  return request({
    url: `/security/orgs/${id}`,
    method: 'get'
  });
}
/**
 * 根据用户ID获取组织信息
 * @param staffId
 */
export function getOrgInfoByStaffId(staffId) {
  return request({
    url: '/security/orgs/findOrgByStaffId',
    method: 'get',
    params: {
      staffId
    }
  });
}

/**
 * 获取sysConfig
 * @param sysVar
 */
export function getSysValue(params) {
  return request({
    url: '/common/getSysValue',
    method: 'get',
    params
  });
}

/**
 * 根据flowId和person获取tchId
 * @param params
 * @param params.flowId
 * @param params.person
 */
export function getTchIdByPerson(params) {
  return request({
    url: '/flow/getTchIdByPerson',
    method: 'get',
    params
  });
}

/**
 * 字典表
 * @param params
 * @param params.codeType
 * @param params.code
 */
export function getCodeList(params) {
  return request({
    url: '/common/getCodeList',
    method: 'get',
    params
  });
}
/**
 * 根据flowNum获取相关flowMod等信息
 * @param params
 * @param params.flowNum
 */
export function getFlowUrlByFlowNum(params) {
  return request({
    url: '/jtitsmForm/Common/getFlowUrlByFlowNum',
    method: 'get',
    params
  });
}
/**
 * 表单转换
 * @param params
 * @param params.domainType 暂固定为1
 * @param params.requestId  主流程requestId
 * @param params.mainFormId 主流程的formId
 * @param params.subFormId  子流程的formId
 */
export function getFormFieldTurn(params) {
  return request({
    url: '/form/getFormFieldTurn',
    method: 'get',
    params
  });
}
/**
 * 获取需要的用户信息(multi-center组件用)
 * @param params
 * @param params.flag
 * @param params.staffId
 */
export function getProjectStaffList(params) {
  return request({
    url: '/commonMethod/getProjectStaffList',
    method: 'get',
    params
  });
}
/**
 * 获取派发下拉组织(multi-center组件用)
 * @param params
 * */
export function getDisProjectTree() {
  return request({
    url: '/commonMethod/getDisProjectTree',
    method: 'get'
  });
}
/**
 * 获取需要的用户信息(add-select-check组件用)
 * 其中参数methodParam必须有，其他的为空，具体看使用情况
 * @param params
 * @param params.methodParam
 * @param params.neTypeId
 * @param params.ciId
 * @param params.flowMod
 * @param params.whereStr
 */
export function getAllSelectData(params) {
  return request({
    url: '/jtitsmForm/Common/getAllSelectData',
    method: 'get',
    params
  });
}


/**
 * 获取涉及系统数据(system-business组件用)
 * 其中参数methodParam必须有，其他的为空，具体看使用情况
 * @param params
 * @param params.bprId
 * @param params.languageType
 */
export function getJtitsmSysInfos(params) {
  return request({
    url: '/jtitsmForm/Common/getJtitsmSysInfos',
    method: 'get',
    params
  });
}
/**
 * 通过SOlR 模糊查找组织信息
 * @param query
 */
export function getOrgInfoBySolr(query) {
  return request({
    url: '/security/orgs/search',
    method: 'get',
    params: {
      query
    }
  });
}

/**
 * 获取人员统计列表信息
 * @param staffIds
 */
export function getStaffStatisticsData(staffIds) {
  return request({
    url: '/jtitsmForm/Common/getStaffStatisticsData',
    method: 'get',
    params: {
      staffIds
    }
  });
}

/**
 * 根据人员获取省份统计信息
 * @param staffIds
 */
export function getRegionCount(staffIds) {
  return request({
    url: '/jtitsmForm/Common/getRegionCount',
    method: 'get',
    params: {
      staffIds
    }
  });
}

/**
 * 根据员工组织ID、向上获取组织树
 * @param query
 */
export function searchOrgPathByOrgId(id) {
  return request({
    url: `/security/orgs/${id}/searchOrgPathByOrgId`,
    method: 'get'
  });
}


/**
 * 通过solr模糊查询人员
 * @param staffIds
 */
export function getStaffBySol(params) {
  return request({
    url: '/security/search',
    method: 'get',
    params
  });
}

/**
 * 查询厂商
 */
export function getCompanyList(params) {
  return request({
    url: '/jtitsmForm/Common/getCompanyList',
    method: 'get',
    params
  });
}
/**
 * 更新厂商
 */
export function updateCompany(params) {
  return request({
    url: '/jtitsmForm/Common/updateCompany',
    method: 'get',
    params
  });
}
/**
 * 删除厂商
 */
export function deleteCompany(params) {
  return request({
    url: '/jtitsmForm/Common/deleteCompany',
    method: 'get',
    params
  });
}
/**
 * 删除厂商
 */
export function addCompany(params) {
  return request({
    url: '/jtitsmForm/Common/addCompany',
    method: 'get',
    params
  });
}
