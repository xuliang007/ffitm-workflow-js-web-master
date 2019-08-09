# ffitm-workflow-js-web

> 集团itsm流程项目

## 构建方法

```bash
# 安装依赖
npm install / yarn install

# 开发模式（localhost:8090）
## 代理模式 代理在config/proxyTable.js配置
npm run dev / yarn run dev
## Mock模式 mock数据在src/mock配置 其中ftlVar为ftl的prefectchData数据，代理模式也是用这个数据
npm run mock-dev / yarn run mock-dev
## 按需启动 启动可以不全量，可以单独启动一个流程或者多个流程,提高编译速度
### 一个模块
npm run dev/mock-dev --env.m=jtitsmReportOrderForm
yarn run dev/mock-dev --env.m=jtitsmReportOrderForm
### 多个模块
npm run dev/mock-dev --env.m={flowModel,jtitsmReportOrderForm}
yarn run dev/mock-dev --env.m={flowModel,jtitsmReportOrderForm}

# 打包
## 第一次打包或者ffitm-vue-ui、ffitm-workflow-ui版本有更新先执行dll
npm run dll / yarn run dll
## 全量打包 ffitm-vue-ui、ffitm-workflow-ui版本有更新必须打全量的
npm run build
## 按流程（模块）打包 如果ffitm-vue-ui、ffitm-workflow-ui版本没有更新可以增量打包，提高打包速度
### 一个模块
npm run build jtitsmReportOrderForm
yarn run build jtitsmReportOrderForm
### 多个模块
npm run build {flowModel,jtitsmReportOrderForm}
yarn run build {flowModel,jtitsmReportOrderForm}

```

## 组件

#### 1、引擎附件上传组件

name：FiWorkflowUpload

package: ffitm-workflow-ui

> 组件是对[el-upload](http://element-cn.eleme.io/#/zh-CN/component/upload)的封装，其中name,data,action,file-list,Api无效。
>
> on-preview默认执行下载，如果有配置返回false将不执行下载动作。
>
> on-error默认弹出报错信息，如果有配置返回false将不执行报错动作。
>
> 组件默认提供上传按钮，可通过upload-btn-show进行隐藏
>
> 组件disabledclass='el-upload'默认被样式隐藏
>
> 其他的Attribute、slot、methods与[el-upload](http://element-cn.eleme.io/#/zh-CN/component/upload)一致

#### 2、员工选择框

1.name：StaffSelect

```js
import { StaffSelect } from 'ffitm-workflow-ui';

const staffSelect = StaffSelect(param);
const setStaff = {
    STAFF_ID: this.model.DEPT_LEADER_ID,
    STAFF_NAME: this.model.DEPT_LEADER_NAME
};
staffSelect.setPersons(setStaff); // 赋值
staffSelect.setChoiceSourceTreeConfig({
     organization: { // 部门
        startPathIds: this.config.orgId,
        selectedOrgID: this.config.beginOrgId, // 必须是字符串
        isTop: this.config.rootOrgCanChange,
        hidden: false
    },
    dutyLine: { hidden: true }, // 值班室
    project: { hidden: true } // 专项小组
});
staffSelect.show();
```



#### 3、员工选择输入框

name: fi-workflow-staff-picker

描述：引擎处理人员的上的员工选择框

**Attributes**

| 参数        | 说明                     | 类型         | 可选值 | 默认值                                                       |
| ----------- | ------------------------ | ------------ | ------ | ------------------------------------------------------------ |
| multiple    | 是否多选                 | boolean      | -      | false                                                        |
| filterable  | 是否可搜索               | boolean      | -      | true                                                         |
| value       | 值                       | array/string | -      | -                                                            |
| placeholder | 输入框占位文本           | string       | -      | 请输入员工姓名、登录名、电话、邮箱等信息查询，中间利用空格隔开，如:张三,北京 |
| config      | 员工选择框配置，详见下表 | object       | -      | { init: true, canChange: true }                              |

**config**

| 参数             | 说明                                                         | 类型        | 必填 |
| ---------------- | ------------------------------------------------------------ | ----------- | ---- |
| orgId            | 组织ID，不能为undefined没值的时候赋null                      | string/null | true |
| beginOrgId       | 默认展开的OrgId，不能为undefined没值的时候赋null             | string/null | true |
| rootOrgCanChange | 组织节点是否可以改变，如果为true，默认展开根节点，为false则orgId为根节点，不能为undefined | boolean     | true |
| canChange        | 是否值可以改变                                               | boolean     | true |
| staffCreateType  | 员工类型，2且有orgId为只有部门，3 专线小组 4值班线           | string      | true |

**Events**

| 事件名称 | 说明         | 参数       |
| -------- | ------------ | ---------- |
| change   | 值改变时触发 | 组件绑定值 |

**Methods**

| 方法名      | 说明                                                         | 参数     |
| ----------- | ------------------------------------------------------------ | -------- |
| pickerClick | 图标单击时触发， 参数为一个回调函数 ，回调函数为本身。执行回调函数将再执行一次。 | callback |

#### 4、布局组件

package: ffit-vue-ui

a.  fi-form-layout

b.  fi-form-card.vue

 1.如果需要滚动加载只需加上scroll-loading参数，则默认不展开，滚动或者点击右边对应目录加载打开

 2.scroll-callback事件

#### 5、审核过程

| 参数      | 说明                                                         | 类型           | 可选值                                                       | 默认值 |
| --------- | ------------------------------------------------------------ | -------------- | ------------------------------------------------------------ | ------ |
| urlParam  | 从url获取参数。去获取数据。false的话需要在引擎下，从引擎里取获取数据 | boolean        | ture/false                                                   | false  |
| fields    | 自定义配置字段。                                             | array          | 'tchType'：分类, 'tchContDesc'：环节名称, 'executer'：处理人, 'resultDesc'：处理意见, 'taster'：传阅意见, 'doc'：附件, 'finishDate'：完成时间, 'turnInfo'：提交信息, 'disposeDate'：处理时长 | -      |
| type      | 配置好的fields。complete全部显示、simple显示简洁版、remote在简洁版上加上分类。简介版本为：环节名称、处理人员、处理意见、附件、完成时间、处理时长 | string         | 'simple', 'remote', 'complete'                               | simple |
| border    | 边框                                                         | boolean        | true/false                                                   | true   |
| maxHeight | 最大高度限制                                                 | string、number | -                                                            | -      |

#### 6、复选框

name: fi-checkbox

新增API

> group Boolean 默认 ture 默认checkbox-group下的checkbox都会跟group的model绑定，该属性为fasle时候，将不绑定

#### 7、form-item

新增API

> concat-rules Boolean 合并规则：原本是以form-item的rules或form的rules其中一个，该属性可以将两个rules合起来
>
> required-msg required为true时，校验显示的错误信息

#### 8、默认类型下拉树
name: fi-type-tree
####说明：统一使用懒加载模式
| 参数      | 说明                                                         | 类型           | 可选值                                                       | 默认值 |
| --------- | ------------------------------------------------------------ | -------------- | ------------------------------------------------------------ | ------ |
| type      | 下拉树类型                                                   | string         | ORG/REGION                                                   | ----   |
| multiple  | 多选（目前REGION有效，ORG暂无多值查询接口）                  | boolean        | trye/false                                                   | ----   |
| width     | 下拉树区域的宽度(需要添加单位px或者%都行)                    | string         | -                                                            | 200px  |
| disabled  | 禁用                                                         | boolean        | true/false                                                   | ----   |
| nodeKey   | 节点唯一标识                                                 | string         | -                                                            | id     |
| labelKey  | 节点文本域唯一标识                                           | string         | -                                                            | label  |
| rootId    | 设置根节点                                                   | string,Number  | -                                                            | -1     |

**Events**

| 事件名称        | 说明         | 参数       |
| --------        | ------------ | ---------- |
| node-click      | 单选选中事件 | 选中节点   |
| getChecks       |多选选中事件  | 选中的参数 |

#### 9、流程引擎 fi-workflow

**Attributes**

| 参数          | 说明                                                         | 类型            | 可选值 | 默认值 |
| ------------- | ------------------------------------------------------------ | --------------- | ------ | ------ |
| model.sync    | 表单数据                                                     | object          | -      | ｛｝   |
| label-width   | 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值 | string          | -      | 100px  |
| local-context | 引擎本地拓展事件，菜单规则、菜单事件。如有增加菜单规则，需要合回统一版本的localContext.js里。 | object          | -      | ｛｝   |
| opinion       | 处理意见，可以为函数，打开处理页面的时候，会去取值调用       | string/function | -      | -      |

**Events**

| 事件名称          | 说明 | 参数                |
| ----------------- | ---- | ------------------- |
| onFormReady       |      | -                   |
| onFormBeforeValid |      | -                   |
| onAfterSave       |      | 是否成功 true/false |

**Methods**

| 方法名        | 说明     | 参数 |
| ------------- | -------- | ---- |
| opinion       |          |      |
| onFormSubmit  | 支持异步 |  type(turn 流转，save保存)    |
| onClickBefore | 支持异步 |      |

**workflowContext**

> 引擎提供提供的事件，合并了localContext.js。为兼容旧版引擎，在onFormReady之后，会在表单赋一个parent的值，该值指向workflowContext。可以再表单上通过，this.parent.xx 访问

*规则*

| 方法名                 | 说明                                     | 返回值     |
| ---------------------- | ---------------------------------------- | ---------- |
| isEnableForword        | 是否禁用处理按钮，可以用来判断是否有权限 | true/false |
| isFlowBegin            | 是否是刚创建的流程                       |            |
| isExecuter             | 是否是执行者                             |            |
| isReceiver             | 是否是接收者，包括高级管理员             |            |
| isFlowModelFlowManager | 是否是超级管理员                         |            |
| isTchEnd               | 环节是否结束                             |            |
| isView                 | 是否是预览状态                           |            |
| isTacheActive          |                                          |            |
| isPool                 |                                          |            |
| isParalleling          |                                          |            |
| isSerialing            |                                          |            |

*事件*

| 方法名         | 说明                                                         | 参数                                                         |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| doFlowOnLayer  | 流转按钮事件                                                 |                                                              |
| viewFlowProc   | 审核过程按钮事件                                             |                                                              |
| viewFlowModel  | 流程模板按钮事件                                             |                                                              |
| doApprove      | 传阅意见按钮事件                                             |                                                              |
| doSaveFlowForm | 保存事件                                                     |                                                              |
| doOpinion      | 常用意见按钮事件                                             |                                                              |
| flowTo         | 打开处理窗口，默认选中参数环节                               | ｛isPrompt：boolan// 提示框,tchNum: string// 环节tchNum，loading：boolean//开始执行的时候会改为false，auto: boolean//是否自动执行 默认false｝ |
| flowToNext     | 自动流转到指定环节，找不到环节不执行。没有默认处理人，意见必填没意见则打开处理窗口 | ｛isPrompt：boolan// 提示框,tchNum: string// 环节tchNum，loading：boolean//开始执行的时候会改为false,auto: boolean//是否自动执行 默认true｝ |
| flowToDefault  | 自动流转到默认选中环节，没有默认环节,没有默认处理人，意见必填没意见则打开处理窗口 | ｛isPrompt：boolan// 提示框,tchNum: string// 环节tchNum，loading：boolean//开始执行的时候会改为false,auto: boolean//是否自动执行 默认true｝ |
| closePopup     | 关闭流转窗口                                                 |                                                              |
| getTchOpinion  | 获取环节处理意见                                             |                                                              |

>flowTo系类都为异步，并不是马上执行
>
>引擎处理的时候会上锁。点处理的时候已经锁上了。所以再执行flowToDefault。他遇到锁就不执行了。所以如果在submit等处调用flowTo系列的。要使用$nextTick。先返回sumit再执行

#### ewebeditor组件
- 将ewebeditor放到服务器目录/app/resources/form/static下；
- 需要添加后端依赖包,将WEB-INF对应的后端文件和依赖包添加到对应服务器上的WEB-INF目录下。
- 赋授权码,开发模式下不需要授权码，生产环境需要授权码，配置在/app/resources/form/static/ewebeditor/jsp/config.jsp上
- 静态资源路径：/app/resources/form/static/ewebeditor/ewebeditor.htm
- 首页地址：http://ip:port/app/resources/form/static/ewebeditor/admin/default.jsp

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **input-name** |  字段名，**必选参数** | string | — | — |
| url |  静态资源路径 | string | -- | 可不填，默认为静态资源路径|
| readOnly | 只读 | string | — | 1 |
| editor-style | 样式 | string | 参考官网样式 | scform |
| disabled |是否禁用 | boolean | — | —|
| max-height | 最大高度 | string | — | 200 |
| autogrow | 自动缩放 | Number| — | 0 |

example:
```
<fi-form-item prop="CUST_ZJ_DECLARATION.oEventDesc" label="事件描述">
  <fi-ewebeditor v-model="model.CUST_ZJ_DECLARATION.oEventDesc"
                 url="/app/resources/form/static/ewebeditor/ewebeditor.htm?id=oEventDesc&style=scform&autogrow=1"
                 input-name="oEventDesc" max-height="250"></fi-ewebeditor>
</fi-form-item>
```

#### 业务系统组件

name: sys-business

| 参数      | 说明                                                         | 类型           | 可选值                      | 默认值 |
| --------- | ------------------------------------------------------------ | -------------- | --------------------------  | ------ |
| visible          | 是否显示弹出层，支持 .sync 修饰符                     | Array          | -                           |        |
| defaultData      | 默认选中的数据                                        | Array          | -                           | ----   |
| dataSource       | 数据源                                                | Array          | -                           | ----   |
| title            | 弹出框标题                                            | string         | -                           | 业务系统查询  |
| idlKey           | 节点唯一标识                                          | string         | -                           | id   |
| labelKey         | 节点文本字段标识                                      | string         | -                           | label |
| childKey         | 子节点字段标识                                        | string         | -                           | childs  |
| closable         | 已选标签是否可直接删除                                | Boolean         | -                          | false  |

**Events**

| 事件名称        | 说明         | 参数       |
| --------        | ------------ | ---------- |
| getCheckedId    | 获取选中的节点id |  选中节点id数组   |
| getCheckedList  | 获取选中的节点   | 选中的节点 |

说明：
- 可直接传数据源，数据源参考格式：
systemData: [
        {
          id: '1',
          label: '财务'
          childs: [{
            id: '905',
            label: '财务-财务工作台',
          }]
          }
          ]
example:
```
system-business v-if="systemView"
                           :visible.sync="systemView"
                           :default-data="defaultData"
                           :data-source="systemData"
                           @getCheckedList="getCheckedList"
                           @getCheckedId="getCheckedId"></system-business>
```

## 开发

### 1、创建新的流程

```bash
# 流程文件名称为驼峰格式，流程名称为空则ftl的title为流程文件名称
npm run new 流程文件名称 流程名称 / yarn run new 流程文件名称 流程名称
# eg.
yarn run new jtitsmReportOrderForm 集团测试流程
```

执行new之后会在`src/flows`下创建对应的目录及三个文件

```bash
scDataModifyForm
	- form.vue # 表单文件
	- index.ftl # 入口html
	- index.js # 入口文件
```

### 2、表单开发

####1）form.vue文件简介 TODO

#### 2) index.ftl 文件简介 TODO

#### 3）index.js 文件简介 TODO

#### 4）流程引擎API介绍 TODO

#### 5）常用功能介绍

##### a.滚动加载

ffitm-vue-ui 提供了一个简易的滚动加载的mixin，地址`src/mixins/scrollLoading.js`

*TODO：* 目前该mixin只支持window的滚动监听，不能对其他元素进行监听，之后有机会的再去做。目前是比较简易的

```js
props: { // 会给组件提供三个参数
    scrollLoading, // 是否启用滚动加载
    delayDistance, // 组件偏移多少距离开始加载，默认100
    debounce // 节流时间 默认 50ms
  },
  data() { // 会给组件提供一个data
    return {
      isScrollLoaded // 是否加载,默认false
    };
  },
  created() {
    // 如果不启用滚动加载，将加载
  },
  mounted() {
    // 如果是滚动加载，判断现在是否在视图中
    // 如果在视图中则调用 scrollCallback方法然后触发scroll-callback事件
    // 否则对滚动进行监听
  },
  beforeDestroy() {
    // 删除监听
  },
  methods: {
    handleScroll(event) {
      // 滚动监听方法，如果在满足条件则调用 scrollCallback方法然后触发scroll-callback事件
    }
  }
```

具体的使用方法可以参考
```vue
<template>
  <fi-collapse-card v-if="isShowCard"
                    :hide.sync="isHide"
                    :shadow="shadow"
                    v-bind="attr"
                    v-on="$listeners"
                    class="fi-form-card">
    <div slot="header">
      <span>{{label}}</span>
      <a :href="'#' + anchor" v-if="anchor" class="fi-form-card__anchor">#</a>
      <slot name="header"></slot>
    </div>
    <div class="fi-form-card__content">
      <slot v-if="isScrollLoaded"></slot>
    </div>
  </fi-collapse-card>
</template>

<script>
import scrollLoading from 'ffitm-vue-ui/src/mixins/scrollLoading';

export default {
  name: 'fi-form-card',
  inject: {
    scLayout: {
      default: ''
    }
  },
  mixins: [scrollLoading],
  props: {
    label: String,
    hide: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: String,
      default: 'never'
    },
    anchor: String
  },
  data() {
    return {
      isHide: false
    };
  },
  computed: {
    attr() {
      return this.anchor ? {
        id: this.anchor,
        ...this.$attrs
      } : {};
    },
    isShowCard() {
      return this.scLayout && this.anchor ? this.scLayout.cardMap[this.anchor].isShow : true;
    },
    selected() {
      return this.scLayout.anchor;
    }
  },
  created() {
    this.isHide = this.scrollLoading ? true : this.hide;
  },
  watch: {
    selected(anchor) {
      const reg = new RegExp(`\\d*#${this.anchor}`);
      if (reg.test(anchor)) {
        this.toggle(false);
      }
    },
    hide(value) {
      this.toggle(value);
    }
  },
  methods: {
    toggle(hide) {
      this.isHide = hide;
    },
    scrollCallback() {
      this.toggle(false);
    }
  }
};
</script>
```

##### b.页面上流程模版和审核过程代码

```vue
<fi-form-card label="审核过程" anchor="auditPro" scroll-loading>
    <template slot="header"><fi-process-legend></fi-process-legend></template>
    <fi-workflow-process></fi-workflow-process>
</fi-form-card>
<fi-form-card label="流程模板" anchor="flowModel" scroll-loading>
    <fi-workflow-flow-model></fi-workflow-flow-model>
</fi-form-card>
```
### 前后端联调
1.  修改config/proxyTable.js中的url，指向需要联调的后端服务器
2. 在config/proxyTable.js中配置好代理的接口
3. 360或者chrome可以下载个EditorThisCookie插件，前端需要先获取后端的Cookie,才能访问到后端接口,具体操作如下：
  - 登陆后端，利用EditorThisCookie插件获取当前JSESSIONID的值
  - 访问前端，修改当前EditorThisCookie插件的JSESSIONID值，把刚才获取到的后端JSESSIONID值更新进去（记得✔）


##流程访问
###a.服务器访问
服务器上直接访问数据库表FLOW_FORM_URL_CFG里面的地址即可
例如 ：http://10.128.91.105:8281/jtitsmForm/jtitsmReportOrder/index?flowMod=13383

###b.前端本地访问
本地上只需要直接访问模块加flow_mod就行
例如： http://localhost:8090/jtitsmReportOrderForm?flowMod=13383


##功能点测试案例
1、对新架构流程话需要针对每个环节复杂度进行梳理，这样大家后续迁移的时候也会有清晰的逻辑，
复杂度低的按照模块进行梳理，复杂度高的按照流程环节来梳理。
2、对于新增的流程，开发前需要工程提供需求书，同时还要提供测试案例，我们需要在开发前进行梳
理功能测试案例，开发的同时可以对当前的功能测试案例进行补充，到测试组时候，测试组会提供反向
破坏性测试案例。
3、旧版迁移的时候要根据自己去走工单，对有使用的方法进行迁移，因为当前旧版流程的页面文件中存
在一些冗余方法。
