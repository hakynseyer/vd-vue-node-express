<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref, onMounted } from "vue";
import { EM } from "@Assets/ts/mitt";

// [ COMPONENTS ]
import Table from "@Components/table/table.vue";
import Form from "./components/form.vue";

// [ TS ]
import { ProvidersClass } from "./providers";
import { TableClass } from "./ts/table";

// [ REF ]
const Providers = ref<ProvidersClass>(new ProvidersClass());
const TableInfo = ref<TableClass>(new TableClass());

// [ HOOKS ]
onMounted(async () => {
  await TableInfo.value.listProviders();
});

// [ EVENTBUS ]
EM.emit("APP_h1", "Proveedores");
EM.on("VIEW_PROVIDERS_titleForm", (title: string): void => {
  Providers.value.titleForm = title;
});
EM.on("VIEW_PROVIDERS_updateTable", async (): Promise<void> => {
  await TableInfo.value.listProviders();
});
</script>

<template lang="pug">
.providers
  .providers__table
    Table(
      :header="TableInfo.headers",
      :data="TableInfo.providers",
      :deleteIcon="true",
      @activeDelete="TableInfo.deleteProviderSelected($event)",
      @itemSelected="TableInfo.saveProviderSelected($event)",
      @searchData="TableInfo.searchProvider($event)"
    )
  .providers__actions
    h2 {{ Providers.titleForm }}
    Form
</template>

<style lang="sass" scoped>
@import "./providers.sass"
</style>
