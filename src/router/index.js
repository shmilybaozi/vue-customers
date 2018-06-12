import Vue from 'vue'
import Router from 'vue-router'
import CustomersList from '../components/CustomersList'
import CustomersAbout from '../components/CustomersAbout'
import CustomersAdd from '../components/CustomersAdd'
import CustomersDetails from '../components/CustomersDetails'
import CustomersEdit from '../components/CustomersEdit'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: CustomersList },
    { path: '/about', component: CustomersAbout },
    { path: '/add', component: CustomersAdd },
    { path: '/customer/:id', component: CustomersDetails },
    { path: '/edit/:id', component: CustomersEdit }
  ],
  mode: 'history',
})