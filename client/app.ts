import { createApp } from "vue";
import { router } from "@Assets/ts/router";
// import { createPinia } from 'pinia';
// import piniaPersist from 'pinia-plugin-persist';

import App from "./app.vue";

const app = createApp(App);

app.use(router);

// const pinia = createPinia();
// pinia.use(piniaPersist);
// app.use(pinia);

app.mount("#app");
