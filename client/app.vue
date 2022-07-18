<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref } from "vue";
import { EM } from "@Assets/ts/mitt";
/* import * as Interfaces from '@TS/interfaces'; */

// [ COMPONENTES ]
/* import Header from '@Componentes/header/header.vue'; */
/* import Footer from '@Componentes/footer/footer.vue'; */
import Alert from "@Components/alert/alert.vue";

// [ REF ]
const h1 = ref<string>("");
/* const Alert = ref<Alert_Class>(new Alert_Class()); */

// [ EVENTBUS ]
EM.on("APP_h1", (title: string): void => {
  h1.value = title;
});
</script>

<template lang="pug">
// Header(titulo='Hakyn')
Alert
.content
  h1 {{ h1 }}
  router-view
//Footer(titulo='Hakyn')
</template>

<style lang="sass">
@import "@Assets/sass/init.sass";
</style>
