import Vue from 'vue'
import Router from 'vue-router'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'


import index from '@/components/index'
import view from '@/components/dataPanel'
import home from '@/components/home'
import thank from '@/components/thank'
import thanks from '@/components/thanks'
import viewA from '@/components/viewA'
import thanksupport from '@/components/thanksupport'
import LD from '@/components/LD'
import Vueresource from "vue-resource"


Vue.use(Router)
Vue.use(Vueresource)
Vue.use(IScrollView, IScroll)


export default new Router({
  routes: [
    {path: '/', name: 'index', component: index,
      meta: {
        title: '评价'
      }
    },
    {path: '/view', name: 'view', component: view,
      meta: {
        title: '评价'
      }
    },
    {path: '/viewA', name: 'viewA', component: viewA,
      meta: {
        title: '评价'
      }
    },
    {path: '/thanksupport', name: 'thanksupport', component: thanksupport,
      meta: {
        title: '评价'
      }
    },
    {path: '/home', name: 'home', component: home,
      meta: {
        title: '茶米茶问卷'
      }
    },
    {path: '/thankyou', name: 'thank', component: thank,
      meta: {
        title: '茶米茶问卷'
      }
     },
    {path: '/LD', name: 'LD', component: LD,
      meta: {
        title: '六丁问卷'
      }
    },
    {path: '/thanks', name: 'thanks', component: thanks,
      meta: {
        title: '六丁问卷'
      }
    },
  ]
})

