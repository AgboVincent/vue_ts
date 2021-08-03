import {createRouter, createWebHistory} from "vue-router";
import Login from "./pages/Login.vue";
import Guest from "./components/layouts/Guest.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/login'},
        {
            path: '/',
            component: Guest,
            children: [
                {path: '/login', component: Login},
                {path: '/forgot-password', component: ForgotPassword}
            ]
        }
    ]
})
