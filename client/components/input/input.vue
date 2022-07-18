<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref, computed } from "vue";
import type { ComputedRef } from "vue";
import * as Interfaces from "@TS/interfaces";

// [ TYPESCRIPT ]
import { useClickOutside } from "@Assets/ts/clickOutside";

// [ PROPS ]
interface Props {
  typeInput?: string;
  label?: string;
  error?: string;
  cols?: number;
  rows?: number;
  modelValue?;
}

const props: Props = withDefaults(defineProps<Props>(), {
  typeInput: "text",
  label: "",
  error: "",
  cols: 20,
  rows: 5,
});

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

  span {{ error }}
</template>

<style lang="sass" scoped>
@import "@Assets/sass/form.sass"
</style>
