<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref, onMounted } from "vue";
import { EM } from "@Assets/ts/mitt";
import * as Interfaces from "@TS/interfaces";

// [ COMPONENTES ]
import Input from "@Components/input/input.vue";
import Select from "@Components/select/select.vue";

// [ TYPESCRIPT ]
import { FormClass } from "./form";

// [ REF ]
const form = ref<FormClass>(new FormClass());

// [ HOOKS ]
onMounted(async () => {
  await form.value.getUserList();
});

// [ EVENTBUS ]
EM.on(
  "VIEW_PROVIDERS_FORM_providerSelected",
  (provider: Interfaces.TypeProvider): void => {
    form.value.providerSelected = provider;

    form.value.company = provider.company;
    form.value.description = provider.description;
    form.value.user = provider["idUser"];
  }
);

EM.on(
  "VIEW_PROVIDERS_FORM_deleteProvider",
  (provider: Interfaces.TypeProvider): void => {
    form.value.deleteProvider(provider);
  }
);
</script>

<template lang="pug">
.form
  .form__controls
    .form__controls--new(
      @click="form.clearData()",
      v-show="form.providerSelected"
    )
      i.material-icons add
      span Nuevo Proveedor

  Input(label="Proveedor", :error="form.companyError", v-model="form.company")

  Input(
    typeInput="textarea",
    label="Descripción",
    :error="form.descriptionError",
    v-model="form.description"
  )

  Select(
    :options="form.userList",
    :initOption="{ label: 'Usuario', value: 0 }",
    label="Usuario",
    :error="form.userError",
    v-model="form.user"
  )

  button.form__sendButton(
    type="button",
    @click="form.sendForm()",
    :disabled="form.enableSend"
  ) {{ form.titleSend }}
</template>

<style lang="sass" scoped>
@import "@Assets/sass/form.sass"
</style>
