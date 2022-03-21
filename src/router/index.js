import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getAuth } from "firebase/auth";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: {
        requiresAuth: true
      },
      component: () => import("../views/game/Dashboard.vue"),
    },
    {
      path: "/partidos",
      name: "partidos",
      meta: {
        requiresAuth: true
      },
      component: () => import("../views/game/PartidosView.vue"),
    },
  ]
});

router.beforeEach((to, from, next) => {
  // const auth = getAuth();
  // const currentUser = auth.currentUser;
  // console.log('currentUser');
  // console.log(currentUser);
  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // if (requiresAuth && !currentUser) next('login');
  // else if (!requiresAuth && currentUser) next('dashboard');
  //else next();
  next();
});

export default router;
