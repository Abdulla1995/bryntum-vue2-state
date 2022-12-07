import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import '@bryntum/grid/grid.stockholm.css'

new Vue({
  render: h => h(App),
}).$mount('#app')
