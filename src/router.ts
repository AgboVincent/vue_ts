import {createRouter, createWebHistory, RouterOptions} from "vue-router";
import Login from "./pages/Login.vue";
import Guest from "./components/layouts/Guest.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";
import PasswordReset from "./pages/PasswordReset.vue";
import PasswordResetSuccessful from "./pages/PasswordResetSuccessful.vue";
import Authenticated from "./components/layouts/Authenticated.vue";

export const router = createRouter({
    linkActiveClass: 'active',
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/login'},
        {
            path: '/',
            component: Guest,
            children: [
                {path: '/login', component: Login},
                {path: '/forgot-password', component: ForgotPassword},
                {path: '/password-reset', component: PasswordReset},
                {path: '/password-reset-success', component: PasswordResetSuccessful}
            ]
        },
        {
            path: '/',
            component: Authenticated,
            children: [
                {
                    path: '/dashboard',
                    component: import('@/pages/Dashboard.vue')
                },
                {
                    path: '/claims',
                    component: import('@/pages/Claims.vue')
                },
                {
                    path: '/customers',
                    component: import('@/pages/Customers.vue')
                }
            ]
        }
    ]
} as RouterOptions)
