import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouterOptions} from "vue-router";
import Authenticated from "./components/layouts/Authenticated.vue";
import Login from "./pages/Login.vue";
import Guest from "./components/layouts/Guest.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";
import PasswordReset from "./pages/PasswordReset.vue";
import PasswordResetSuccessful from "./pages/PasswordResetSuccessful.vue";
import Store from './store'

export const AuthMiddleware = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): void => {
    if (Store.state.authenticated) return next()
    return next({
        name: 'Login',
        query: {
            redirectTo: to.fullPath
        }
    })
}

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
            beforeEnter: AuthMiddleware,
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
