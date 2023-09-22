import { createRouter, createWebHistory } from 'vue-router';
import SigninView from '@/views/SigninView.vue';
import ConfigurationsView from '@/views/ConfigurationsView.vue';
import { auth } from './firebaseConfig';

const routes = [
    { path: '/signin', component: SigninView },
    { path: '/', component: ConfigurationsView, meta: { requiresAuth: true } }
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
