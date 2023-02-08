import { createApp } from 'vue'
import App from './App.vue'

import "./assets/main.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

import { createRouter, createWebHistory }
    from 'vue-router';
import routes from './router/routes';
let router = createRouter({
    history: createWebHistory(),
    routes: routes
});
const app = createApp(App)
app.use(router);
app.use(vuetify);
app.mount('#app');

