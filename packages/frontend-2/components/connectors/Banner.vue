<template>
  <div
    class="relative rounded-md overflow-hidden aspect-[896/405] max-h-[405px] w-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200 dark:border-blue-800"
  >
    <div class="absolute bottom-0 w-full p-6">
      <h3>{{ t.connectors.banner.title }}</h3>
      <p class="text-body-xs text-foreground-2 mt-2 max-w-md text-balance">
        {{ t.connectors.banner.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()
</script>
