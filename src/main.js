import Vue from 'vue'
import App from './App.vue'
import VueSimpleAlert from "vue-simple-alert";

import './assets/css/style.css';
import 'material-icons/iconfont/material-icons.css';

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
