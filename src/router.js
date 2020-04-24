import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./components/Dashboard.vue";
import store from "./store";
import App from "@/views/layouts/App";
import Home from "@/views/home";
import Login from "@/views/auth/login";
import Register from "@/views/auth/register";
Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/sample",
      name: "sample",
      component: () => import("./components/SampleDemo.vue"),
    },
    {
      path: "/forms",
      name: "forms",
      component: () => import("./components/FormsDemo.vue"),
    },
    {
      path: "/data",
      name: "data",
      component: () => import("./components/DataDemo.vue"),
    },
    {
      path: "/panels",
      name: "panels",
      component: () => import("./components/PanelsDemo.vue"),
    },
    {
      path: "/overlays",
      name: "overlays",
      component: () => import("./components/OverlaysDemo.vue"),
    },
    {
      path: "/menus",
      component: () => import("./components/MenusDemo.vue"),
      children: [
        {
          path: "",
          component: () => import("./components/menu/PersonalDemo.vue"),
        },
        {
          path: "/menus/seat",
          component: () => import("./components/menu/SeatDemo.vue"),
        },
        {
          path: "/menus/payment",
          component: () => import("./components/menu/PaymentDemo.vue"),
        },
        {
          path: "/menus/confirmation",
          component: () => import("./components/menu/ConfirmationDemo.vue"),
        },
      ],
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("./components/MessagesDemo.vue"),
    },
    {
      path: "/charts",
      name: "charts",
      component: () => import("./components/ChartsDemo.vue"),
    },
    {
      path: "/misc",
      name: "misc",
      component: () => import("./components/MiscDemo.vue"),
    },
    {
      path: "/empty",
      name: "empty",
      component: () => import("./components/EmptyPage.vue"),
    },
    {
      path: "/documentation",
      name: "documentation",
      component: () => import("./components/Documentation.vue"),
    },
    {
      path: "/",
      name: "app",
      component: App,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: "/",
          name: "home",
          component: Home,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      beforeEnter: ifNotAuthenticated,
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
