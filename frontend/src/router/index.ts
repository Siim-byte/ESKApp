// type Router = TypesConfig extends Record<"Router", infer T> ? T : _RouterClassic;

import {createRouter, createWebHistory} from "vue-router"

import SkateparksView from "../views/SkateparksView.vue"
import RegisterView from "../views/RegisterView.vue"
/*teiste vaadete impordid käivad siia ka*/
const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      redirect: "/skateparks"
    },
    {
      path: "/skateparks",
      name: "skateparks",
      component: SkateparksView
    },
    {
      path: "/register",
      name: "users",
      component: RegisterView
    }
  ]
})

export default router