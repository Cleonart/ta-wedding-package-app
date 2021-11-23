import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Vendor from '../views/Vendor.vue'
import Detail from '../views/Detail.vue'
import Checkout from '../views/Checkout.vue'
import ShoppingCart from '../views/ShoppingCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/vendor',
    name: 'Vendor',
    component: Vendor
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/shoppingcart',
    name: 'Shopping Cart',
    component: ShoppingCart
  },
]

const router = new VueRouter({
  routes
})

export default router
