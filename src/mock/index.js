import Mock from 'mockjs';
import workFlowAPI from './workflow';
import ItsmDispatch from './itsm-dispatch';

export default Mock;

// 流程初始化
Mock.mock(/\/form\/getFlowForm/, 'get', workFlowAPI.getFlow);
// 流转初始化
Mock.mock(/\/flow\/getNextTch/, 'get', workFlowAPI.getNextTch);
Mock.mock(/\/busiCompoent\/FuiStaffSelectAddonController\/findStaffByIds/, 'get', workFlowAPI.getStaff);
// 删除常用人
Mock.mock(/\/flow\/delFlowOftenStaff/, 'post', { code: 0 });
// 常用意见保存
Mock.mock('/flow/saveFlowOpinion', 'post', {
  code: 0,
  msg: '保存成功'
});
// 获取常用意见
Mock.mock(/\/flow\/getStaffFlowOpinion/, 'get', workFlowAPI.getStaffFlowOpinion);
Mock.mock(/\/flow\/getFlowOpinion/, 'get', workFlowAPI.getStaffFlowOpinion);
Mock.mock(/\/flow\/getFlowProc/, 'get', workFlowAPI.getFlowProc);
Mock.mock(/\/busiCompoent\/FuiStaffSelectAddonController\/getOrgTree/, 'get', workFlowAPI.getOrg);
Mock.mock(/\/organization\//, 'get', workFlowAPI.getOrgValue);
// 获取流程模板
Mock.mock(/\/flow\/model\/getFlowModel/, 'get', workFlowAPI.getFlowMod);


Mock.mock(/\/commonForm\/ItsmDispatch\/getRelaList/, 'get', ItsmDispatch.getRelaList);
