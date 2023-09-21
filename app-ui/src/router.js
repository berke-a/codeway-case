import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '@/components/LoginComponent.vue';
import ConfigurationsTable from '@/components/ConfigurationsTable.vue';
import { auth } from './firebaseConfig';

const routes = [
    { path: '/login', component: LoginComponent },
    { path: '/configurations', component: ConfigurationsTable, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.path === '/') next('/login');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        auth.onAuthStateChanged(user => {
            if (user) {
                next();
            } else {
                next('/login');
            }
        });
    } else {
        next();
    }
});
export default router;
