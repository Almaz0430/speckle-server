<template>
  <div>
    <ProjectPageSettingsBlock
      v-if="canLeaveProject.authorized"
      :auth-check="canLeaveProject"
      background
      :title="t.project.settings.generalSettings.leaveProject"
    >
      <p>
        {{ t.project.settings.generalSettings.leaveProjectDesc }}
      </p>
      <template #bottom-buttons>
        <FormButton
          color="danger"
          :disabled="!canLeaveProject.authorized"
          @click="showLeaveDialog = true"
        >
          {{ t.project.settings.generalSettings.leaveProject }}
        </FormButton>
      </template>
    </ProjectPageSettingsBlock>
    <ProjectPageSettingsGeneralBlockLeaveDialog
      v-if="canLeaveProject"
      v-model:open="showLeaveDialog"
      :project="project"
    />
  </div>
</template>

<script setup lang="ts">
import { graphql } from '~~/lib/common/generated/gql'
import type { ProjectPageSettingsGeneralBlockLeave_ProjectFragment } from '~~/lib/common/generated/gql/graphql'

const { t } = useLocale()

graphql(`
  fragment ProjectPageSettingsGeneralBlockLeave_Project on Project {
    id
    name
    role
    team {
      role
      user {
        ...LimitedUserAvatar
        role
      }
    }
    workspace {
      id
    }
    permissions {
      canLeave {
        ...FullPermissionCheckResult
      }
    }
  }
`)

const props = defineProps<{
  project: ProjectPageSettingsGeneralBlockLeave_ProjectFragment
}>()

const showLeaveDialog = ref(false)

const canLeaveProject = computed(() => props.project.permissions.canLeave)
</script>
