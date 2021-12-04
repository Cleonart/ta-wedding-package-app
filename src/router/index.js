import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Vendor from "../views/Vendor.vue";
import Detail from "../views/Detail.vue";
import RegisterPacket from "../views/RegisterPacket.vue";
import Checkout from "../views/Checkout.vue";
import ShoppingCart from "../views/ShoppingCart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/vendor",
    name: "Vendor",
    component: Vendor,
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/register_packet/:id",
    name: "Packet Register",
    component: RegisterPacket,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/shoppingcart",
    name: "Shopping Cart",
    component: ShoppingCart,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
