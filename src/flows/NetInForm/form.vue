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
            <fi-col :span="24">
              <fi-form-item label="工单主题" prop="CUST_AH_SAVE_NET_ACCESS.APPLY_ORG_ID">
                <fi-input v-model="model.CUST_AH_SAVE_NET_ACCESS.SHEET_TITLE" clearable></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="8">
              <fi-form-item label="系统类型" prop="CUST_AH_SAVE_NET_ACCESS.SYSTEM_TYPE">
                <fi-select  @change="getSystemInfo"  v-model="model.CUST_AH_SAVE_NET_ACCESS.SYSTEM_TYPE" clearable >
                  <fi-option
                    v-for="item in PORT_TYPE_LSIT"
                    :key="item.code"
                    :label="item.mean"
                    :value="item">
                  </fi-option>
                </fi-select>
              </fi-form-item>
            </fi-col>
            <fi-col :span="8">
              <fi-form-item label="系统名称" prop="CUST_AH_SAVE_NET_ACCESS.SUBMIT_TIME">
                <fi-select  v-model="model.CUST_AH_SAVE_NET_ACCESS.SYSTEM_NAME" ></fi-select>
              </fi-form-item>
            </fi-col>
            <fi-col :span="8">
              <fi-form-item label="网络接入类型" prop="CUST_AH_SAVE_NET_ACCESS.ACCESS_TYPE">
                <fi-select  v-model="model.CUST_AH_SAVE_NET_ACCESS.ACCESS_TYPE"></fi-select>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="8">
              <fi-form-item label="执行部门" prop="CUST_AH_SAVE_NET_ACCESS.IMPLEMENT_ORG_ID">
                <fi-select v-model="model.CUST_AH_SAVE_NET_ACCESS.IMPLEMENT_ORG_ID" clearable></fi-select>
              </fi-form-item>
            </fi-col>
            <fi-col :span="16">
              <fi-form-item label="需求建议时限" prop="CUST_AH_SAVE_NET_ACCESS.REQUIRE_ADVICE_TIME">
                <fi-date-picker type="datetime" v-model="model.CUST_AH_SAVE_NET_ACCESS.REQUIRE_ADVICE_TIME" class="w100"></fi-date-picker>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="24">
              <fi-form-item label="需求说明" prop="CUST_AH_SAVE_NET_ACCESS.REQUIRE_DESC">
                <fi-input v-model="model.CUST_AH_SAVE_NET_ACCESS.REQUIRE_DESC" clearable></fi-input>
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

<script> import localContext from '@/utils/localContext';
// import { getHtmlData, getJsonFromHtmlData } from '../../utils';
import netService from './api/NetInForm';

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
      cardList: ['basicInfo', 'auditPro', 'flowModel', 'f5', 'firewall'],
      cardMap: { // card key跟名称的对应,可在formRady根据需求进行隐藏 demo数据，请把注释删掉
        basicInfo: {
          title: '基本信息',
          isShow: true
        },
        auditPro: {
          title: '审核过程',
          isShow: false
        },
        flowModel: {
          title: '流程模板',
          isShow: false
        },
        f5: {
          title: 'F5信息',
          isShow: false
        },
        firewall: {
          title: '防火墙',
          isShow: false
        }
      },
      systemList: [],
      PORT_TYPE_LSIT: []
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
    getDatas() {
      this.PORT_TYPE_LSIT = [
        {
          code: 1,
          mean: 'MSS'
        }, {
          code: 2,
          mean: 'ITM'
        }, {
          code: 3,
          mean: 'BSS'
        }, {
          code: 4,
          mean: 'OSS'
        }, {
          code: 5,
          mean: 'EDA'
        }, {
          code: 6,
          mean: '集团两级'
        }
      ];
      // eslint-disable-next-line no-underscore-dangle
      const _this = this;
      _this.$set(_this.formDate, _this.mean);
    },
    // eslint-disable-next-line no-unused-vars
    getSystemInfo(selVal) {
      const code = selVal.code;
      const name = selVal.mean;
      console.log(`选择的name为：${code}`, `选择的code为:${name}`);
      console.log(selVal);

      /* this.systemList.length = 0;
      for (let i = 0; i < Number(treeId); i++) {
        this.systemList.push(i);
      } */
    /*  const params = {
        treeId: this.model.CUST_AH_SAVE_NET_ACCESS.SYSTEM_TYPE
      }; */
    /*  netService.getSysnameByTreeId(params).then((data) => {
        this.systemList.length = 0;
        for (let i = 0; i < data.length; i++) {
          this.systemList.push(data[i]);
        }
      }); */
    },
    getPortType() {
      this.PORT_TYPE_LSIT.length = 0;
      for (let i = 0; i < 5; i++) {
        this.PORT_TYPE_LSIT.push('12121');
      }
      /* const type = {
        codeType: 'AH_ITSM_NTAC_FANGHQ_PORT_TYPE'
      };
      netService.getCodelistByCodeType(type).then((data) => {
        this.PORT_TYPE_LSIT.length = 0;
        for (let i = 0; i < data.length; i++) {
          this.PORT_TYPE_LSIT.push(data[i]);
        }
      }); */
    },
    openFHQForm() {
      this.clearFHQForm();
      this.FHQdialog.dialogFormVisible = true;
      this.FHQdialog.dialogTitle = '新增防火墙信息';
      this.FHQdialog.nextItemBtn = true;
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
    }
  },
  created() {
    this.getDatas();
  }

};
</script>
