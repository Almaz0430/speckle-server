<template>
  <Component
    :is="mainComponent"
    class="flex items-center shrink-0 select-none"
    :to="to"
    :target="target"
  >
    <div
      v-if="!minimal"
      class="text-sm mt-0 font-bold pl-2"
      :class="showTextOnMobile ? '' : 'hidden md:flex'"
    >
      <span class="text-foreground">Project</span><span class="text-blue-500">Manager</span>
    </div>
  </Component>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    minimal?: boolean
    to?: string
    showTextOnMobile?: boolean
    target?: string
    noLink?: boolean
  }>(),
  {
    to: '/'
  }
)

const NuxtLink = resolveComponent('NuxtLink')
const mainComponent = computed(() => (props.noLink ? 'div' : NuxtLink))
</script>
