import { scrollTop } from 'ffitm-workflow-ui/src/utils/assist';
import { offsetTop } from 'ffitm-workflow-ui/src/utils';
import { getFormFieldTurn } from '@/api/commonApi';

export function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(`{"${decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
}

/**
 * 获取URL参数
 * @param key
 * @returns {{}}
 */
export function getUrlParam(key) {
  const params = param2Obj(window.location.search);
  return key ? params[key] : params;
}

/**
 * 将下划线命名格式转为驼峰命名
 * @param str
 * @returns {string}
 */
export function toCamelCase(str) {
  const r = /[^_]?[a-z]([A-Z])/g;
  const re = /_(\w)/g;
  const strNew = str.replace(r, ($0, $1) => $0.replace($1, `_${$1}`));
  return strNew.toLocaleLowerCase().replace(re, ($0, $1) => $1.toUpperCase());
}

export function getParentUrlParam() {
  let strSearch = parent.window.location.search;
  const reg1 = /=/gi;
  const reg2 = /&/gi;
  strSearch = strSearch.substr(1, strSearch.length);
  strSearch = strSearch.replace(reg1, '":"');
  strSearch = strSearch.replace(reg2, '","');
  if (strSearch === '') { return null; }
  strSearch = decodeURIComponent(`{"${strSearch}"}`);
  return strSearch || {};
}

export function getHtmlData(id) {
  const eid = `#${id}\\.\\{ds\\}`;
  const element = document.querySelector(eid);
  if (element && element.tagName.toUpperCase() === 'TEXTAREA') {
    return element.value;
  }
  return '';
}

export function getJsonFromHtmlData(id) {
  const data = getHtmlData(id);
  if (data) {
    return JSON.parse(data);
  }
  return data;
}

/**
 * 正浮点 ∪ 正整数 ∪ 0
 * @param value
 * @returns {*|boolean}
 */
export function isFloat(value) {
  return /^[1-9]\d*\.?\d*$|0\.\d*[1-9]\d*$|^0$/.test(value);
}

/**
 * 0 ∪ 正整数
 * @param value
 * @returns {*|boolean}
 */
export function isNumber(value) {
  return /^[1-9]\d*$|^0$/.test(value);
}

/**
 * 滚动到元素位置
 * @param el dom元素
 * @param delayDistance 元素间距
 * @param duration 持续时间
 */
export function scrollToElement(el, delayDistance = 100, duration = 500) {
  scrollTop(window, window.pageYOffset, offsetTop(el) - delayDistance, duration);
}

/**
 * 表单转换
 * 说明：父流程需要向window里传入对应的mainFlow(model),mainFormId(global$.form.formId),mainRequestId(requestId),例如：
 window.mainFlow = this.model;
 window.mainRequestId = this.model.CUST_SC_REQUIRE.oRequestId;
 window.mainFormId = this.global$.form.formId;
 * @param
 * @param params.subFormId 子流程的formId
 * @param params.subThis   子流程的this
 */
/* eslint-disable no-param-reassign */
export function formFieldTurn(subFormId, subThis) {
  const { mainFlow, mainFormId, mainRequestId } = window.opener.window;
  const params = {
    domainType: 1,
    requestId: mainRequestId,
    mainFormId,
    subFormId
  };
  return getFormFieldTurn(params).then((data) => {
    const { tableNameMain, tableNameSub, formFieldTurns } = data[0];
    formFieldTurns.forEach((item) => {
      const subModel = subThis.model[tableNameSub] ? subThis.model[tableNameSub] : subThis.model;
      const mainModel = mainFlow[tableNameMain] ? mainFlow[tableNameMain] : mainFlow;
      if (!item.attaches) {
        subModel[item.elementNameSub] = mainModel[item.elementNameMain];
      } else {
        subModel[item.elementNameSub] = item.attaches.map((obj) => {
          obj.action = 'C';
          obj.response = {
            requestId: obj.requestId
          };
          obj.toDir = 'form';
          return obj;
        });
      }
    });
  });
}
