import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.css'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import 'primeflex/primeflex.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import Button from "primevue/button"
import Card from "primevue/card"
import Column from "primevue/column"
import DataTable from "primevue/datatable"
import Dialog from "primevue/dialog"
import Dropdown from "primevue/dropdown"
import InputText from "primevue/inputtext"
import Menu from "primevue/menu"
import Row from "primevue/row"
import Sidebar from "primevue/sidebar"
import Tag from "primevue/tag"
import Textarea from "primevue/textarea"
import Toast from "primevue/toast"
import Toolbar from "primevue/toolbar"
import Rating from "primevue/rating"

createApp(App)
    .use(PrimeVue, { ripple: true })
    .use(router)
    .use(createPinia())
    .use(ToastService)
    .component("pv-button", Button)
    .component("pv-card", Card)
    .component("pv-column", Column)
    .component("pv-data-table", DataTable)
    .component("pv-dialog", Dialog)
    .component("pv-dropdown", Dropdown)
    .component("pv-input-text", InputText)
    .component("pv-menu", Menu)
    .component("pv-row", Row)
    .component("pv-sidebar", Sidebar)
    .component("pv-tag", Tag)
    .component("pv-textarea", Textarea)
    .component("pv-toast", Toast)
    .component("pv-toolbar", Toolbar)
    .component("pv-rating", Rating)
    .mount('#app')