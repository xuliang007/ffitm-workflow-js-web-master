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
              <fi-form-item label="工单主题" prop="CUST_AH_SAVE_NET_ACCESS.APPLY_ORG_ID">
                <fi-input v-model="model.CUST_AH_SAVE_NET_ACCESS.SHEET_TITLE" clearable></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="8">
              <fi-form-item label="系统类型" prop="CUST_AH_SAVE_NET_ACCESS.SYSTEM_TYPE">
                <fi-select @change="getSystemInfo" v-model="model.CUST_AH_SAVE_NET_ACCESS.SYSTEM_TYPE" clearable></fi-select>
              </fi-form-item>
            </fi-col>
            <fi-col :span="8">
              <fi-form-item label="系统名称" prop="CUST_AH_SAVE_NET_ACCESS.SYSTEM_NAME">
                <fi-select v-model="model.CUST_AH_SAVE_NET_ACCESS.SYSTEM_NAME" clearable>
                  <fi-option
                    v-for="item in systemList"
                    :key="item.TREE_ID"
                    :label="item.TREE_LABEL"
                    :value="item.TREE_ID">
                  </fi-option>
                </fi-select>
              </fi-form-item>
            </fi-col>
            <fi-col :span="8">
              <fi-form-item label="网络接入类型" prop="CUST_AH_SAVE_NET_ACCESS.ACCESS_TYPE">
                <fi-select v-model="model.CUST_AH_SAVE_NET_ACCESS.ACCESS_TYPE"  @change="netAccessChange()"></fi-select>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="8">
              <fi-form-item label="执行部门" prop="CUST_AH_SAVE_NET_ACCESS.IMPLEMENT_ORG_ID">
                <fi-select v-model="model.CUST_AH_SAVE_NET_ACCESS.IMPLEMENT_ORG_ID" readonly clearable></fi-select>
              </fi-form-item>
            </fi-col>
            <fi-col :span="8">
              <fi-form-item label="需求建议时限" prop="CUST_AH_SAVE_NET_ACCESS.REQUIRE_ADVICE_TIME">
                <fi-date-picker type="datetime" v-model="model.CUST_AH_SAVE_NET_ACCESS.REQUIRE_ADVICE_TIME" class="w100"></fi-date-picker>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="24">
              <fi-form-item prop="CUST_AH_SAVE_NET_ACCESS.REQUIRE_DESC" label="需求说明">
                <fi-input type="textarea" v-model="model.CUST_AH_SAVE_NET_ACCESS.REQUIRE_DESC" :autosize="{ minRows: 5 }" ></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
        </fi-form-card>
        <fi-form-card label="防火墙" anchor="firewall" scroll-loading>
          <!-- Form -->
          <fi-button @click="openFHQForm">新增数据</fi-button>
          <fi-button @click="saveFHQTableData">保存数据 </fi-button>
          <fi-dialog :title="FHQdialog.dialogTitle" :visible.sync="FHQdialog.dialogFormVisible">
            <fi-form :model="FHQdialog.FHQForm">
              <fi-form-item label="源地址IP" :label-width="formLabelWidth">
                <fi-input v-model="FHQdialog.FHQForm.RESOURCE_IP"></fi-input>
              </fi-form-item>
              <fi-form-item label="目的地址IP" :label-width="formLabelWidth">
                <fi-input v-model="FHQdialog.FHQForm.TARGET_IP"></fi-input>
              </fi-form-item>
              <fi-form-item label="目的端口" :label-width="formLabelWidth">
                <fi-input v-model="FHQdialog.FHQForm.TARGET_PORT"></fi-input>
              </fi-form-item>
              <fi-form-item label="端口类型" :label-width="formLabelWidth">
                <fi-select placeholder="请选择端口类型" v-model="FHQdialog.FHQForm.PORT_TYPE" value-key="CODE">
                  <fi-option
                    v-for="item in PORT_TYPE_LSIT"
                    :key="item.CODE"
                    :label="item.MEAN"
                    :value="item">
                  </fi-option>
                </fi-select>
              </fi-form-item>
                <fi-form-item label="备注说明" :label-width="formLabelWidth">
                  <fi-input v-model="FHQdialog.FHQForm.NOTE"></fi-input>
                </fi-form-item>
                <fi-form-item label="端口开放用途" :label-width="formLabelWidth">
                  <fi-input v-model="FHQdialog.FHQForm.PORT_USES"></fi-input>
                </fi-form-item>
            </fi-form>
            <div slot="footer" class="dialog-footer">
              <fi-button @click="FHQdialog.dialogFormVisible = false">取 消</fi-button>
              <fi-button @click="saveNextFHQForm" v-show="FHQdialog.nextItemBtn">下一条</fi-button>
              <fi-button type="primary" @click="confirmFHQForm">确 定</fi-button>
            </div>
          </fi-dialog>
          <fi-table :data="tableData" style="width: 100%">
            <fi-table-column prop="RESOURCE_IP" label="源地址IP" width="120"></fi-table-column>
            <fi-table-column prop="TARGET_IP" label="目的地址IP" width="120"></fi-table-column>
            <fi-table-column prop="TARGET_PORT" label="目的端口"></fi-table-column>
            <fi-table-column prop="PORT_TYPE.MEAN" label="端口类型"></fi-table-column>
            <fi-table-column prop="NOTE" label="备注说明"></fi-table-column>
            <fi-table-column prop="PORT_USES" label="端口开放用途"></fi-table-column>
            <fi-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <fi-button @click="editFHQRow(scope.row,scope.$index)" type="text" size="small">编辑</fi-button>
                <fi-button @click="deleteFHQRow(scope.row)" type="text" size="small">删除</fi-button>
              </template>
            </fi-table-column>
          </fi-table>
        </fi-form-card>
        <fi-form-card label="F5" anchor="F5" scroll-loading>
          <fi-button @click="F5dialog.dialogFormVisible = true">新增F5数据</fi-button>
          <fi-button @click="saveF5TableData">保存数据</fi-button>
          <fi-form-item label="IRULE" prop="CUST_AH_SAVE_NET_ACCESS.IRULE" label-width="50px" style="margin-top: 10px;">
            <fi-input v-model="model.CUST_AH_SAVE_NET_ACCESS.IRULE" clearable style="width:500px;"></fi-input>
          </fi-form-item>
          <fi-dialog title="F5信息" :visible.sync="F5dialog.dialogFormVisible">
            <fi-form :model="F5form">
              <fi-form-item label="POOL" label-width="80px">
                <fi-input v-model="F5form.POOL"></fi-input>
              </fi-form-item>
              <fi-form-item label="节点IP" label-width="80px">
                <fi-input v-model="F5form.ELEMNET_IP"></fi-input>
              </fi-form-item>
              <fi-form-item label="端口" label-width="80px">
                <fi-input v-model="F5form.PORT"></fi-input>
              </fi-form-item>
              <fi-form-item label="健康检查" label-width="80px">
                <fi-input v-model="F5form.JK_CHECK"></fi-input>
              </fi-form-item>
              <fi-form-item label="用途" label-width="80px">
                <fi-input v-model="F5form.USES"></fi-input>
              </fi-form-item>
            </fi-form>
            <div slot="footer" class="dialog-footer">
              <fi-button @click="F5dialog.dialogFormVisible = false">取 消</fi-button>
              <fi-button @click="addF5NextRow">下一条</fi-button>
              <fi-button type="primary" @click="confirmF5Form">确 定</fi-button>
            </div>
          </fi-dialog>
          <fi-table :data="F5tableData" style="width: 100%">
            <fi-table-column prop="POOL" label="POOL"></fi-table-column>
            <fi-table-column prop="ELEMNET_IP" label="节点IP"></fi-table-column>
            <fi-table-column prop="PORT" label="端口"></fi-table-column>
            <fi-table-column prop="JK_CHECK" label="健康检查"></fi-table-column>
            <fi-table-column prop="USES" label="用途"></fi-table-column>
            <fi-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <fi-button @click="editF5Row(scope.row)" type="text" size="small">编辑</fi-button>
                <fi-button @click="deleteF5Row(scope.row)" type="text" size="small">删除</fi-button>
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
import netService from './api/ahNetAccessForm';

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
        CUST_AH_SAVE_NET_ACCESS: {}
      },
      localContext,
      global$: {},
      // 注意顺序，auditPro是审核过程，flowModel是流程模版 demo数据，请把注释删掉
      cardList: ['basicInfo', 'auditPro', 'firewall', 'F5', 'flowModel'],
      cardMap: { // card key跟名称的对应,可在formRady根据需求进行隐藏 demo数据，请把注释删掉
        basicInfo: {
          title: '基本信息',
          isShow: true
        },
        firewall: {
          title: '防火墙',
          isShow: false
        },
        F5: {
          title: 'F5',
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
      FHQdialog: {
        dialogTitle: '新增防火墙信息',
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
        codeType: 'AH_ITSM_NTAC_FANGHQ_PORT_TYPE'
      };
      netService.getCodelistByCodeType(type).then((data) => {
        this.PORT_TYPE_LSIT.length = 0;
        for (let i = 0; i < data.length; i++) {
          this.PORT_TYPE_LSIT.push(data[i]);
        }
      });
    },
    editFHQRow(row, index) {
      this.FHQdialog = {
        dialogFormVisible: true,
        dialogTitle: '修改防火墙信息',
        nextItemBtn: false,
        curIndex: index,
        FHQForm: {
          RESOURCE_IP: row.RESOURCE_IP,
          TARGET_IP: row.TARGET_IP,
          TARGET_PORT: row.TARGET_PORT,
          PORT_TYPE: row.PORT_TYPE,
          NOTE: row.NOTE,
          PORT_USES: row.PORT_USES
        }
      };
    },
    editF5Row(row) {
      this.F5dialog = {
        dialogFormVisible: true,
        dialogTitle: '修改F5信息',
        nextItemBtn: false
      };
      this.F5form.POOL = row.POOL;
      this.F5form.ELEMNET_IP = row.ELEMNET_IP;
      this.F5form.PORT = row.PORT;
      this.F5form.JK_CHECK = row.JK_CHECK;
      this.F5form.USES = row.USES;
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
