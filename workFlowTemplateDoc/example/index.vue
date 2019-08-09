<template>
  <div class="box">
    <ffitm-layout>
      <ffitm-steps :cur-step="curStep" :step-list="stepList">
      </ffitm-steps>
      <ffitm-flow-title>{{flowTitle}}</ffitm-flow-title>
      <ffitm-work-order-strip @updateMobile="updateMobile" :isFirstTache="isFirstTache">
        <span slot="order-number">CRM-HQ-01-2019-46136</span>
        <span slot="apply-time">2019-02-23 14:45:55</span>
        <span slot="staff-name">ITSM测试部-admin（0）</span>
        <span slot="apply-people">ITSM测试部-admin（0）</span>
      </ffitm-work-order-strip>
      <ffitm-form-block :collapse="true">
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
            <ffitm-upload-box v-model="ruleForm.enclosure"></ffitm-upload-box>
          </fi-form-item>
        </fi-form>
      </ffitm-form-block>
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
        isFirstTache:true,
        flowTitle: '关于政企智能专线产品集约客户自助门户与省2级接口联调工作安排',
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
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //附件添加回调
      addCallback() {
        alert('cb')
      },
      //附件删除回调
      enclosureDelete(item) {
        console.log(item)
      },
      showWarmTip() {
        this.$ffitmWarmTip({
          msg: '提示框提示框提示框提示框提示框提示框', //警告提示文字
          autoClose: false, //是否自动关闭
          time: 3000, //延迟关闭时间
          offsetTop: 50 //距离top的偏移量
        }, () => {
          console.log('我是关闭回调') //关闭
        })
      },
      updateMobile(num){
        //号码更新回调
        console.log(num)
      }
    },
    mounted() {
      this.showWarmTip()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
