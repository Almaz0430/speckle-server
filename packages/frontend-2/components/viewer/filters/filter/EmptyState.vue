<template>
  <div class="flex-1 flex flex-col gap-6 items-center justify-center">
    <IllustrationEmptystateFiltersTab />
    <div class="text-foreground-2 text-heading-sm mt-2">{{ t.viewer.panels.noFilters }}</div>
    <FormButton color="outline" @click="$emit('addFilter')">{{ t.viewer.panels.addNewFilter }}</FormButton>
  </div>
</template>

<script setup lang="ts">
import { FormButton } from '@speckle/ui-components'
import { useLocale } from '~/composables/useLocale'

defineEmits<{
  addFilter: []
}>()

const { t } = useLocale()
</script>
