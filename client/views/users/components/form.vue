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
  await form.value.getRankList();
  form.value.getCountryList();
});

// [ EVENTBUS ]
EM.on("VIEW_USERS_FORM_userSelected", (user: Interfaces.TypeUser): void => {
  form.value.userSelected = user;

  form.value.name = user.name;
  form.value.surnameFirst = user.surnameFirst;
  form.value.surnameSecond = user.surnameSecond;
  form.value.address = user.address;
  form.value.city = user.city;
  form.value.country = user.country;
  form.value.notes = user.notes;
  form.value.rank = user["idRank"];
});

EM.on("VIEW_USERS_FORM_deleteUser", (user: Interfaces.TypeUser): void => {
  form.value.deleteUser(user);
});
</script>

<template lang="pug">
.form
  .form__controls
    .form__controls--new(@click="form.clearData()", v-show="form.userSelected")
      i.material-icons add
      span Nuevo Usuario

  Input(label="Nombre", :error="form.nameError", v-model="form.name")

  Input(
    label="Apellido Paterno",
    :error="form.surnameFirstError",
    v-model="form.surnameFirst"
  )

  Input(
    label="Apellido Materino",
    :error="form.surnameSecondError",
    v-model="form.surnameSecond"
  )

  Input(
    typeInput="password",
    label="Contraseña",
    :error="form.passwordError",
    v-model="form.password"
  )

  Select(
    :options="form.countryList",
    :initOption="{ label: 'Estado', value: '' }",
    label="Estado",
    :error="form.countryError",
    v-model="form.country"
  )

  Select(
    :options="form.cityList",
    :initOption="{ label: 'Municipio', value: '' }",
    label="Municipio",
    :error="form.cityError",
    v-model="form.city"
  )

  Input(
    typeInput="textarea",
    label="Dirección",
    :error="form.addressError",
    v-model="form.address"
  )

  Select(
    :options="form.rankList",
    :initOption="{ label: 'Rango', value: 0 }",
    label="Rango",
    :error="form.rankError",
    v-model="form.rank"
  )

  Input(
    typeInput="textarea",
    label="Notas",
    :error="form.notesError",
    v-model="form.notes"
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
