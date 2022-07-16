<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref } from "vue";
import * as Interfaces from "@TS/interfaces";

// [ PROPS ]

interface Props {
  typeInput?: string;
  label?: string;
  error?: string;
  cols?: number;
  rows?: number;
  options?: Array<Interfaces.SelectOptions>;
  initOption?: Interfaces.SelectOptions;
  modelValue;
}

const props = withDefaults(defineProps<Props>(), {
  typeInput: "text",
  label: "",
  error: "",
  cols: 20,
  rows: 5,
  options: [],
  initOption: { label: "vacio", value: "" },
});

// [ REF ]
const data = ref<string>("");

// [ EMITS ]
const emit = defineEmits(["update:modelValue"]);
</script>

<template lang="pug">
.input
  label {{ label }}

  input(
    v-if="typeInput === 'text' || typeInput === 'password' || typeInput === 'number'",
    :type="typeInput",
    :value="modelValue",
    @input="emit('update:modelValue', $event.target.value)"
  )

  textarea(
    v-else-if="typeInput === 'textarea'",
    :cols="cols",
    :rows="rows",
    :value="modelValue",
    @input="emit('update:modelValue', $event.target.value)"
  )

  select(
    v-else-if="typeInput === 'select'",
    @change="emit('update:modelValue', $event.target.value)"
  )
    option(:value="initOption.value") --{{ initOption.label }}--
    option(v-for="(item, index) in options", :key="index", :value="item.value") {{ item.label }}
  span {{ error }}
</template>

<style lang="sass" scoped>
@import "./input.sass"
</style>
