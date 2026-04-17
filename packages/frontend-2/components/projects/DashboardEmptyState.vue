<template>
  <div class="flex justify-center flex-col text-center my-12">
    <h2 class="text-heading mt-2 text-foreground">
      {{ !canCreateProject ? t.projects.noProjects : t.projects.createFirst }}
    </h2>
    <h4 class="text-body-xs mb-4 mt-2 max-w-xs mx-auto text-foreground-2">
      {{ t.projects.projectsDescription }}
    </h4>
    <div class="flex flex-col items-center gap-2">
      <FormButton
        v-if="canCreateProject"
        color="outline"
        class="shadow-lg"
        @click="$emit('create-project')"
      >
        {{ t.projects.newProject }}
      </FormButton>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ canCreateProject: boolean | undefined }>()

defineEmits(['create-project'])
const { t } = useLocale()
</script>
