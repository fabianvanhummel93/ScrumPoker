import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.base),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: () => import("../views/Welcome.vue"),
    },
    {
      path: "/game:sessionId",
      name: "game",
      component: () => import("../views/GameView.vue"),
    },
    {
      path: "/join:sessionId",
      name: "join",
      component: () => import("../views/JoinGame.vue"),
    },
  ],
});

export default router;
