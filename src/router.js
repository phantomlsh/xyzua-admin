import Vue from 'vue'
import Router from 'vue-router'
import Entry from './views/Entry.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Entry',
      component: Entry,
      alias: '/entry'
    },
    {
      path: '/model',
      name: 'Model',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/Model.vue')
      }
    },
    {
      path: '/record',
      name: 'Record',
      component: function () { 
        return import('./views/Record.vue')
      }
    },
    {
      path: '/query',
      name: 'Query',
      component: function () { 
        return import('./views/Query.vue')
      }
    },
    {
      path: '/count',
      name: 'Count',
      component: function () { 
        return import('./views/Count.vue')
      }
    },
    {
      path: '/print',
      name: 'Print',
      component: function () { 
        return import('./views/Print.vue')
      }
    }
  ]
})
