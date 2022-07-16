<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref, onMounted } from "vue";
import { EM } from "@Assets/ts/mitt";
import { Fetch, FETCH_METHODS } from "@Assets/ts/fetch";

declare var THE_SERVER: any;

// [ COMPONENTS ]
import Table from "@Components/table/table.vue";
import Form from "./components/form.vue";

// [ TS ]
import { MaterialsClass } from "./materials";
import { TableClass } from "./ts/table";

// [ REF ]
const Materials = ref<MaterialsClass>(new MaterialsClass());
const TableInfo = ref<TableClass>(new TableClass());

// [ HOOKS ]
onMounted(async () => {
  const request: Request = Fetch.request(
    `${THE_SERVER.host}/material`,
    FETCH_METHODS.GET
  );

  try {
    const res = await fetch(request);
    const data = await res.json();

    TableInfo.value.materials = data.materials;

    return;
  } catch (e) {
    console.error(e);
  }

  EM.emit("ALERT", {
    color: "danger",
    message: "Hubo un problema con el servidor",
    status: true,
  });
});

// [ EVENTBUS ]
EM.emit("APP_H1", "Lista de Materiales");
</script>

<template lang="pug">
.materials
  .materials__table
    Table(
      :header="TableInfo.headers",
      :data="TableInfo.materials",
      @itemSelected="TableInfo.saveMaterialSelected($event)"
    )
  .materials__actions
    h2 {{ Materials.titleForm }}
    Form
</template>

<style lang="sass" scoped>
@import "./materials.sass"
</style>
