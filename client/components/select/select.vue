<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref, computed } from "vue";
import type { ComputedRef } from "vue";
import * as Interfaces from "@TS/interfaces";

// [ TYPESCRIPT ]
import { useClickOutside } from "@Assets/ts/clickOutside";

// [ PROPS ]
interface Props {
  label?: string;
  error?: string;
  options?: Array<Interfaces.TypeSelectOptions>;
  initOption?: Interfaces.TypeSelectOptions;
  modelValue?;
}

const props: Props = withDefaults(defineProps<Props>(), {
  label: "",
  error: "",
  options: [],
  initOption: { label: "vacio", value: "" },
});

// [ REF ]
const activeSelectOptions = ref<boolean>(false);
const optionsRef = ref(null);

// [ COMPUTED ]
const selectInputLabel: ComputedRef = computed<string>((): string => {
  let data = `--${props.initOption.label}--`;

  if (props.options !== null)
    props.options.forEach((opt: Interfaces.TypeSelectOptions) => {
      if (opt.value === props.modelValue) data = opt.label;
    });

  return data;
});

// [ COMPOSABLES ]
useClickOutside(optionsRef, "select", `select_${props.label}`, () => {
  if (activeSelectOptions.value) {
    activeSelectOptions.value = false;
  }
});

// [ EMITS ]
const emit = defineEmits(["update:modelValue"]);
</script>

<template lang="pug">
.input(:id="'select_' + label")
  label {{ label }}

  .input__select(@click="activeSelectOptions = !activeSelectOptions")
    span {{ selectInputLabel }}
    i.material-icons expand_more
    ul.input__select__options(v-show="activeSelectOptions", ref="optionsRef")
      li(
        v-for="(item, index) in options",
        :key="index",
        @click="emit('update:modelValue', item.value)"
      ) {{ item.label }}

  span {{ error }}
</template>

<style lang="sass" scoped>
@import "@Assets/sass/form.sass", "./select.sass"
</style>
