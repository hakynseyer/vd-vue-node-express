<script lang="ts" setup>
// [ ESCENCIALES ]
import { ref, computed } from "vue";
import type { ComputedRef } from "vue";
import { EM } from "@Assets/ts/mitt";
import * as Interfaces from "@TS/interfaces";

// [ REF ]
const alertMessage = ref<string>("Este es el mensaje del alert");
const alertColor = ref<string>("normal");
const alertStatus = ref<boolean>(false);

// [ COMPUTED ]
const classAlert: ComputedRef = computed((): string => {
  return `alert--${alertColor.value}`;
});

// [ EVENTBUS ]
EM.on(
  "ALERT",
  ({ color, status, message, timer }: Interfaces.ALERT_DATA): void => {
    if (color !== undefined)
      if (color.length)
        if (alertColor.value !== color) alertColor.value = color;

    if (message !== undefined)
      if (message.length)
        if (alertMessage.value !== message) alertMessage.value = message;

    if (alertStatus.value !== status) alertStatus.value = status;

    if (timer !== undefined)
      setTimeout((): void => {
        alertStatus.value = false;
      }, timer);
  }
);
</script>

<template lang="pug">
.alert(:class="[classAlert]", v-if="alertStatus")
  span {{ alertMessage }}
</template>

<style lang="sass" scoped>
@import './alert.sass'
</style>
