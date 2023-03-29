import { createApp } from 'vue'
import App from './App.vue'
import{createRouter,createWebHistory}
    from 'vue-router';
import routes from './router/routes';
import './assets/main.css'


let router = createRouter({
    history: createWebHistory(),
    routes: routes
})

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
app.use(router);
app.use(vuetify);
app.mount('#app');
