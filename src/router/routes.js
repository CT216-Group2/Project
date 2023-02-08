function loadPage(component){
    // '@' is aliased to src/components
    return () => import(/* webpackChunkName: "[request]" */
        `@/pages/${component}.vue`)}
export default [
    { path: '/', component: loadPage('Home') },
    { path: '/StudentSignUp', component: loadPage('StudentSignUp') },
    { path: '/OwnerSignUp', component: loadPage('OwnerSignUp')},
    { path: '/StudentAccount', component: loadPage('StudentAccount') },
    { path: '/OwnerAccount', component: loadPage('OwnerAccount') },
]
