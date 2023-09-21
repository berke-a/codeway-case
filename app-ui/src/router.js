import { createRouter, createWebHistory } from 'vue-router';
import SigninComponent from '@/components/SigninComponent.vue';
import ConfigurationsTable from '@/components/ConfigurationsTable.vue';
import { auth } from './firebaseConfig';

const routes = [
    { path: '/signin', component: SigninComponent },
    { path: '/', component: ConfigurationsTable, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        auth.onAuthStateChanged(user => {
            if (user) {
                next();
            } else {
                next('/signin');
            }
        });
    } else {
        next();
    }
});
export default router;
