import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Button from "primevue/button"
import InputText from "primevue/inputtext"
import ToastService from 'primevue/toastservice';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    options: {
        darkModeSelector: 'none',
    }
});

app.use(ToastService)

app.component('Button', Button)
app.component('InputText', InputText)

app.mount('#app')
