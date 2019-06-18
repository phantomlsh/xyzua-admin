import Vue from 'vue'
import Router from 'vue-router'
import Entry from './views/Entry.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'entry',
      component: Entry,
      alias: '/entry'
    },
    {
      path: '/model',
      name: 'model',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/Model.vue')
      }
    },
    {
      path: '/record',
      name: 'record',
      component: function () { 
        return import('./views/Record.vue')
      }
    },
    {
      path: '/filter',
      name: 'filter',
      component: function () { 
        return import('./views/Filter.vue')
      }
    },
  ]
})
