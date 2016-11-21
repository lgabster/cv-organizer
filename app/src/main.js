import Vue from 'vue'
import routes from './routes'

const mainCss = require('./style/main.scss')

const app = new Vue({
  data: {
    currentRoute: window.location.pathname,
    message: 'Vue message',
    cica: 'kitekat'
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
        ? require(`./pages/${matchingView}.vue`)
        : require('./pages/404.vue')
    }
  },
  render: function(h) {
    return h(this.ViewComponent)
  }
}).$mount('#app')

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
