<template>
  <ProjectPageSettingsBlock background :title="t.project.settings.generalSettings.discussions" :auth-check="canUpdate">
    <template #introduction>
      <p class="text-body-xs text-foreground">
        {{ t.project.settings.generalSettings.commentsControl }}
      </p>
    </template>
    <FormRadioGroup
      v-model="selectedOption"
      :disabled="!canUpdate.authorized"
      :options="radioOptions"
      size="sm"
      @update:model-value="emitUpdate"
    />
  </ProjectPageSettingsBlock>
</template>

<script setup lang="ts">
import { UserGroupIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { FormRadioGroup } from '@speckle/ui-components'
import {
  castToSupportedVisibility,
  SupportedProjectVisibility
} from '~/lib/projects/helpers/visibility'
import { graphql } from '~~/lib/common/generated/gql'
import type { ProjectPageSettingsGeneralBlockDiscussions_ProjectFragment } from '~~/lib/common/generated/gql/graphql'

const { t } = useLocale()

graphql(`
  fragment ProjectPageSettingsGeneralBlockDiscussions_Project on Project {
    id
    visibility
    allowPublicComments
    permissions {
      canUpdateAllowPublicComments {
        ...FullPermissionCheckResult
      }
    }
  }
`)

const props = defineProps<{
  project: ProjectPageSettingsGeneralBlockDiscussions_ProjectFragment
}>()

const emit = defineEmits<{
  (event: 'update-comments-permission', value: boolean): void
}>()

enum CommentPermission {
  Anyone = 'anyone',
  TeamMembers = 'teamMembers'
}

const selectedOption = ref(
  props.project.allowPublicComments
    ? CommentPermission.Anyone
    : CommentPermission.TeamMembers
)

const canUpdate = computed(() => props.project.permissions.canUpdateAllowPublicComments)

const radioOptions = computed(() => [
  {
    value: CommentPermission.Anyone,
    title: t.project.settings.generalSettings.anyone,
    introduction: t.project.settings.generalSettings.anyoneDesc,
    icon: UserGroupIcon
  },
  {
    value: CommentPermission.TeamMembers,
    title: t.project.settings.generalSettings.collaboratorsOnly,
    introduction: t.project.settings.generalSettings.collaboratorsOnlyDesc,
    icon: UserCircleIcon,
    help:
      castToSupportedVisibility(props.project.visibility) !==
      SupportedProjectVisibility.Public
        ? t.project.settings.generalSettings.privateProjectComment
        : undefined
  }
])

watch(
  () => props.project.visibility,
  (newVisibility) => {
    if (
      castToSupportedVisibility(newVisibility) !== SupportedProjectVisibility.Public
    ) {
      selectedOption.value = CommentPermission.TeamMembers
    }
  },
  { immediate: true }
)

const emitUpdate = (value: CommentPermission) => {
  emit('update-comments-permission', value === CommentPermission.Anyone)
}
</script>
