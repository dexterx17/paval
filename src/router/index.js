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
        requiresAuth: true,
      },
      component: () => import("../views/game/Dashboard.vue"),
    },
    {
      path: "/partidos",
      name: "partidos",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/game/partidos/PartidosList.vue"),
    },
    {
      path: "/partido/:id",
      name: "partido",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/game/partidos/PartidoView.vue"),
    },
    {
      path: "/clubs",
      name: "clubs",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/game/clubs/ClubsList.vue"),
    },
    {
      path: "/club/:id",
      name: "club",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/game/clubs/ClubView.vue"),
    },
    {
      path: "/torneos",
      name: "torneos",
      component: () => import("../views/game/torneos/TorneosList.vue"),
    },
    {
      path: "/torneo/:id",
      name: "torneo",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/game/torneos/TorneoView.vue"),
    },
    {
      path: "/players",
      name: "players",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/game/players/PlayersList.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/game/players/PlayerProfile.vue"),
    },
    {
      path: "/contactos",
      name: "contactos",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "error-404",
      component: () => import("../views/ErrorView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  console.log('currentUser');
  console.log(currentUser);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log('requiresAuth',requiresAuth);
  console.log('!currentUser',(!currentUser));
  console.log('to',to);
  
  //if (requiresAuth && !currentUser) next('login');
  // else if (!requiresAuth && currentUser) next('dashboard');
  //else next();
  next();
});

export default router;
