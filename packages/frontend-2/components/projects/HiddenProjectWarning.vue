<template>
  <CommonCard class="mb-4 bg-foundation text-body-xs !py-4">
    <p class="text-foreground">
      <span class="font-medium">
        {{ t.projects.hiddenProjects.title.replace('{count}', hiddenItemCount.toString()) }}
      </span>
      {{ t.projects.hiddenProjects.description.replace('{pronoun}', hiddenItemCount === 1 ? 'it' : 'them') }}
    </p>
    <div class="flex flex-wrap gap-2 mt-2">
      <FormButton
        v-for="session in user.expiredSsoSessions"
        :key="session.id"
        size="sm"
        :to="workspaceSsoRoute(session.slug)"
        color="outline"
      >
        <div class="flex items-center gap-1">
          <WorkspaceAvatar size="2xs" :name="session.name" :logo="session.logo" />
          {{ session.name }}
        </div>
      </FormButton>
    </div>
  </CommonCard>
</template>

<script setup lang="ts">
import { graphql } from '~~/lib/common/generated/gql'
import type { ProjectsHiddenProjectWarning_UserFragment } from '~~/lib/common/generated/gql/graphql'
import { workspaceSsoRoute } from '~/lib/common/helpers/route'

const { t } = useLocale()

graphql(`
  fragment ProjectsHiddenProjectWarning_User on User {
    id
    expiredSsoSessions {
      id
      slug
      name
      logo
    }
  }
`)

defineProps<{
  hiddenItemCount: number
  user: ProjectsHiddenProjectWarning_UserFragment
}>()
</script>
