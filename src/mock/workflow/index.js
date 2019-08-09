import { param2Obj } from '../../utils';
import flow3178 from './json/flow3178.json';
import flow6011 from './json/6011.json';
import nextTch from './json/nextTch.json';
import nextTch11263 from './json/nextTch11263.json';
import staff from './json/staff.json';
import opinionList from './json/opinionList.json';
import flowProc from './json/flowProc.json';
import orgTree from './json/orgTree.json';
import FlowMod from './json/flowMod.json';

const flowMap = {
  6011: flow6011
};

export default {
  getFlow: (config) => {
    const { flowMod } = param2Obj(config.url);
    return flowMap[flowMod] || flow3178;
  },
  getNextTch: (config) => {
    const { flowMod } = param2Obj(config.url);
    return flowMod === '11263' ? nextTch11263 : nextTch;
  },
  getStaff: () => staff,
  getStaffFlowOpinion: () => opinionList,
  getFlowProc: () => flowProc,
  getOrg: () => orgTree,
  getOrgValue: () => orgTree[3],
  getFlowMod: () => FlowMod
};
