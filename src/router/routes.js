import app from '../api/firebase';
import { getFunctions, httpsCallable } from "firebase/functions";
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification , onAuthStateChanged} from "firebase/auth";
function loadPage(component){
    // '@' is aliased to src/components
    return () => import(/* webpackChunkName: "[request]" */
        `@/pages/${component}.vue`)}



function isStudent(to, from, next){
    console.log("Checking auth");
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            const functions = getFunctions(app);
            const checkEmail = httpsCallable(functions, 'checkEmail');
            checkEmail({"email" : user.email}).then((result) => {
                if(result.data.includes(user.email)){
                    return next();
                }else{
                    return next({path : '/'});
                }
            });
// ...
        } else {
// User is signed out
// Send them back to the home page or maybe the login page

            return next({path : '/'});
        }
    });
}

function isLandlord(to, from, next){
    console.log("Checking auth");
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            const functions = getFunctions(app);
            const checkEmail = httpsCallable(functions, 'checkEmail');
            checkEmail({"email" : user.email}).then((result) => {
                if(result.data.includes(user.email)){
                    return next({path : '/'});
                }else{
                    return next();
                }
            });
// ...
        } else {
// User is signed out
// Send them back to the home page or maybe the login page

            return next({path : '/'});
        }
    });
}


export default [
    { path: '/', component: loadPage('Home') },
    { path: '/StudentSignUp', component: loadPage('StudentSignUp') },
    { path: '/OwnerSignUp', component: loadPage('OwnerSignUp')},
    { path: '/StudentAccount', component: loadPage('StudentAccount'),beforeEnter: isStudent },
    { path: '/OwnerAccount', component: loadPage('OwnerAccount'),beforeEnter: isLandlord },
    {path: '/StudentLogin',component: loadPage('StudentLogin')},
    {path: '/OwnerLogin',component: loadPage('OwnerLogin')},
    {path: '/About',component: loadPage('About')},
    {path:'/Groups',component: loadPage('Groups')},
    {path:'/Search',component: loadPage('Search')}

]
