<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref, onMounted } from "vue";
import { EM } from "@Assets/ts/mitt";
import * as Interfaces from "@TS/interfaces";

// [ COMPONENTES ]
import Input from "@Components/input/input.vue";

// [ TYPESCRIPT ]
import { FormClass } from "./form";

// [ REF ]
const form = ref<FormClass>(new FormClass());

// [ HOOKS ]
onMounted(async () => {
  form.value.providerList = await form.value.getProviderList();
});

// [ EVENTBUS ]
EM.on(
  "VIEW_MATERIALS_FORM_materialSelected",
  (material: Interfaces.TypeMaterial): void => {
    form.value.materialSelected = material;

    form.value.name = material.name;
    form.value.description = material.description;
    form.value.amount = material.amount;
    form.value.um = material.um;
    form.value.price = Number(material.price);
    form.value.provider = material["idProvider"];
  }
);

EM.on(
  "VIEW_MATERIALS_FORM_deleteMaterial",
  (material: Interfaces.TypeMaterial): void => {
    form.value.deleteMaterial(material);
  }
);
</script>

<template lang="pug">
.form
  Input(label="Producto", :error="form.nameError", v-model="form.name")
  Input(
    typeInput="textarea",
    label="Descripción",
    :error="form.descriptionError",
    v-model="form.description"
  )
  Input(
    typeInput="number",
    label="Cantidad",
    :error="form.amountError",
    v-model="form.amount"
  )
  Input(
    typeInput="select",
    :options="form.umList",
    :initOption="{ label: 'Medida', value: '' }",
    label="Medida",
    :error="form.umError",
    v-model="form.um"
  )
  Input(
    typeInput="number",
    label="Precio",
    :error="form.priceError",
    v-model="form.price"
  )

  Input(
    typeInput="select",
    :options="form.providerList",
    :initOption="{ label: 'Proveedor', value: 0 }",
    label="Proveedor",
    :error="form.providerError",
    v-model="form.provider"
  )

  button.sendButton(
    type="button",
    @click="form.sendForm()",
    :disabled="form.enableSend"
  ) Enviar
</template>

<style lang="sass" scoped>
@import "./form.sass"
</style>
