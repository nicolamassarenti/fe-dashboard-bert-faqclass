import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/HomeView.vue";
import KBView from "../views/KBView.vue";
import TrainingView from "../views/TrainingView.vue";
import AboutView from "../views/AboutView.vue";
import FaqDetailView from "../views/FaqDetailView.vue";
import NewFaqView from "../views/NewFaqView.vue";
import KeywordsView from "../views/KeywordsView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView
  },
  {
    path: "/kb",
    name: "Knowledge Base",
    component: KBView
  },
  {
    path: "/training",
    name: "Training",
    component: TrainingView
  },
  {
    path: "/about",
    name: "About",
    component: AboutView
  },
  {
    path: "/faq",
    name: "Faq details",
    component: FaqDetailView
  },
  {
    path: "/faq/new",
    name: "New faq",
    component: NewFaqView
  },
  {
    path: "/keyword",
    name: "Keywords",
    component: KeywordsView
  }
];

const router = new VueRouter({
  routes
});

export default router;
