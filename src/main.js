import {createApp} from 'vue';
import {createWebHistory, createRouter} from 'vue-router';

import App from './App.vue';
import Route from './components/Route';
import store from './store';

const routes = [
    {
        path: '/:catchAll(.*)',
        component: Route,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const path = to.path.replace(/^\/+|\/+$/g, '');
    store.dispatch('load', path)
        .then((result) => {
            if (result !== path) {
                next({
                    path: `/${result}`
                });
            } else {
                next();
            }
        })
        .catch(() => {
        });
});

createApp(App).use(router).mount('#app');
