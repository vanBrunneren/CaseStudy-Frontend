import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueLodash from 'vue-lodash'

import App from './App.vue'

import Home from './components/Home.vue'
import Articles from './components/Articles.vue'
import Categories from './components/Categories.vue'
import Login from './components/Login.vue'
import ArticleDetail from './components/ArticleDetail.vue'
import Basket from './components/Basket.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueLodash)

const routes = [
  { path: '/', component: Home },
  { path: '/articles', component: Articles },
  { path: '/articles/category/:categoryId', component: Articles },
  { path: '/categories', component: Categories },
  { path: '/login', component: Login },
  { path: '/articles/:id', component: ArticleDetail },
  { path: '/basket', component: Basket }
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

const app = new Vue({
    router,
    render: createEle => createEle(App)
}).$mount('#app');
