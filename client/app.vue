<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref } from "vue";
import { EM } from "@Assets/ts/mitt";
/* import * as Interfaces from '@TS/interfaces'; */

// [ COMPONENTES ]
/* import Header from '@Componentes/header/header.vue'; */
/* import Footer from '@Componentes/footer/footer.vue'; */
/* import { Alert_Class } from '@TS/ref/alert'; */

// [ REF ]
const h1 = ref<string>("");
/* const Alert = ref<Alert_Class>(new Alert_Class()); */

// [ EVENTBUS ]
EM.on("APP_H1", (title: string): void => {
  h1.value = title;
});
/* EM.on( */
/*   'LOGIN_alert', */
/*   ({ color, activar, mensaje, timer }: Interfaces.InterAlert): void => { */
/*     if (color !== undefined) */
/*       if (color.length) */
/*         if (Alert.value.color !== color) Alert.value.color = color; */

/*     if (mensaje !== undefined) */
/*       if (mensaje.length) */
/*         if (Alert.value.mensaje !== mensaje) Alert.value.mensaje = mensaje; */

/*     if (Alert.value.activar !== activar) Alert.value.activar = activar; */

/*     if (timer !== undefined) */
/*       setTimeout((): void => { */
/*         Alert.value.activar = false; */
/*       }, timer); */
/*   } */
/* ); */
</script>

<template lang="pug">
// Header(titulo='Hakyn')
// va-alert.alert(:color='Alert.color', v-model='Alert.activar') {{ Alert.mensaje }}
.contenido
  h1 {{ h1 }}
  router-view
//Footer(titulo='Hakyn')
</template>

<style lang="sass">
@import "@Assets/sass/init.sass";
</style>
