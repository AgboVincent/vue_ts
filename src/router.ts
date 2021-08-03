import {createRouter, createWebHistory} from "vue-router";
import Login from "./pages/Login.vue";
import Guest from "./components/layouts/Guest.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";
import PasswordReset from "./pages/PasswordReset.vue";
import PasswordResetSuccessful from "./pages/PasswordResetSuccessful.vue";

export const router = createRouter({
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
        }
    ]
})
