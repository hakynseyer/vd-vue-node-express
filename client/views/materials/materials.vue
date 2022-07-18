<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref, onMounted } from "vue";
import { EM } from "@Assets/ts/mitt";

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
  await TableInfo.value.listMaterials();
});

// [ EVENTBUS ]
EM.emit("APP_h1", "Materiales");
EM.on("VIEW_MATERIALS_titleForm", (title: string): void => {
  Materials.value.titleForm = title;
});
EM.on("VIEW_MATERIALS_updateTable", async (): Promise<void> => {
  await TableInfo.value.listMaterials();
});
</script>

<template lang="pug">
.materials
  .materials__table
    Table(
      :header="TableInfo.headers",
      :data="TableInfo.materials",
      :deleteIcon="true",
      @activeDelete="TableInfo.deleteMaterialSelected($event)",
      @itemSelected="TableInfo.saveMaterialSelected($event)",
      @searchData="TableInfo.searchMaterial($event)"
    )
  .materials__actions
    h2 {{ Materials.titleForm }}
    Form
</template>

<style lang="sass" scoped>
@import "./materials.sass"
</style>
