<template>
  <div><NuxtPage /></div>
</template>
<script setup lang="ts">
import type { ProjectPageProjectFragment } from '~~/lib/common/generated/gql/graphql'

const { t } = useLocale()

definePageMeta({
  middleware: ['auth', 'require-valid-automation']
})

const attrs = useAttrs() as {
  project: ProjectPageProjectFragment
}

const projectName = computed(() =>
  attrs.project?.name?.length ? attrs.project.name : ''
)

useHead({
  title: computed(() => `${t.project.tabs.automations} | ${projectName.value}`)
})
</script>
