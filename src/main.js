import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import '@/plugins/firebase';



const app = createApp(App);

import './index.css'
import './assets/icofont.min.css'
import './assets/swiper.css'


import { ObserveVisibility } from 'vue-observe-visibility'
app.directive('observe-visibility', ObserveVisibility)



app.use(router);
app.use(store);

app.mount("#app");
