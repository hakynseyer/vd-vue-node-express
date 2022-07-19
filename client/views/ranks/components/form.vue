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

// [ EVENTBUS ]
EM.on("VIEW_RANKS_FORM_rankSelected", (rank: Interfaces.TypeRank): void => {
  form.value.rankSelected = rank;

  form.value.rank = rank.rank;
  form.value.description = rank.description;
});

EM.on("VIEW_RANKS_FORM_deleteRank", (rank: Interfaces.TypeRank): void => {
  form.value.deleteRank(rank);
});
</script>

<template lang="pug">
.form
  .form__controls
    .form__controls--new(@click="form.clearData()", v-show="form.rankSelected")
      i.material-icons add
      span Nuevo Rango

  Input(label="Rango", :error="form.rankError", v-model="form.rank")

  Input(
    typeInput="textarea",
    label="Descripción",
    :error="form.descriptionError",
    v-model="form.description"
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
