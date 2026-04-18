<template>
  <ProjectPageCollaborators />
</template>

<script setup lang="ts">
import type { ProjectPageProjectFragment } from '~~/lib/common/generated/gql/graphql'

const { t } = useLocale()

const attrs = useAttrs() as {
  project: ProjectPageProjectFragment
}

const projectName = computed(() =>
  attrs.project?.name?.length ? attrs.project.name : ''
)

useHead({
  title: computed(() => `${t.project.tabs.collaborators} | ${projectName.value}`)
})
</script>
