/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import echarts from 'echarts'

import directives from '@/directive'

// 全局组件库
import './components/iview'
import './components/vant'
import './components/index'

import dataBase from './global'
// 字体图标
import './assets/font/iconfont.js'

// 自定义过滤
import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: import 'mock'
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    require('@/mock')
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios

/**
 * 注册指令
 */
directives(Vue)

/**
 * 多语言国际化
 */
import VueTranslate from './utils/lang.js'
Vue.use(VueTranslate)
const lang = (localStorage.lang || 'zh-cn')
Vue.lang(lang)

dataBase.debug && (() => {
    var script = document.createElement('script'); 
    script.src = "plugins/vconsole.min.js"; 
    document.body.appendChild(script); 
    script.onload = () => { 
        try { 
            var vConsole = new VConsole();
        }catch(e) {
            
        };  
    } 
})(); 

new Vue({
    router,
    store,
    created() {
        dataBase.init(this)
    },
    render: h => h(App)
}).$mount('#app')

