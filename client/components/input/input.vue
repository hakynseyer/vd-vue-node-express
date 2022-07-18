<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref, computed } from "vue";
import type { ComputedRef } from "vue";
import * as Interfaces from "@TS/interfaces";

// [ PROPS ]
interface Props {
  typeInput?: string;
  label?: string;
  error?: string;
  cols?: number;
  rows?: number;
  options?: Array<Interfaces.TypeSelectOptions>;
  initOption?: Interfaces.TypeSelectOptions;
  modelValue?;
}

const props: Props = withDefaults(defineProps<Props>(), {
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
const activeSelectOptions = ref<boolean>(false);

// [ COMPUTED ]
const selectInputLabel: ComputedRef = computed<string>((): string => {
  let data = `--${props.initOption.label}--`;

  if (props.options !== null)
    props.options.forEach((opt: Interfaces.TypeSelectOptions) => {
      if (opt.value === props.modelValue) data = opt.label;
    });

  return data;
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

  template(v-else-if="typeInput === 'select'")
    .input__select(@click="activeSelectOptions = !activeSelectOptions")
      span {{ selectInputLabel }}
      i.material-icons expand_more
      ul.input__select__options(v-show="activeSelectOptions")
        li(
          v-for="(item, index) in options",
          :key="index",
          @click="emit('update:modelValue', item.value)"
        ) {{ item.label }}

  select(
    v-else-if="typeInput === 'select2'",
    @change="emit('update:modelValue', $event.target.value)"
  )
    option(:value="initOption.value") --{{ initOption.label }}--
    option(v-for="(item, index) in options", :key="index", :value="item.value") {{ item.label }}
  span {{ error }}
</template>

<style lang="sass" scoped>
@import "./input.sass"
</style>
