// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('./bootstrap')

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Notifications from 'vue-notification'
import TextareaAutosize from 'vue-textarea-autosize'
import vGallery from 'v-gallery'
import vUploader from 'v-uploader'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';

axios.defaults.baseURL = 'http://localhost:5000'
Vue.use(vUploader)
Vue.use(vGallery)
Vue.use(TextareaAutosize)
Vue.use(Notifications)
Vue.use(Vuesax)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
