function loadPage (component) {
// '@' is aliased to src/components
    return () => import(/* webpackChunkName: "[request]" */
        `@/Pages/${component}.vue`)}
export default [
    { path: '/', component: loadPage('Home') }
]
