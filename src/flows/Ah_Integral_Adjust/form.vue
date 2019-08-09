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
            <fi-col :span="10">
              <fi-form-item label="工单区域" prop="CUST_AH_INTEGRAL_APP.SHEET_AREA">
                <fi-input v-model="model.CUST_AH_INTEGRAL_APP.SHEET_AREA" clearable readonly></fi-input>
              </fi-form-item>
            </fi-col>
            <fi-col :span="10">
              <fi-form-item label="工单主题" prop="CUST_AH_INTEGRAL_APP.SHEET_TITLE">
                <fi-input v-model="model.CUST_AH_INTEGRAL_APP.SHEET_TITLE" clearable ></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
        </fi-form-card>
        <fi-form-card label="积分调整信息" anchor="IntegralAdjustQuery" scroll-loading>
          <!-- Form -->
          <fi-button @click="openFHQForm">添加</fi-button>
          <fi-button @click="deleteTableData">删除</fi-button>
          <fi-button @click="deleteAllTableData">全部删除</fi-button>
          <fi-button @click="exportTableData">Excel导入</fi-button>
          <fi-button @click="saveFHQTableData">保存草稿箱</fi-button>
          <fi-dialog  :title="IntegralAdjust.dialogTitle" :visible.sync="IntegralAdjust.dialogFormVisible">
            <fi-form  :model="IntegralAdjust.IntegralForm">
              <fi-form-item label="业务号码" :label-width="formLabelWidth" >
                <fi-input v-model="IntegralAdjust.IntegralForm.BUSI_NUM" clearable></fi-input>
              </fi-form-item>
              <fi-form-item label="调整分值" :label-width="formLabelWidth">
                <fi-input v-model="IntegralAdjust.IntegralForm.UPDATE_VALUE"></fi-input>
              </fi-form-item>
              <fi-form-item label="业务员号码归属地" :label-width="formLabelWidth" >
                <fi-input v-model="IntegralAdjust.IntegralForm.NUM_AREA"></fi-input>
              </fi-form-item>
              <fi-form-item label="调整原因" :label-width="formLabelWidth" >
                <fi-select  v-model="IntegralAdjust.IntegralForm.UPDATE_REASON" clearable>
                  <fi-option
                    v-for="item in UPDATE_REASON"
                    :key="item.CODE"
                    :label="item.MEAN"
                    :value="item">
                  </fi-option>
                </fi-select>
              </fi-form-item>
              <fi-form-item label="原因描述" :label-width="formLabelWidth">
                <fi-input v-model="IntegralAdjust.IntegralForm.REASON_DESC"></fi-input>
              </fi-form-item>
            </fi-form>
            <div slot="footer" class="dialog-footer">
              <fi-button @click="IntegralAdjust.dialogFormVisible = false">取 消</fi-button>
              <fi-button @click="saveNextFHQForm" v-show="IntegralAdjust.nextItemBtn">下一条</fi-button>
              <fi-button type="primary" @click="confirmFHQForm">确 定</fi-button>
            </div>
          </fi-dialog>
          <fi-table :data="tableData" style="width: 100%" ref="singleTable" highlight-current-row @current-change="handleCurrentChange">
            <fi-table-column prop="BUSI_NUM" label="业务号码" width="120"></fi-table-column>
            <fi-table-column prop="UPDATE_VALUE" label="调整分值" width="120"></fi-table-column>
            <fi-table-column prop="NUM_AREA" label="业务号码归属地"></fi-table-column>
            <fi-table-column prop="UPDATE_REASON" label="调整原因"></fi-table-column>
            <fi-table-column prop="REASON_DESC" label="原因描述"></fi-table-column>
            <fi-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <fi-button @click="editFHQRow(scope.row,scope.$index)" type="text" size="small">编辑</fi-button>
                <fi-button @click="deleteFHQRow(scope.row)" type="text" size="small">删除</fi-button>
              </template>
            </fi-table-column>
          </fi-table>
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

<script>
import localContext from '@/utils/localContext';
import netService from './api/AhIntegralAdjust';

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
        CUST_AH_INTEGRAL_APP: {}
      },
      localContext,
      global$: {},
      // 注意顺序，auditPro是审核过程，flowModel是流程模版 demo数据，请把注释删掉
      cardList: ['basicInfo', 'IntegralAdjustQuery', 'auditPro', 'IntegralAdjustTable', 'flowModel'],
      UPDATE_REASON: ['礼品质量', '资料变更', '年底积分清零', '其他'],
      cardMap: { // card key跟名称的对应,可在formRady根据需求进行隐藏 demo数据，请把注释删掉
        basicInfo: {
          title: '基本信息',
          isShow: true
        },
        IntegralAdjustQuery: {
          title: '积分调整信息',
          isShow: true
        },
        IntegralAdjustTable: {
          title: '操作积分调整信息窗口',
          isShow: false
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
      systemList: [],
      tableData: [],
      F5tableData: [],
      IntegralAdjust: {
        dialogTitle: '积分调整信息',
        dialogFormVisible: false,
        nextItemBtn: true,
        IntegralForm: {
          BUSI_NUM: '', // 业务号码
          UPDATE_VALUE: '', // 调整分值
          NUM_AREA: '', // 业务员号码归属地
          UPDATE_REASON: ['礼品质量', '资料变更', '年底积分清零', '其他'], // 调整原因
          REASON_DESC: '' // 原因描述
        }
      },
      FHQdialog: {
        dialogTitle: '积分调整信息',
        dialogFormVisible: false,
        nextItemBtn: true,
        FHQForm: {
          RESOURCE_IP: '',
          TARGET_IP: '',
          TARGET_PORT: '',
          PORT_TYPE: {
            CODE: '',
            MEAN: ''
          },
          NOTE: '',
          PORT_USES: ''
        }
      },
      F5dialog: {
        dialogTitle: '新增F5信息',
        dialogFormVisible: false
      },
      formLabelWidth: '120px',
      PORT_TYPE_LSIT: [1, 2, 3, 4, 5],
      F5form: {
        POOL: '',
        ELEMNET_IP: '',
        PORT: '',
        JK_CHECK: '',
        USES: ''
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
    getSystemInfo() {
      const params = {
        treeId: this.model.CUST_AH_SAVE_NET_ACCESS.SYSTEM_TYPE
      };
      netService.getSysnameByTreeId(params).then((data) => {
        this.systemList.length = 0;
        for (let i = 0; i < data.length; i++) {
          this.systemList.push(data[i]);
        }
      });
    },
    getPortType() {
      const type = {
        codeType: 'AH_INTEGRAL_APP_UPDATE_REASON'
      };
      /* netService.getCodelistByCodeType(type).then((data) => {
        this.PORT_TYPE_LSIT.length = 0;
        for (let i = 0; i < data.length; i++) {
          this.PORT_TYPE_LSIT.push(data[i]);
        }
      }); */
    },
    editFHQRow(row, index) {
      this.IntegralAdjust = {
        dialogFormVisible: true,
        dialogTitle: '修改积分调整',
        nextItemBtn: false,
        curIndex: index,
        IntegralForm: {
          BUSI_NUM: row.BUSI_NUM, // 业务号码
          UPDATE_VALUE: row.UPDATE_VALUE, // 调整分值
          NUM_AREA: row.NUM_AREA, // 业务员号码归属地
          UPDATE_REASON: row.UPDATE_REASON, // 调整原因
          REASON_DESC: row.REASON_DESC // 原因描述
        }
      };
    },
    deleteFHQRow(row) {
      this.tableData.splice(this.tableData.indexOf(row), 1);
    },
    saveNextFHQForm() {
      this.saveFHQForm();
    },
    confirmFHQForm() {
      console.log(this.IntegralAdjust.IntegralForm.UPDATE_REASON);
      if (this.saveFHQForm()) {
        this.IntegralAdjust.dialogFormVisible = false;
      }
    },
    openFHQForm() {
      this.clearFHQForm();
      this.IntegralAdjust.dialogFormVisible = true;
      this.IntegralAdjust.dialogTitle = '积分调整';
      this.IntegralAdjust.nextItemBtn = true;
    },
    saveFHQForm() {
      if (!this.IntegralAdjust.IntegralForm.BUSI_NUM) {
        this.$message.warning('业务号码不能为空！');
        return false;
      }
      if (this.IntegralAdjust.IntegralForm.NUM_AREA === '') {
        this.$message.warning('业务号码归属地不能为空！');
        return false;
      }
      if (this.IntegralAdjust.IntegralForm.UPDATE_VALUE === '') {
        this.$message.warning('调整分值不能为空！');
        return false;
      }
      if (this.IntegralAdjust.IntegralForm.UPDATE_REASON === '') {
        this.$message.warning('调整原因不能为空！');
        return false;
      }
      if (this.IntegralAdjust.IntegralForm.REASON_DESC === '') {
        this.$message.warning('原因描述不能为空！');
        return false;
      }
      const ROW = {
        BUSI_NUM: this.IntegralAdjust.IntegralForm.BUSI_NUM,
        NUM_AREA: this.IntegralAdjust.IntegralForm.NUM_AREA,
        UPDATE_VALUE: this.IntegralAdjust.IntegralForm.UPDATE_VALUE,
        UPDATE_REASON: this.IntegralAdjust.IntegralForm.UPDATE_REASON,
        REASON_DESC: this.IntegralAdjust.IntegralForm.REASON_DESC
      };
      if (this.IntegralAdjust.dialogTitle === '积分调整') {
        this.tableData.unshift(ROW);
      } else {
        this.tableData[this.IntegralAdjust.curIndex].BUSI_NUM = this.IntegralAdjust.IntegralForm.BUSI_NUM;
        this.tableData[this.IntegralAdjust.curIndex].NUM_AREA = this.IntegralAdjust.IntegralForm.NUM_AREA;
        this.tableData[this.IntegralAdjust.curIndex].UPDATE_VALUE = this.IntegralAdjust.IntegralForm.UPDATE_VALUE;
        this.tableData[this.IntegralAdjust.curIndex].UPDATE_REASON = this.IntegralAdjust.IntegralForm.UPDATE_REASON;
        this.tableData[this.IntegralAdjust.curIndex].REASON_DESC = this.IntegralAdjust.IntegralForm.REASON_DESC;
      }
      this.clearFHQForm();
      return true;
    },
    clearFHQForm() {
      this.IntegralAdjust.IntegralForm = {
        BUSI_NUM: '', // 业务号码
        UPDATE_VALUE: '', // 调整分值
        NUM_AREA: '', // 业务员号码归属地
        UPDATE_REASON: [], // 调整原因
        REASON_DESC: '' // 原因描述
      };
    },
    confirmF5Form() {
      if (this.addF5NextRow()) {
        this.F5dialog.dialogFormVisible = false;
      }
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
    deleteTableData() {
      let singData = this.singleTable;
      let singDateLength = singData.length;
      console.log('删除表格数据');
    },
    deleteAllTableData() {
      console.log('删除全部表格数据');
    },
    exportTableData() {
      console.log('导入表格数据');
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    }
  }
};

</script>
<style>

</style>
