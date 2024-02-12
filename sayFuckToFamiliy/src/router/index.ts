import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'mainMemu',
      component: () => import("@/views/mainManu.vue")
    },
    {
      path: "/game",
      name: "game",
      component: () => import("@/views/sayNoToFamily.vue")
    },
    {
      path: "/end",
      name: "end",
      component: ()=> import("@/components/gameOver.vue")
    },
    {
      path: "/thanks",
      name: "thanks",
      component: ()=> import("@/views/thanks.vue")
    }
  ]
})

export default router
