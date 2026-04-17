<template>
  <div class="flex flex-col gap-4">
    <WorkspaceMoveProjectSelectWorkspace
      :project="undefined"
      :checker="(w) => w.permissions.canCreateProject"
      :subheading="t.projects.addDialog.workspaceSubheading"
      @workspace-selected="onWorkspaceSelected"
    />
    <FormButton color="outline" full-width @click="navigateTo(workspaceCreateRoute)">
      {{ t.projects.addDialog.createWorkspace }}
    </FormButton>
  </div>
</template>
<script setup lang="ts">
import type { WorkspaceMoveProjectSelectWorkspace_WorkspaceFragment } from '~/lib/common/generated/gql/graphql'
import { workspaceCreateRoute } from '~/lib/common/helpers/route'

const { t } = useLocale()

const emit = defineEmits<{
  'workspace-selected': [WorkspaceMoveProjectSelectWorkspace_WorkspaceFragment]
  canceled: []
}>()

const onWorkspaceSelected = (
  workspace: WorkspaceMoveProjectSelectWorkspace_WorkspaceFragment
) => {
  emit('workspace-selected', workspace)
}
</script>
