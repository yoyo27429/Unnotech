import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import _id from "@/views/Books/_id.vue";
import detailHome from "@/views/Books/detailHome.vue"

const routes = [
  {
    path: "",
    name: "Home",
    component: Home,
  },
  {
    path: "/books",
    name: "Books",
    component: () => import("../views/Books/index.vue"),
    children: [
      {
        path: "",
        component: detailHome,
      },
      {
        path: ":id",
        component: _id,
      },
    ],
  },
  {},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
