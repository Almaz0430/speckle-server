<template>
  <ProjectPageSettingsBlock background :title="t.project.settings.generalSettings.access" :auth-check="canUpdate">
    <template #introduction>
      <p class="text-body-xs text-foreground">{{ t.project.settings.generalSettings.chooseAccess }}</p>
    </template>
    <FormRadioGroup
      v-model="selectedOption"
      :options="radioOptions"
      size="sm"
      :disabled="!canUpdate.authorized"
      @update:model-value="handleVisibilityChange"
    />

    <ProjectPageSettingsGeneralBlockAccessDialog
      v-model:open="showConfirmDialog"
      :current-visibility="currentVisibility"
      :new-visibility="pendingVisibility"
      :project-id="project.id"
      @confirm="confirmVisibilityChange"
      @cancel="cancelVisibilityChange"
    />
  </ProjectPageSettingsBlock>
</template>

<script setup lang="ts">
import {
  LockClosedIcon,
  GlobeAltIcon,
  BuildingOfficeIcon
} from '@heroicons/vue/24/outline'
import { FormRadioGroup } from '@speckle/ui-components'
import {
  castToSupportedVisibility,
  SupportedProjectVisibility
} from '~/lib/projects/helpers/visibility'
import { graphql } from '~~/lib/common/generated/gql'
import type { ProjectPageSettingsGeneralBlockAccess_ProjectFragment } from '~~/lib/common/generated/gql/graphql'

const { t } = useLocale()

graphql(`
  fragment ProjectPageSettingsGeneralBlockAccess_Project on Project {
    id
    visibility
    workspaceId
    permissions {
      canUpdate {
        ...FullPermissionCheckResult
      }
    }
  }
`)

const props = defineProps<{
  project: ProjectPageSettingsGeneralBlockAccess_ProjectFragment
}>()

const emit = defineEmits<{
  (e: 'update-visibility', v: SupportedProjectVisibility): void
}>()

const currentVisibility = computed(
  () =>
    castToSupportedVisibility(props.project.visibility) ||
    SupportedProjectVisibility.Private
)
const selectedOption = ref(currentVisibility.value)
const showConfirmDialog = ref(false)
const pendingVisibility = ref<SupportedProjectVisibility | null>(null)

const radioOptions = computed(() => [
  {
    value: SupportedProjectVisibility.Public,
    title: t.project.settings.generalSettings.public,
    introduction: t.project.settings.generalSettings.publicDesc,
    icon: GlobeAltIcon
  },
  ...(props.project.workspaceId
    ? [
        {
          value: SupportedProjectVisibility.Workspace,
          introduction: t.project.settings.generalSettings.workspaceDesc,
          title: t.project.settings.generalSettings.workspace,
          icon: BuildingOfficeIcon
        }
      ]
    : []),
  {
    value: SupportedProjectVisibility.Private,
    title: t.project.settings.generalSettings.private,
    introduction: t.project.settings.generalSettings.privateDesc,
    icon: LockClosedIcon
  }
])

const canUpdate = computed(() => props.project.permissions.canUpdate)

const handleVisibilityChange = (newVisibility: SupportedProjectVisibility) => {
  const current = currentVisibility.value
  const shouldShowConfirmDialog =
    current === SupportedProjectVisibility.Public &&
    (newVisibility === SupportedProjectVisibility.Workspace ||
      newVisibility === SupportedProjectVisibility.Private)

  if (shouldShowConfirmDialog) {
    pendingVisibility.value = newVisibility
    showConfirmDialog.value = true
    selectedOption.value = current
  } else {
    emit('update-visibility', newVisibility)
  }
}

const confirmVisibilityChange = () => {
  if (pendingVisibility.value) {
    selectedOption.value = pendingVisibility.value
    emit('update-visibility', pendingVisibility.value)
    pendingVisibility.value = null
  }
  showConfirmDialog.value = false
}

const cancelVisibilityChange = () => {
  selectedOption.value = currentVisibility.value
  pendingVisibility.value = null
  showConfirmDialog.value = false
}

watch(
  () => props.project.visibility,
  (newVal) => {
    selectedOption.value =
      castToSupportedVisibility(newVal) || SupportedProjectVisibility.Private
  }
)
</script>
