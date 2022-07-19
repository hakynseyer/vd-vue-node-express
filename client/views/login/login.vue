<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref } from "vue";
import { EM } from "@Assets/ts/mitt";

// [ COMPONENTES ]
import Input from "@Components/input/input.vue";

// [ TYPESCRIPT ]
import { FormClass } from "./ts/form";

// [ REF ]
const form = ref<FormClass>(new FormClass());

// [ EVENTBUS ]
EM.emit("APP_h1", "Iniciar Sesión");
</script>

<template lang="pug">
.login
  .form
    Input(label="Usuario", :error="form.userError", v-model="form.user")
    Input(
      typeInput="password",
      label="Contraseña",
      :error="form.passwordError",
      v-model="form.password"
    )
    button.form__sendButton(type="button", @click="form.sendForm()") Enviar
</template>

<style lang="sass" scoped>
@import "@Assets/sass/form.sass", "./login.sass";
</style>
