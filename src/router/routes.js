function loadPage (component) {
// '@' is aliased to src/components
    return () => import(/* webpackChunkName: "[request]" */
        `@/pages/${component}.vue`)}
export default [
    { path: '/account', component: loadPage('Account2') },
    { path: '/', component: loadPage('Account') },
]