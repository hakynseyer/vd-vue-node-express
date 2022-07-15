<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref } from "vue";
import { EM } from "@Assets/ts/mitt";

// [ TYPESCRIPT ]
/* import { Tecnologias_Class } from './ts/tecnologias'; */

// [ REF ]
/* const Tecnologias = ref<Tecnologias_Class>(new Tecnologias_Class()); */

// [ EVENTBUS ]
EM.emit("APP_H1", "Test de habilidades Vue-Node-Express");
</script>

<template lang="pug">
.notice-home
  p Este es un framework Web construido con amor y pasión por la tecnología en general... Fue construido para ahorrar tiempos en la construcción de webs tanto SPA como SSR, por lo que cumple los objetivos iniciales planteados.

  p El core del framework es PHP por lo que podría decirse que es un framework PHP; no obstante, se plantea en un futuro la integración de otras tecnologias para adaptarse a casos particulares en la solución de ideas informaticas.
</template>

<style lang="sass" scope>
@import "./home.sass";
</style>
