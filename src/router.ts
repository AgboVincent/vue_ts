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
import Logout from "./pages/Logout.vue";
import Settings from './pages/settings/Index.vue'
import ProfileSetting from './pages/settings/Profile.vue'
import PasswordSetting from './pages/settings/Password.vue'
import CreateClaim from './pages/customers/CreateClaim.vue'
import Inspection from "./pages/Inspection.vue";
import Policies from "./pages/Policies.vue";
import InspectionDetail from "./pages/InspectionDetails.vue";
import Collection from "./pages/Collections.vue";
import CollectionDetails from "./pages/CollectionDetails.vue";

export const AuthMiddleware = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): void => {
    if (!Store.state.authenticated) {
        
        setInterval(() => {
            if(Store.state.authRequestFinished && Store.state.authenticated){
                return next();
            }else if(Store.state.authRequestFinished){
                return next({
                    path: '/login',
                    query: {
                        redirectTo: to.fullPath
                    }
                });
            }
        }, 100);
    }else{
        return next()
    }

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
        { path: '/logout', component: Logout },
        {
            path: '/',
            component: Guest,
            beforeEnter: GuestMiddleware,
            children: [
                {path: '/login', component: Login},
                {path: '/forgot-password', component: ForgotPassword},
                {path: '/password/reset', component: PasswordReset},
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
                },
                {
                    path: '/inspection',
                    component: Inspection
                },
                {
                    path: '/inspection/:detail',
                    component: InspectionDetail
                },
                {
                    path: '/policies',
                    component: Policies
                },
                {
                    path: '/customers/:policy/claims/create',
                    component: CreateClaim
                },
                {
                    path: '/collections',
                    component: Collection
                },
                {
                    path: '/collections/:id',
                    component: CollectionDetails,
                    name:'collectionsDetails',
                    props: true
                },
                {
                    path: 'settings',
                    redirect: '/settings/profile',
                    component: Settings,
                    children: [
                        {
                            path: 'profile',
                            component: ProfileSetting
                        },{
                            path: 'password',
                            component: PasswordSetting
                        }
                    ]
                }
            ]
        }
    ]
} as RouterOptions)
