<template>
  <div>
    <ProjectPageSettingsBlock :auth-check="canDelete" background :title="t.project.settings.generalSettings.deleteProject">
      <div
        class="rounded border bg-foundation-page border-outline-3 text-body-xs text-foreground py-4 px-6"
      >
        {{ t.project.settings.generalSettings.deleteProjectDesc }}
      </div>
      <template #bottom-buttons>
        <FormButton
          color="danger"
          :disabled="!canDelete.authorized"
          @click="showDeleteDialog = true"
        >
          {{ t.project.settings.generalSettings.deleteProject }}
        </FormButton>
      </template>
    </ProjectPageSettingsBlock>
    <ProjectsDeleteDialog
      v-if="project"
      v-model:open="showDeleteDialog"
      redirect-on-complete
      :project="project"
    />
  </div>
</template>

<script setup lang="ts">
import { graphql } from '~~/lib/common/generated/gql'
import type { ProjectPageSettingsGeneralBlockDelete_ProjectFragment } from '~~/lib/common/generated/gql/graphql'

const { t } = useLocale()

graphql(`
  fragment ProjectPageSettingsGeneralBlockDelete_Project on Project {
    ...ProjectsDeleteDialog_Project
    permissions {
      canUpdate {
        ...FullPermissionCheckResult
      }
    }
  }
`)

const props = defineProps<{
  project: ProjectPageSettingsGeneralBlockDelete_ProjectFragment
}>()

const showDeleteDialog = ref(false)
const canDelete = computed(() => props.project.permissions.canUpdate)
</script>
