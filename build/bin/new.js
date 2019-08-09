'use strict';

console.log();
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[表单名]必填 - Please enter new form name');
  process.exit(1);
}
const fs= require('fs');
const path = require('path');
const fileSave = require('file-save');
const formName = process.argv[2];
const titleName = process.argv[3] || formName;
const formPath = path.resolve(__dirname, '../../src/flows', formName);
const Files = [
  {
    filename: 'index.js',
    content: `import Vue from 'vue';
import Fi from 'ffitm-vue-ui';
import Workflow from 'ffitm-workflow-ui';
import 'font-awesome/css/font-awesome.css';
import 'ffitm-vue-ui/lib/theme-chalk/index.css';
import 'ffitm-workflow-ui/dist/workflow-ui.css';
import 'ffitm-workflow-template-ui/dist/ffitm-workflow-template.css';
import templateUI from 'ffitm-workflow-template-ui';
import '@/icons/commonForm/iconfont.css';
import '@/styles/index.scss';
import Form from './form';

if (process.env.USE_MOCK) {
  require ('@/mock'); // eslint-disable-line
}
Vue.use(templateUI);
Vue.use(Fi, {
  size: 'small'
});
Vue.use(Workflow);
Vue.mixin({
  data() {
    return {
      baseUrl$: process.env.UEDITOR_PATH
    };
  }
});
Vue.config.productionTip = false;
new Vue({
  render: h => h(Form)
}).$mount('#form');`
  },
  {
    filename: 'form.vue',
    content: `<template>
  <div id="workLoadEvaForm">
    <fi-workflow ref="workflowForm" :model.sync="model" label-width="108px" :local-context="localContext" @onFormReady="onFormReady" :on-form-submit="onFormSubmit" >
      <ffitm-layout>
        <ffitm-steps :curStep="formSteps.active" :stepList="formSteps.titles">
        </ffitm-steps>
        <ffitm-flow-title ><span>{{model.TASK_TITLE}}</span>
        </ffitm-flow-title>
        <ffitm-work-order-strip>
          <span slot="order-number">{{model.REQUIREMENT_NO}}</span>
          <span slot="apply-time">{{model.SUBMIT_TIME}}</span>
          <span slot="staff-name">{{model.SUBMIT_ORG_NAME}}-{{model.SUBMIT_STAFF_NAME}}（{{model.MOBILEMOBILE}}）</span>
          <fi-tooltip effect="light" :content="model.SUBMIT_ORG_NAME + '-'+ model.SUBMIT_STAFF_NAME + '(' + model.SUBMIT_STAFF_MOBILE+ '）'" placement="top" slot="apply-people">
            <span >{{model.SUBMIT_ORG_NAME}}-{{model.SUBMIT_STAFF_NAME}}（{{model.SUBMIT_STAFF_MOBILE}}）</span>
          </fi-tooltip>
        </ffitm-work-order-strip>
        <ffitm-form-block :collapse="true">
          <span slot="form-title">派单信息</span>
          <fi-row>
            <fi-col :span="8">
              <fi-form-item label="部门专业" prop="RELATE_SYSTEM_NAME">
                <fi-select v-model="model.RELATE_SYSTEM_NAME"  class="w100" placeholder="请选择部门专业"></fi-select>
              </fi-form-item>
            </fi-col>
            <fi-col :span="8" >
              <fi-form-item label="项目名称" prop="TITLE">
                <fi-input placeholder="请选择项目名称"  v-model="model.TITLE"></fi-input>
              </fi-form-item>
            </fi-col>
            <fi-col :span="8">
              <fi-form-item label="所属系统" prop="BELONG_SYS_NAME">
                <fi-input readonly clearable
                          v-model="model.BELONG_SYS_NAME"
                >
                  <!--<template slot="append">-->
                  <!--<i class="fi fi-user-add" style="cursor: pointer" @click="choosePersonInfo()" v-if="showObj.canChoosePerson"></i>-->
                  <!--</template>-->
                  <i slot="suffix" class="el-icon-jtitsm-classify el-iconfont "  ></i>
                </fi-input>
                <fi-input v-model="model.BELONG_SYS_NAME" v-show="false"></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="8">
              <fi-form-item label="专家数量" prop="EXPERT_NUM">
                <fi-radio-group v-model="model.EXPERT_NUM"></fi-radio-group>
              </fi-form-item>
            </fi-col>
            <fi-col :span="8" >
              <fi-form-item label="评审期限" prop="REVIEW_DEADLINE">
                <fi-input placeholder="请输入评审期限"  v-model="model.REVIEW_DEADLINE"><i slot="suffix" class="dep-font">天</i></fi-input>
              </fi-form-item>
            </fi-col>
            <fi-col :span="8">
              <fi-form-item label="工作量上限">
                <fi-input placeholder="请输入工作量"  v-model="model.MAXIMUM_WORKLOAD"><i slot="suffix" class="dep-font">人/天</i></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="8">
              <fi-form-item label="自评工作量">
                <fi-input placeholder="请输入工作量"  v-model="model.TOTAL_WORKLOAD"><i slot="suffix" class="dep-font">人/天</i></fi-input>
              </fi-form-item>
            </fi-col>
            <fi-col :span="8">
              <fi-form-item label="厂商负责人">
                <fi-input placeholder="请选择厂商负责人"  v-model="model.MANU_STAFF"><i slot="suffix" class="el-icon-jtitsm-addPerson2 el-iconfont"></i></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="24">
              <div class="clear-required-style">
                <fi-form-item label="评估报告" prop="TASK_DOWN_DOC">
                  <fi-workflow-upload v-model="model.TASK_DOWN_DOC"></fi-workflow-upload>
                </fi-form-item>
              </div>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="24">
              <div class="clear-required-style">
                <fi-form-item label="需求规格书/技术方案书" prop="TASK_DOWN_DOC">
                  <ffitm-upload-box v-model="model.TASK_DOWN_DOC"></ffitm-upload-box>
                </fi-form-item>
              </div>
            </fi-col>
          </fi-row>
        </ffitm-form-block>
      </ffitm-layout>
    </fi-workflow>
  </div>
</template>

<script>
import localContext from '@/utils/localContext';
import adviceSuggestions from '../../components/advice-suggestions';
// import { getHtmlData, getJsonFromHtmlData } from '../../utils';

export default {
  name: 'workflow',
  components: { adviceSuggestions },
  provide() {
    return {
      fiForm: this
    };
  },
  data() {
    return {
      model: {},
      localContext,
      global$: {},
      // 注意顺序，auditPro是审核过程，flowModel是流程模版 demo数据，请把注释删掉
      cardList: ['basicInfo', 'auditPro', 'flowModel'],
      cardMap: { // card key跟名称的对应,可在formRady根据需求进行隐藏 demo数据，请把注释删掉
        basicInfo: {
          title: '基本信息',
          isShow: true
        },
        auditPro: {
          title: '审核过程',
          isShow: true
        },
        flowModel: {
          title: '流程模板',
          isShow: true
        }
      },
      formSteps: {
        active: 1,
        titles: [{
          stepLable: '发起工作量',
          index: 1
        }, {
          stepLable: '核算工作量',
          index: 2
        }, {
          stepLable: '总结工作量',
          index: 3
        }, {
          stepLable: '审核工作量',
          index: 4
        }, {
          stepLable: '工单完结',
          index: 5
        }]
      }
    };
  },
  computed: {
    tchNum() {
      return this.global$.flow ? this.global$.flow.tchNum : '';
    }
  },
  methods: {
    onFormReady() {
    },
    onFormSubmit() {
      return true;
    }
  }
};
</script>
<style lang="scss">
ffitm-layout {
  .fi-form-layout.is-no-outside {
    padding-top: 0px;
  }
}
</style>


`
  },
  {
    filename: 'index.ftl',
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=IE9">
  <meta name="renderer" content="webkit">
  <link rel="shortcut icon" type="image/x-icon" href="static/favicon.ico">
  <title>${titleName}</title>
</head>
<body>
<div id="form"></div>
<!-- built files will be auto injected -->
</body>
</html>
`
  }
];


fs.exists(formPath, function(exists) {
  if (exists) {
    console.error(`${formPath} 已存在.`);
    process.exit(1);
  } else {
    // 创建 form
    Files.forEach(file => {
      fileSave(path.join(formPath, file.filename))
        .write(file.content, 'utf8')
        .end('\n');
    });
  }
});

console.log('DONE!');
