<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref } from "vue";

// [ PROPS ]
interface Props {
  typeInput?: string;
  label?: string;
  error?: string;
  modelValue;
}

const props = withDefaults(defineProps<Props>(), {
  typeInput: "text",
  label: "",
  error: "",
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
    :type="typeInput",
    :value="modelValue",
    @input="emit('update:modelValue', $event.target.value)"
  )
  span {{ error }}
</template>

<style lang="sass" scoped>
@import "./input.sass"
</style>
