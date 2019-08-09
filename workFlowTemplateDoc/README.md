### 任务派发单流程表单-模板组件使用简述
#### 安装使用
> 使用npm或yarn安装
```
    npm i ffitm-workflow-template-ui -S
```
> 在入口文件引入(index.entry.js)
```
    import 'ffitm-workflow-template-ui/dist/ffitm-workflow-template.css';
    import templateUI from 'ffitm-workflow-template-ui';
    Vue.use(templateUI);
```
> 界面效果请查看

```
    http://192.168.17.231:8680/app/workflowTemplate/index.ftl
```

#### 移动端兼容考虑
> 考虑到要兼容移动端并且公用一套界面的情况，所以请在开发时使用elementUI或bootstarp的栅格系统进行布局。
同时请在渲染的页面head中,加入<meta name="viewport" content="width=device-width, initial-scale=1.0">



1. 步骤条（ffitm-steps）组件使用

```
<template>
     <ffitm-steps :cur-step="curStep" :step-list="stepList">
     </ffitm-steps>
</template>

<script>
    export default {
        name: "ffitmWorkFlow",
        data() {
            return {
                curStep: 1,
                stepList: [{
                    stepLable: '创建工单',
                    index: 1
                  }, {
                    stepLable: '领导审核',
                    index: 2
                  },
                  {
                    stepLable: '省内处理',
                    index: 3
                  },
                  {
                    stepLable: '工单完结',
                    index: 4
                  }
                ]
            }
        },
        mounted() {},
        methods: {}
    }
</script>

<style lang="scss" scoped>

</style>
```
2. 附件小标使用（ffitm-enclosure-tip）
```
<template>
     <ffitm-enclosure-tip :enclosure-name="curStep" @delete="deleteCallBack">
     </ffitm-enclosure-tip>
</template>

<script>
    export default {
        name: "ffitmWorkFlow",
        data() {
            return {
                enclosureName: '暂无信息测试测试测试报告.xls'
            }
        },
        mounted() {
        },
        methods: {
              deleteCallBack(item){
                //附件删除回调
                }
        }
    }
</script>

<style lang="scss" scoped>

</style>
```
3. 标题组件(ffitm-title)
```
<template>
     <ffitm-title>{{title}}</ffitm-title>
</template>

<script>
    export default {
        name: "ffitmWorkFlow",
        data() {
            return {
                title: '关于政企智能专线产品集约客户自助门户与省2级接口联调工作安排'
            }
        },
        mounted() {},
        methods: {}
    }
</script>

<style lang="scss" scoped>

</style>
```
4. 派单块(ffitm-form-block)
```
<template>
    <ffitm-form-block>
        <fi-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="103px">
            <fi-form-item label="工单标题标题" prop="title">
                <fi-input v-model="ruleForm.title" placeholder="输入工单标题"></fi-input>
            </fi-form-item>
            <fi-row :gutter="13">
                <fi-col :span="8" :xs="24" :sm="24" :md="8">
                    <fi-form-item label="所属专业" label-width="103px" prop="major">
                        <fi-select v-model="ruleForm.major" placeholder="请输入工单标题">
                            <fi-option label="区域一" value="shanghai"></fi-option>
                            <fi-option label="区域二" value="beijing"></fi-option>
                        </fi-select>
                    </fi-form-item>
                </fi-col>
                <fi-col :span="8" :xs="24" :sm="24" :md="8" class="dispatch-type">
                    <fi-form-item label="派单类型类型" prop="orderType" label-width="103px">
                        <fi-select v-model="ruleForm.orderType" placeholder="请选择活动区域">
                            <fi-option label="区域一" value="shanghai"></fi-option>
                            <fi-option label="区域二" value="beijing"></fi-option>
                        </fi-select>
                    </fi-form-item>
                </fi-col>
                <fi-col :span="4" :xs="24" :sm="24" :md="3">
                    <fi-form-item label="是否考核" label-width="108px" prop="isCheck" :required="true">
                        <ffitm-switch v-model="ruleForm.isCheck" style="margin-top:8px"></ffitm-switch>
                    </fi-form-item>
                </fi-col>
                <fi-col :span="4" :xs="24" :sm="24" :md="5" class="time-box__reset">
                    <fi-form-item label="回单时间" prop="returnTime">
                        <fi-time-select v-model="ruleForm.returnTime" :picker-options="pickerOptions" placeholder="选择时间">
                        </fi-time-select>
                    </fi-form-item>
                </fi-col>
            </fi-row>
            <fi-row :gutter="13">
                <fi-col :span="8" :sm="24" :xs="24" :md="8">
                    <fi-form-item label="保密等级" prop="secrecyLevel">
                        <fi-radio v-model="ruleForm.secrecyLevel" label="1">一般</fi-radio>
                        <fi-radio v-model="ruleForm.secrecyLevel" label="2">保密</fi-radio>
                    </fi-form-item>
                </fi-col>
                <fi-col :span="8" :sm="24" :xs="24" :md="8">
                    <fi-form-item label="是否紧急" prop="isUrgent" label-width="103px">
                        <fi-radio v-model="ruleForm.isUrgent" label="1">紧急</fi-radio>
                        <fi-radio v-model="ruleForm.isUrgent" label="2">非紧急</fi-radio>
                    </fi-form-item>
                </fi-col>
                <fi-col :span="8" :sm="24" :xs="24" :md="8">
                    <fi-form-item label="执行结果审核" label-width="108px" prop="executionResults" :required="true">
                        <ffitm-switch v-model="ruleForm.executionResults" style="margin-top:8px"></ffitm-switch>
                    </fi-form-item>
                </fi-col>
            </fi-row>
            <fi-row :gutter="13">
                <fi-col :span="16" :sm="24" :xs="24" :md="16">
                    <fi-form-item label="保密等级" prop="secrecyLevel">
                        <fi-input></fi-input>
                    </fi-form-item>
                </fi-col>
                <fi-col :span="8" :sm="24" :xs="24" :md="8">
                    <fi-form-item label="执行结果审核" label-width="108px" prop="executionResults" :required="true">
                        <fi-input></fi-input>
                    </fi-form-item>
                </fi-col>
            </fi-row>
            <fi-row :gutter="13">
                <fi-col :span="8" :sm="24" :xs="24" :md="8">
                    <fi-form-item label="执行结果审核" label-width="103px" prop="executionResults" :required="true">
                        <fi-input></fi-input>
                    </fi-form-item>
                </fi-col>
                <fi-col :span="16" :sm="24" :xs="24" :md="16">
                    <fi-form-item label="保密等级" prop="secrecyLevel" :required="true">
                        <fi-input></fi-input>
                    </fi-form-item>
                </fi-col>
            </fi-row>
            <fi-form-item label="主送" prop="mainDelivery">
                <fi-input v-model="ruleForm.mainDelivery" placeholder="输入工单标题">
                    <span slot="suffix" class="add-text">+添加主送人</span>
                </fi-input>
            </fi-form-item>
            <fi-form-item label="抄送" prop="cc">
                <fi-input v-model="ruleForm.cc" placeholder="输入工单标题">
                    <span slot="suffix" class="add-text">+添加抄送人</span>
                </fi-input>
            </fi-form-item>
            <fi-form-item label="内容" prop="content" class="textare-box">
                <fi-input type="textarea" v-model="ruleForm.content"></fi-input>
            </fi-form-item>
            <fi-row :gutter="13">
                <fi-col :span="8" :xs="24" class="region-type">
                    <fi-form-item label="会签部门" prop="signDept">
                        <fi-select v-model="ruleForm.signDept" placeholder="请选择活动区域">
                            <i slot="suffix" class="user-icon"></i>
                            <fi-option label="区域一" value="shanghai"></fi-option>
                            <fi-option label="区域二" value="beijing"></fi-option>
                        </fi-select>
                    </fi-form-item>
                </fi-col>
                <fi-col :span="8" :xs="24">
                    <fi-form-item label="会签人" prop="sigPeople">
                        <fi-input v-model="ruleForm.sigPeople" placeholder="">
                            <i slot="suffix" class="user-icon"></i>
                        </fi-input>
                    </fi-form-item>
                </fi-col>
                <fi-col :span="8" :xs="24">
                    <fi-form-item label="派单跟踪人" prop="trackPeople">
                        <fi-input v-model="ruleForm.trackPeople" placeholder="">
                            <i slot="suffix" class="user-icon"></i>
                        </fi-input>
                    </fi-form-item>
                </fi-col>
            </fi-row>
            <fi-form-item label="附件" prop="enclosure">
                <ffitm-upload-input-box>
                    <ffitm-enclosure-tip enclosureName="测试报告报告报告报告报告报告.xls" v-for="index in 5" :key="index">
                    </ffitm-enclosure-tip>
                </ffitm-upload-input-box>
            </fi-form-item>
        </fi-form>
    </ffitm-form-block>
</template>

<script>
    export default {
        name: "ffitmWorkFlow",
        data() {
            return {
                pickerOptions: {
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                },
                ruleForm: {
                    title: '',
                    major: '',
                    orderType: '',
                    isCheck: '',
                    returnTime: '',
                    secrecyLevel: '',
                    isUrgent: '',
                    executionResults: '',
                    mainDelivery: '',
                    cc: '',
                    content: '',
                    signDept: '',
                    sigPeople: '',
                    trackPeople: '',
                    enclosure: ''
                },
                rules: {
                    title: [{
                        required: true,
                        message: '请输入工单标题',
                        trigger: 'blur'
                    }],
                    major: [{
                        required: true,
                        message: '请输入所属专业',
                        trigger: 'blur'
                    }],
                    mainDelivery: [{
                        required: true,
                        message: '请选择主送人',
                        trigger: 'blur'
                    }],
                    orderType: [{
                        required: true,
                        message: '请选择派单类型',
                        trigger: 'change'
                    }],
                    returnTime: [{
                        type: 'date',
                        required: true,
                        message: '请选择回单时间',
                        trigger: 'change'
                    }],
                    content: [{
                        required: true,
                        message: '请输入内容',
                        trigger: 'blur'
                    }],
                    secrecyLevel: [{
                        required: true,
                        message: '请选择派单类型',
                        trigger: 'change'
                    }],
                    isUrgent: [{
                        required: true,
                        message: '请选择派单类型',
                        trigger: 'change'
                    }]
                }
            }
        },
        mounted() {},
        methods: {}
    }
</script>

<style lang="scss" scoped>

</style>
```
> 里面的form元素布局调整可参考，example下的formTemplate.vue进行调整，为了统一化请使用ffitm-vue-ui

5. 警示提示框(showWarmTip)
```
    this.$ffitmWarmTip({
          msg: '提示框提示框提示框提示框提示框提示框', //警告提示文字
          autoClose: false, //是否自动关闭
          time: 3000, //延迟关闭时间
          offsetTop: 50 //距离top的偏移量
        }, () => {
          console.log('我是关闭回调') //关闭
        })
```
6. 布局体(ffitm-layout)
```
<template>
  <div class="box">
    <ffitm-layout>
      <ffitm-steps :cur-step="curStep" :step-list="stepList">
      </ffitm-steps>
      <ffitm-flow-title>{{flowTitle}}</ffitm-flow-title>
    </ffitm-layout>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        curStep: 1,
        stepList: [{
            stepLable: '创建工单',
            index: 1
          }, {
            stepLable: '领导审核',
            index: 2
          },
          {
            stepLable: '省内处理',
            index: 3
          },
          {
            stepLable: '工单完结',
            index: 4
          }
        ],
        flowTitle: '关于政企智能专线产品集约客户自助门户与省2级接口联调工作安排'
        }
    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
```
7. 开关(ffitm-switch)
```
<template>
  <div class="box">
    <ffitm-switch v-model="toggle"></ffitm-switch>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        toggle: true
        }
      }
    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
```
8. 附件上传(ffitm-upload-box)
```
<template>
        <ffitm-upload-box v-model="fileList"></ffitm-upload-box>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        fileList: []
        }
    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
```
9.工单信息块(ffitm-work-order-strip)
```
<template>
    <ffitm-work-order-strip @updateMobile="updateMobile" isFirstTache="isFirstTache">
        <span slot="order-number">CRM-HQ-01-2019-46136</span>
        <span slot="apply-time">2019-02-23 14:45:55</span>
        <fi-tooltip effect="light" content="ITSM测试部-admin（0）" placement="top" slot="apply-people">
          <span >ITSM测试部-admin（0）</span>
        </fi-tooltip>
      </ffitm-work-order-strip>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                toggle: true,
                isFirstTache:true
            }
        },
        methods: {
            updateMobile(num){
                console.log(num)
            }
        },
        mounted() {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
```