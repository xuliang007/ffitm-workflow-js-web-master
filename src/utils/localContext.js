 export default {
  isHiddenBegin() { // sc
    return false;
  },
  isShowBegin() { // sc
    return false;
  },
  toggleEdit() {
    this.workflow.fiForm.toggle();
  },
  // 新增方法，用于判断当前环节的数据，当然也可以直接配置在rules表里面，要注意的是字符串比对，变量前后要带上单引
  isToggleEdit() {
    const { tchNum } = this.workflow.flowContext.flow;
    const { flowNum } = this.workflow.flowContext.flow;
    return flowNum !== 'jtitsm_11092' || tchNum === '11805' || tchNum === '11808' || tchNum === '11807' || tchNum === '11806';
  },
  // 预览
  preView() {
    this.workflow.fiForm.showPreview();
  },
  // 批量审核
  showBatchAppend() {
    this.workflow.fiForm.showBatchAppend();
  }
};
