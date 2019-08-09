<template>
  <fi-workflow :model.sync="model" label-width="120px" :local-context="localContext" @onFormReady="onFormReady" :on-form-submit="onFormSubmit">
    <fi-form-layout :card-list="cardList" :card-map="cardMap">
      <fi-row slot="outside" class="fi-form-layout__outside itsm-dispatch__outside">
        <fi-col :span="22">
          <span class="itsm-dispatch__outside-item">
            <label>申请时间：</label>
            <span class="danger">{{model.SUBMIT_TIME}}</span>
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
            <fi-col :span="12">
              <fi-form-item label="月份" prop="REPORT_MONTH">
                <fi-input v-model="model.REPORT_MONTH" clearable></fi-input>
              </fi-form-item>
            </fi-col>
            <fi-col :span="12">
              <fi-form-item label="上报省份" prop="REPORT_REGION">
                <fi-input v-model="model.REPORT_REGION" readonly clearable></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="12">
              <fi-form-item label="上报人" prop="REPORT_PERSON">
                <fi-input v-model="model.REPORT_PERSON" clearable></fi-input>
              </fi-form-item>
            </fi-col>
            <fi-col :span="12">
              <fi-form-item label="上报时间" prop="SUBMIT_TIME">
                <fi-date-picker type="datetime" v-model="model.SUBMIT_TIME" class="w100"></fi-date-picker>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="24">
              <fi-form-item label="单号" prop="REPORT_NO">
                <fi-input v-model="model.REPORT_NO" clearable></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="24">
              <fi-form-item label="标题" prop="TITLE">
                <fi-input v-model="model.TITLE" clearable></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-col :span="24">
              <fi-form-item prop="CONTENT" label="正文">
                <fi-input type="textarea" v-model="model.CONTENT" :autosize="{ minRows: 5 }" ></fi-input>
              </fi-form-item>
            </fi-col>
          </fi-row>
          <fi-row>
            <fi-form-item label="附件" prop="ATTACHS">
              <fi-workflow-upload v-model="model.ATTACHS"></fi-workflow-upload>
            </fi-form-item>
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

<script>
import localContext from '@/utils/localContext';
// import { getHtmlData, getJsonFromHtmlData } from '../../utils';

export default {
  name: 'workflow',
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
          isShow: false
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
      return this.model.DEPART ? `${this.model.DEPART}-${this.model.REPORT_PERSON}(${this.model.TEL})` : '';
    }
  },
  methods: {
    onFormReady() {
      if (this.tchNum !== 'REPORT_ORDER_19181') {
        this.carMap.auditPro.show = true;
      }
      if (this.tchNum === 'REPORT_ORDER_19181') {
        const dateAttr = this.model.REPORT_MONTH.split('-');
        if (dateAttr.length > 1) {
          const monthStr = `${dateAttr[0]}年${Number(dateAttr[1]) - 1}月`;
          this.model.REPORT_MONTH = monthStr;
          const titleStr = `IT全网运营分析报告_${this.model.REPORT_REGION}(${dateAttr[0]}年${Number(dateAttr[1]) - 1}月)`;
          this.model.TITLE = titleStr;
        }
      }
    },
    onFormSubmit() {
      return true;
    }
  }
};
</script>
