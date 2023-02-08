function loadPage (component) {
// '@' is aliased to src/components
    return () => import(/* webpackChunkName: "[request]" */
        `@/Pages/${component}.vue`)}
export default [
    { path: '/StudentSignUp', component: loadPage('StudentSignUp') },
    { path: '/OwnerSignUp', component: loadPage('OwnerSignUp')},
    { path: '/HelloWorld', component: loadPage('HelloWorld')}
]