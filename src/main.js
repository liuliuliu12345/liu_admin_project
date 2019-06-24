import Vue from 'vue'
import App from './App.vue'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
// Vue.use(iView); // 按需引入不需要挂载

new Vue({
  el: '#app',
  render: h => h(App)
});