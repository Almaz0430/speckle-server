<template>
  <CommonConfirmDialog
    v-model:open="open"
    :title="t.viewer.largeDataset.title"
    :confirm-text="t.viewer.largeDataset.confirm"
    @confirm="$emit('confirm')"
  >
    <div class="flex flex-col gap-3 text-body-xs">
      <p>
        This property has
        <span class="font-medium">{{ count?.toLocaleString() }}</span>
        {{ t.viewer.largeDataset.uniqueValues }}
      </p>
      <p>
        {{ t.viewer.largeDataset.warningText }}
        <span class="font-medium">{{ t.viewer.largeDataset.temporarily }}</span>
        {{ t.viewer.largeDataset.unresponsive }}
      </p>
      <p>{{ t.viewer.largeDataset.continueQuestion }}</p>
    </div>
  </CommonConfirmDialog>
</template>

<script setup lang="ts">
defineProps<{
  count?: number
}>()

defineEmits<{
  confirm: []
}>()

const { t } = useLocale()
const open = defineModel<boolean>('open', { required: true })
</script>
