import Vue from 'vue';
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
}).$mount('#form');
