<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref, computed } from "vue";
import type { ComputedRef } from "vue";
import * as Interfaces from "@TS/interfaces";

// [PROPS]
interface Props {
  header?: Array<Interfaces.TypeTableHeader>;
  data?: Array<Interfaces.TypeMaterial>;
  deleteIcon?: boolean;
  infoIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  header: [],
  data: [],
  deleteIcon: false,
  infoIcon: false,
});

// [ REF ]
const hideActions = ref<boolean>(false);
const searchInput = ref<string>("");

// [ EMITS ]
const emit = defineEmits([
  "itemSelected",
  "activeInfo",
  "activeDelete",
  "searchData",
]);

// [ COMPUTED ]
const hideActionsButton: ComputedRef = computed<string>((): string => {
  if (hideActions.value) return "Mostrar Acciones";
  return "Ocultar Acciones";
});

// [ METHODS ]
const selectItem = (data): void => {
  emit("itemSelected", data);
};
const activeInfo = (data): void => {
  emit("activeInfo", data);
};
const activeDelete = (data): void => {
  emit("activeDelete", data);
};
const searchData = (): void => {
  emit("searchData", searchInput.value);
};

const fixColumnsDataList = (row: Interfaces.TypeMaterial) => {
  const list = {};

  props.header.forEach((h) => {
    list[h.link] = row[h.link];
  });

  return list;
};

const searchDataKeyup = (event): void => {
  if (event.keyCode === 13) emit("searchData", searchInput.value);
};
</script>

<template lang="pug">
.table__controls
  button.table__controls--actions(
    v-if="deleteIcon === true || infoIcon === true",
    :class="{ 'table__controls--actions--hide': hideActions }",
    type="button",
    @click="hideActions = !hideActions"
  ) {{ hideActionsButton }}

  .table__controls--search
    input(
      type="text",
      placeholder="Buscar...",
      v-model="searchInput",
      @keyup="searchDataKeyup($event)"
    )
    i.material-icons(@click="searchData()") search
.table
  .table__header
    .table__header__item.table__header__item--actions(
      v-if="!hideActions && (deleteIcon === true || infoIcon === true)"
    ) Acciones
    .table__header__item(v-for="(item, index) in header", :key="index") {{ item.label }}
  .table__content
    .table__content__row(
      v-for="(row, index) in data",
      :key="index",
      @click="selectItem(row)"
    )
      .table__content__row__item.table__content__row__item--actions(
        v-if="!hideActions && (deleteIcon === true || infoIcon === true)"
      )
        i.material-icons.table__content__row__item--actions__info(
          v-if="infoIcon === true",
          v-on:click.stop="activeInfo(row)"
        ) info
        i.material-icons.table__content__row__item--actions__delete(
          v-if="deleteIcon === true",
          v-on:click.stop="activeDelete(row)"
        ) delete
      .table__content__row__item(
        v-for="(item, index) in fixColumnsDataList(row)",
        :key="index"
      ) {{ item }}
</template>

<style lang="sass" scoped>
@import "./table.sass"
</style>
