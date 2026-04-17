<template>
  <LayoutDialog v-model:open="isOpen" max-width="sm" :buttons="dialogButtons">
    <template #header>{{ t.projects.deleteDialog.title }}</template>
    <div class="flex flex-col gap-4 text-body-xs text-foreground">
      <div class="flex flex-col gap-2">
        <p>
          {{ t.projects.deleteDialog.confirmIntro }}
          <span class="font-medium">{{ t.projects.deleteDialog.permanentlyDelete }}</span>
          {{ t.projects.deleteDialog.confirmOutro.split('?')[0] }}
          <span class="font-medium">"{{ project.name }}"</span>?
          {{ t.projects.deleteDialog.cannot.charAt(0).toUpperCase() + t.projects.deleteDialog.cannot.slice(1) }}
          {{ t.projects.deleteDialog.beUndone }}
        </p>
        <CommonCard class="bg-foundation !py-4 text-body-2xs flex flex-row gap-y-2">
          <p>{{ modelText }}</p>
          <p>{{ versionsText }}</p>
        </CommonCard>
      </div>
      <div class="flex flex-col gap-2">
        <p>{{ t.projects.deleteDialog.typeToConfirm }}</p>
        <FormTextInput
          v-model="projectNameInput"
          name="projectNameConfirm"
          :label="t.projects.deleteDialog.projectNameLabel"
          size="lg"
          :placeholder="t.projects.deleteDialog.projectNamePlaceholder"
          full-width
          hide-error-message
          class="text-sm"
          color="foundation"
        />
      </div>
    </div>
  </LayoutDialog>
</template>

<script setup lang="ts">
import { LayoutDialog, type LayoutDialogButton } from '@speckle/ui-components'
import { useDeleteProject } from '~~/lib/projects/composables/projectManagement'
import { useMixpanel } from '~~/lib/core/composables/mp'
import { graphql } from '~~/lib/common/generated/gql'
import type {
  FullPermissionCheckResultFragment,
  ProjectsDeleteDialog_ProjectFragment
} from '~~/lib/common/generated/gql/graphql'

graphql(`
  fragment ProjectsDeleteDialog_Project on Project {
    id
    name
    role
    models(limit: 0) {
      totalCount
    }
    workspace {
      slug
      id
    }
    versions(limit: 0) {
      totalCount
    }
    permissions {
      canDelete {
        ...FullPermissionCheckResult
      }
    }
  }
`)

const props = defineProps<{
  open: boolean
  project: ProjectsDeleteDialog_ProjectFragment
  redirectOnComplete?: boolean
}>()

const isOpen = defineModel<boolean>('open', { required: true })

const { t } = useLocale()
const deleteProject = useDeleteProject()
const mixpanel = useMixpanel()

const projectNameInput = ref('')

const modelText = computed(
  () =>
    `${props.project.models.totalCount} ${
      props.project.models.totalCount === 1 ? t.value.projects.deleteDialog.model : t.value.projects.deleteDialog.models
    }`
)
const versionsText = computed(
  () =>
    `${props.project.versions.totalCount} ${
      props.project.versions.totalCount === 1 ? t.value.projects.deleteDialog.version : t.value.projects.deleteDialog.versions
    }`
)

const canDelete = computed((): FullPermissionCheckResultFragment => {
  if (projectNameInput.value !== props.project.name)
    return {
      authorized: false,
      code: 'NAME_MISMATCH',
      message: 'Entered project name does not match the actual project name'
    }

  return props.project.permissions.canDelete
})

const dialogButtons = computed<LayoutDialogButton[]>(() => [
  {
    text: t.value.projects.deleteDialog.cancel,
    props: { color: 'outline' },
    onClick: () => {
      isOpen.value = false
      projectNameInput.value = ''
    }
  },
  {
    text: t.value.projects.deleteDialog.delete,
    props: {
      color: 'danger',

      disabled: !canDelete.value.authorized
    },
    disabledMessage: canDelete.value.message,
    onClick: async () => {
      if (!canDelete.value.authorized) return

      const options = {
        goHome: props.redirectOnComplete,
        workspaceSlug: props.project.workspace?.slug
      }

      await deleteProject(props.project.id, options)
      isOpen.value = false
      mixpanel.track('Stream Action', {
        type: 'action',
        name: 'delete',
        // eslint-disable-next-line camelcase
        workspace_id: props.project.workspace?.id
      })
    }
  }
])

watch(
  () => isOpen.value,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      projectNameInput.value = ''
    }
  }
)
</script>
