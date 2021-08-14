import Vue from "vue";
import VueRouter from "vue-router";
import personalList from "../view/personalList/index.vue";
import programList from "../view/programList/index.vue";


Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/personalList"
  },
  {
    path: "/personalList",
    component: personalList
  },
  {
    path: "/programList",
    component: programList
  }
];
const router = new VueRouter({
  routes
});
export default router;
