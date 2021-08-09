import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouterOptions} from "vue-router";
import Authenticated from "./components/layouts/Authenticated.vue";
import Login from "./pages/Login.vue";
import Guest from "./components/layouts/Guest.vue";
import ForgotPassword from "./pages/ForgotPassword.vue";
import PasswordReset from "./pages/PasswordReset.vue";
import PasswordResetSuccessful from "./pages/PasswordResetSuccessful.vue";
import Store from './store'
import Dashboard from "./pages/Dashboard.vue";
import Claims from "./pages/Claims.vue";
import Claim from "./pages/Claim.vue";
import Customers from "./pages/Customers.vue";

export const AuthMiddleware = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): void => {
    if (Store.state.authenticated) return next()
    return next({
        path: '/login',
        query: {
            redirectTo: to.fullPath
        }
    })
}

export const GuestMiddleware = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): void => {
    if (!Store.state.authenticated) return next()
    return next('/dashboard')
}

export const router = createRouter({
    linkActiveClass: 'active',
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/login'},
        {
            path: '/',
            component: Guest,
            beforeEnter: GuestMiddleware,
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
                    component: Dashboard
                },
                {
                    path: '/claims',
                    component: Claims
                },
                {
                    path: '/claims/:claim',
                    component: Claim
                },
                {
                    path: '/customers',
                    component: Customers
                }
            ]
        }
    ]
} as RouterOptions)
