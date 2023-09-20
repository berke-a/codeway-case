import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '@/components/LoginComponent.vue';
import ConfigurationsTable from '@/components/ConfigurationsTable.vue';
import store from './store';

const routes = [
  { path: '/login', component: LoginComponent },
  { path: '/configurations', component: ConfigurationsTable, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
