<template>
  <div class="flex flex-col gap-4">
    <ProjectPageSettingsBlock background :title="t.project.settings.generalSettings.projectInfo" :auth-check="canUpdate">
      <FormTextInput
        v-model="localProjectName"
        name="projectName"
        :label="t.project.settings.generalSettings.name"
        :placeholder="t.project.settings.generalSettings.name"
        show-label
        color="foundation"
        class="mb-2"
        :disabled="!canUpdate.authorized"
      />
      <FormTextArea
        v-model="localProjectDescription"
        name="projectDescription"
        :label="t.project.settings.generalSettings.description"
        :placeholder="t.project.settings.generalSettings.description"
        show-label
        show-optional
        color="foundation"
        :disabled="!canUpdate.authorized"
      />
      <template #bottom-buttons>
        <FormButton color="subtle" :disabled="!hasChanges" @click="resetLocalState">
          {{ t.projects.deleteDialog.cancel }}
        </FormButton>
        <FormButton :disabled="!hasChanges" @click="emitUpdate">{{ t.project.settings.generalSettings.projectInfo }}</FormButton>
      </template>
    </ProjectPageSettingsBlock>

    <LayoutDialog
      v-model:open="showConfirmDialog"
      max-width="md"
      :buttons="dialogButtons"
    >
      <template #header>{{ t.projects.deleteDialog.title }}</template>
      <div class="space-y-4">
        <p>{{ t.project.settings.generalSettings.projectInfo }}</p>
      </div>
    </LayoutDialog>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import {
  FormTextInput,
  FormTextArea,
  FormButton,
  LayoutDialog,
  type LayoutDialogButton
} from '@speckle/ui-components'
import type { ProjectPageSettingsGeneralBlockProjectInfo_ProjectFragment } from '~~/lib/common/generated/gql/graphql'
import type { RouteLocationRaw } from 'vue-router'
import { graphql } from '~~/lib/common/generated/gql'

const { t } = useLocale()

graphql(`
  fragment ProjectPageSettingsGeneralBlockProjectInfo_Project on Project {
    id
    name
    description
    permissions {
      canUpdate {
        ...FullPermissionCheckResult
      }
    }
  }
`)

const props = defineProps<{
  project: ProjectPageSettingsGeneralBlockProjectInfo_ProjectFragment
}>()

const emit = defineEmits(['update-project'])
const router = useRouter()

const targetRoute = ref<RouteLocationRaw | undefined>(undefined)
const localProjectName = ref(props.project.name)
const localProjectDescription = ref(props.project.description ?? '')
const showConfirmDialog = ref(false)

const canUpdate = computed(() => props.project.permissions.canUpdate)
const hasChanges = computed(() => {
  return (
    localProjectName.value !== props.project.name ||
    localProjectDescription.value !== props.project.description
  )
})

const emitUpdate = () => {
  emit('update-project', {
    name: localProjectName.value,
    description: localProjectDescription.value,
    onComplete: handleRedirection
  })
}

const handleRedirection = () => {
  showConfirmDialog.value = false
  resetLocalState()
  if (targetRoute.value) {
    router.push(targetRoute.value)
    targetRoute.value = undefined
  }
}

const resetLocalState = () => {
  localProjectName.value = props.project.name
  localProjectDescription.value = props.project.description ?? ''
  showConfirmDialog.value = false
}

const dialogButtons = computed<LayoutDialogButton[]>(() => [
  {
    text: t.project.settings.generalSettings.discardChanges,
    props: { color: 'outline' },
    onClick: handleRedirection
  },
  {
    text: t.project.settings.generalSettings.saveChanges,
    props: {
      submit: true
    },
    onClick: () => {
      showConfirmDialog.value = false
      emitUpdate()
    }
  }
])

watch(
  () => props.project,
  (newProject, oldProject) => {
    if (newProject.name !== oldProject.name) {
      localProjectName.value = newProject.name
    }
    if (newProject.description !== oldProject.description) {
      localProjectDescription.value = newProject.description ?? ''
    }
  },
  { deep: true }
)

onBeforeRouteLeave((to, from, next) => {
  if (hasChanges.value && !showConfirmDialog.value) {
    targetRoute.value = to
    showConfirmDialog.value = true
    next(false)
  } else {
    next()
  }
})
</script>
