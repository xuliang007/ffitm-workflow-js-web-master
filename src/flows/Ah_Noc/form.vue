<template>
  <fi-workflow :model.sync="model" label-width="120px" :local-context="localContext" @onFormReady="onFormReady" :on-form-submit="onFormSubmit">
    <fi-form-layout :card-list="cardList" :card-map="cardMap">
      <fi-row slot="outside" class="fi-form-layout__outside itsm-dispatch__outside">
        <fi-col :span="22">
          <span class="itsm-dispatch__outside-item">
            <label>申请时间：</label>
            <span class="danger">{{model.IT_FLOW_BASE.aDeclarationTime}}</span>
          </span>
          <span class="itsm-dispatch__outside-item">
            <label>申请人：</label>
            <span class="danger">{{presenter}}</span>
          </span>
        </fi-col>
      </fi-row>
      <fi-row class="fi-form-layout__content">
        <fi-form-card label="基本信息" anchor="basicInfo">
          <fi-row>
            <fi-col :span="22">
              <fi-form-item label="工单主题" prop="CUST_AH_DATA_MADE_NOC.SHEET_TITLE">
                <fi-input v-model="model.CUST_AH_DATA_MADE_NOC.SHEET_TITLE" clearable></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="22">
              <fi-form-item label="申请内容" prop="CUST_AH_DATA_MADE_NOC.DECLARATION_DESC">
                <fi-input  v-model="model.CUST_AH_DATA_MADE_NOC.DECLARATION_DESC" clearable></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="22">
              <fi-form-item label="附件" prop="CUST_AH_DATA_MADE_NOC.IMPLEMENT_ORG_ID">
            <!--    <fi-select v-model="model.CUST_AH_SAVE_NET_ACCESS.IMPLEMENT_ORG_ID" readonly clearable></fi-select>-->
              </fi-form-item>
            </fi-col>
          </fi-row>

        </fi-form-card>

        <fi-form-card label="审核过程" anchor="auditPro" scroll-loading>
          <template slot="header"><fi-process-legend></fi-process-legend></template>
          <fi-workflow-process></fi-workflow-process>
        </fi-form-card>
        <fi-form-card label="流程模板" anchor="flowModel" scroll-loading>
          <fi-workflow-flow-model></fi-workflow-flow-model>
        </fi-form-card>
      </fi-row>
    </fi-form-layout>
  </fi-workflow>
</template>

<script>import localContext from '@/utils/localContext';
import netService from './api/ah_noc';

export default {
  name: 'workflow',
  provide() {
    return {
      fiForm: this
    };
  },
  data() {
    return {
      model: {
        IT_FLOW_BASE: {},
        CUST_AH_DATA_MADE_NOC: {}
      },
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
      }
    };
  },
  computed: {
    tchNum() {
      return this.global$.flow ? this.global$.flow.tchNum : '';
    },
    presenter() {
      return this.model.IT_FLOW_BASE.aDeclarationMan;
    }
  },
  methods: {
    onFormReady() {
      this.getPortType();
    },
    onFormSubmit() {
      return true;
    },

    deleteFHQRow(row) {
      this.tableData.splice(this.tableData.indexOf(row), 1);
    },
    deleteF5Row(row) {
      this.F5tableData.splice(this.F5tableData.indexOf(row), 1);
    },
    saveNextFHQForm() {
      this.saveFHQForm();
    },
    confirmFHQForm() {
      if (this.saveFHQForm()) {
        this.FHQdialog.dialogFormVisible = false;
      }
    },
    openFHQForm() {
      this.clearFHQForm();
      this.FHQdialog.dialogFormVisible = true;
      this.FHQdialog.dialogTitle = '新增防火墙信息';
      this.FHQdialog.nextItemBtn = true;
    },
    saveFHQForm() {
      if (!this.FHQdialog.FHQForm.RESOURCE_IP) {
        this.$message.warning('源地址IP不能为空！');
        return false;
      }
      if (this.FHQdialog.FHQForm.TARGET_IP === '') {
        this.$message.warning('目的地址IP不能为空！');
        return false;
      }
      if (this.FHQdialog.FHQForm.TARGET_PORT === '') {
        this.$message.warning('目的端口不能为空！');
        return false;
      }
      if (this.FHQdialog.FHQForm.PORT_TYPE.CODE === '') {
        this.$message.warning('端口类型不能为空！');
        return false;
      }
      if (this.FHQdialog.FHQForm.PORT_USES === '') {
        this.$message.warning('端口开放用途不能为空！');
        return false;
      }
      const ROW = {
        RESOURCE_IP: this.FHQdialog.FHQForm.RESOURCE_IP,
        TARGET_IP: this.FHQdialog.FHQForm.TARGET_IP,
        TARGET_PORT: this.FHQdialog.FHQForm.TARGET_PORT,
        PORT_TYPE: this.FHQdialog.FHQForm.PORT_TYPE,
        NOTE: this.FHQdialog.FHQForm.NOTE,
        PORT_USES: this.FHQdialog.FHQForm.PORT_USES
      };
      if (this.FHQdialog.dialogTitle === '新增防火墙信息') {
        this.tableData.unshift(ROW);
      } else {
        this.tableData[this.FHQdialog.curIndex].RESOURCE_IP = this.FHQdialog.FHQForm.RESOURCE_IP;
        this.tableData[this.FHQdialog.curIndex].TARGET_IP = this.FHQdialog.FHQForm.TARGET_IP;
        this.tableData[this.FHQdialog.curIndex].TARGET_PORT = this.FHQdialog.FHQForm.TARGET_PORT;
        this.tableData[this.FHQdialog.curIndex].PORT_TYPE = this.FHQdialog.FHQForm.PORT_TYPE;
        this.tableData[this.FHQdialog.curIndex].NOTE = this.FHQdialog.FHQForm.NOTE;
        this.tableData[this.FHQdialog.curIndex].PORT_USES = this.FHQdialog.FHQForm.PORT_USES;
      }
      this.clearFHQForm();
      return true;
    },
    clearFHQForm() {
      this.FHQdialog.FHQForm = {
        RESOURCE_IP: '',
        TARGET_IP: '',
        TARGET_PORT: '',
        PORT_TYPE: {
          CODE: '',
          MEAN: ''
        },
        PORT_TYPE_NAME: '',
        NOTE: '',
        PORT_USES: ''
      };
    },
    confirmF5Form() {
      if (this.addF5NextRow()) {
        this.F5dialog.dialogFormVisible = false;
      }
    },
    addF5NextRow() {
      if (this.F5form.POOL === '') {
        this.$message.warning('POOL不能为空！');
        return false;
      }
      if (!this.F5form.ELEMNET_IP) {
        this.$message.warning('节点IP不能为空！');
        return false;
      }
      if (!this.F5form.PORT) {
        this.$message.warning('端口不能为空！');
        return false;
      }
      if (!this.F5form.JK_CHECK) {
        this.$message.warning('健康检查不能为空！');
        return false;
      }
      if (!this.F5form.USES) {
        this.$message.warning('用途不能为空！');
        return false;
      }
      const F5ROW = {
        POOL: this.F5form.POOL,
        ELEMNET_IP: this.F5form.ELEMNET_IP,
        PORT: this.F5form.PORT,
        JK_CHECK: this.F5form.JK_CHECK,
        USES: this.F5form.USES
      };
      this.F5tableData.unshift(F5ROW);
      this.F5form = {
        POOL: '',
        ELEMNET_IP: '',
        PORT: '',
        JK_CHECK: '',
        USES: ''
      };
      return true;
    },
    netAccessChange() {
      if (this.model.CUST_AH_SAVE_NET_ACCESS.ACCESS_TYPE === 1) {
        this.cardMap.firewall.isShow = true;
        this.cardMap.F5.isShow = false;
      } else if (this.model.CUST_AH_SAVE_NET_ACCESS.ACCESS_TYPE === 2) {
        this.cardMap.firewall.isShow = false;
        this.cardMap.F5.isShow = true;
      } else {
        this.cardMap.firewall.isShow = false;
        this.cardMap.F5.isShow = false;
      }
    },
    saveFHQTableData() {
      for (let i = 0; i < this.tableData.length; i++) {
        const obj = {
          FLOW_ID: this.model.IT_FLOW_BASE.FLOW_ID,
          REQUEST_ID: this.model.CUST_AH_SAVE_NET_ACCESS.REQUEST_ID,
          RESOURCE_IP: this.tableData[i].RESOURCE_IP,
          TARGET_IP: this.tableData[i].TARGET_IP,
          TARGET_PORT: this.tableData[i].TARGET_PORT,
          PORT_TYPE: this.tableData[i].PORT_TYPE.CODE,
          NOTE: this.tableData[i].NOTE,
          PORT_USES: this.tableData[i].PORT_USES
        };
        const params = JSON.parse(JSON.stringify(obj));
        netService.saveFHQTableData(params);
      }
    },
    saveF5TableData() {
      for (let i = 0; i < this.F5tableData.length; i++) {
        const objF5 = {
          FLOW_ID: 1234,
          REQUEST_ID: this.model.CUST_AH_SAVE_NET_ACCESS.REQUEST_ID,
          POOL: this.F5tableData[i].POOL,
          ELEMNET_IP: this.F5tableData[i].ELEMNET_IP,
          PORT: this.F5tableData[i].PORT,
          JK_CHECK: this.F5tableData[i].JK_CHECK,
          USES: this.F5tableData[i].USES
        };
        const paramsF5 = JSON.parse(JSON.stringify(objF5));
        netService.saveF5TableData(paramsF5);
      }
    }
  }
};

</script>
<style>

</style>
