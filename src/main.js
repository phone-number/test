console.log(process.env.NODE_ENV, process.env.BASE_URL)
import App from './App.vue'
import Vue from 'vue'
import Vmodal from './plugins/iviewModal'
import { Button } from 'view-design'

Vue.use(Vmodal)
Vue.component('Button', Button)
new Vue({
  render: h => h(App),
}).$mount('#app')