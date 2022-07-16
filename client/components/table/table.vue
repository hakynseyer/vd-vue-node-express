<script lang="ts" setup>
import { computed } from "vue";
import type { ComputedRef } from "vue";

// [PROPS]
interface Props {
  header?: Array<string>;
  data?: Array<any>;
}

const props = withDefaults(defineProps<Props>(), {
  header: [],
  data: [],
});

// [ EMITS ]
const emit = defineEmits(["itemSelected"]);

// [ METHODS ]
const selectItem = (data): void => {
  emit("itemSelected", data);
};
</script>

<template lang="pug">
.table
  .table__header
    .table__header__item(v-for="(item, index) in header", :key="index") {{ item.label }}
  .table__content
    .table__content__row(
      v-for="(row, index) in data",
      :key="index",
      @click="selectItem(row)"
    )
      .table__content__row__item(v-for="(item, index) in row", :key="index") {{ item }}
</template>

<style lang="sass">
@import "./table.sass"
</style>
