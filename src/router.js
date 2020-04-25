import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./components/Dashboard.vue";
import store from "./store";
// import App from "@/views/layouts/App";
// import Home from "@/views/home";
import Login from "@/views/auth/login";
import Register from "@/views/auth/register";
import Layout from "@/Layout";
Vue.use(Router);

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
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/",
      component: Layout,
      redirect: "/dashboard",
      children: [
        {
          name: "dashboard",
          path: "dashboard",
          component: Dashboard,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "sample",
          name: "sample",
          beforeEnter: ifAuthenticated,
          component: () => import("./components/SampleDemo.vue"),
        },
        {
          path: "forms",
          name: "forms",
          beforeEnter: ifAuthenticated,
          component: () => import("./components/FormsDemo.vue"),
        },
        {
          path: "data",
          name: "data",
          beforeEnter: ifAuthenticated,
          component: () => import("./components/DataDemo.vue"),
        },
        {
          path: "panels",
          name: "panels",
          beforeEnter: ifAuthenticated,
          component: () => import("./components/PanelsDemo.vue"),
        },
        {
          path: "overlays",
          name: "overlays",
          beforeEnter: ifAuthenticated,
          component: () => import("./components/OverlaysDemo.vue"),
        },
        {
          path: "menus",
          beforeEnter: ifAuthenticated,
          component: () => import("./components/MenusDemo.vue"),
          children: [
            {
              path: "",
              component: () => import("./components/menu/PersonalDemo.vue"),
            },
            {
              path: "menus/seat",
              component: () => import("./components/menu/SeatDemo.vue"),
            },
            {
              path: "menus/payment",
              component: () => import("./components/menu/PaymentDemo.vue"),
            },
            {
              path: "menus/confirmation",
              component: () => import("./components/menu/ConfirmationDemo.vue"),
            },
          ],
        },
        {
          path: "messages",
          name: "messages",
          beforeEnter: ifAuthenticated,
          component: () => import("./components/MessagesDemo.vue"),
        },
        {
          path: "charts",
          name: "charts",
          beforeEnter: ifAuthenticated,
          component: () => import("./components/ChartsDemo.vue"),
        },
        {
          path: "misc",
          name: "misc",
          beforeEnter: ifAuthenticated,
          component: () => import("./components/MiscDemo.vue"),
        },
        {
          path: "empty",
          name: "empty",
          beforeEnter: ifAuthenticated,
          component: () => import("./components/EmptyPage.vue"),
        },
        {
          path: "documentation",
          name: "documentation",
          beforeEnter: ifAuthenticated,
          component: () => import("./components/Documentation.vue"),
        },
      ],
    },
    // {
    //   path: "/",
    //   name: "app",
    //   component: App,
    //   beforeEnter: ifAuthenticated,
    //   children: [
    //     {
    //       path: "/",
    //       name: "home",
    //       component: Home,
    //     },
    //   ],
    // },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
