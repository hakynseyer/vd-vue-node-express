<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref, onMounted } from "vue";
import { EM } from "@Assets/ts/mitt";
import { Fetch, FETCH_METHODS } from "@Assets/ts/fetch";

declare var THE_SERVER: any;

// [ COMPONENTS ]
import Table from "@Components/table/table.vue";

// [ REF ]
const headers = ref<Array<string>>([
  "id",
  "name",
  "description",
  "provider",
  "user",
  "rank",
  "amount",
  "um",
  "price",
]);
const materials = ref();
const materialSelected = ref();

// [ HOOKS ]
onMounted(async () => {
  const request: Request = Fetch.request(
    `${THE_SERVER.host}/material`,
    FETCH_METHODS.GET
  );

  try {
    const res = await fetch(request);
    const data = await res.json();

    const dataMap = data.materials.map((row) => {
      const dataJson = {};

      headers.value.forEach((header) => {
        switch (header) {
          case "provider":
            dataJson[header] = row.Provider.company;
            break;
          case "user":
            dataJson[
              header
            ] = `${row.Provider.User.name} ${row.Provider.User.surname_first} ${row.Provider.User.surname_second}`;
            break;
          case "rank":
            dataJson[header] = row.Provider.User.Rank.rank;
            break;
          default:
            dataJson[header] = row[header];
            break;
        }
      });

      return dataJson;
    });

    materials.value = dataMap;
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

// [ METHODS ]
const tableMaterial = (material) => {
  materialSelected.value = material;
};
</script>

<template lang="pug">
.materials
  span {{ materialSelected }}
  Table(:header="headers", :data="materials", @itemSelected="tableMaterial")
</template>

<style lang="sass" scoped>
@import "./materials.sass"
</style>
