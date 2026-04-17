<template>
  <div class="flex flex-col space-y-6">
    <h2 class="text-xl">{{ t.settings.server.version }}</h2>
    <div class="flex items-center">
      <div class="w-[50%]">
        <p class="text-sm">
          <span class="font-medium">{{ t.settings.server.currentVersion }}</span>
          {{ currentVersion }}
        </p>
        <p v-if="!isLatestVersion" class="text-sm pt-2">{{ t.settings.server.newVersionAvailable }}</p>
      </div>
      <div class="flex justify-end w-[50%]">
        <FormButton
          color="outline"
          :disabled="isLatestVersion"
          @click="openGithubReleasePage"
        >
          {{ isLatestVersion ? t.settings.server.upToDate : `${t.settings.server.updateTo} ${latestVersion}` }}
        </FormButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { serverManagementDataQuery } from '~~/lib/server-management/graphql/queries'
import { useQuery } from '@vue/apollo-composable'
import { ref, computed } from 'vue'
const { t } = useLocale()

interface GithubRelease {
  url: string
  assets_url: string
  upload_url: string
  html_url: string
  id: number
  node_id: string
  tag_name: string
}

const logger = useLogger()
const { result } = useQuery(serverManagementDataQuery)

const latestVersion = ref<string | null>(null)

const currentVersion = computed(() => result.value?.serverInfo.version)
const isLatestVersion = computed(() => {
  return (
    !latestVersion.value ||
    currentVersion.value === latestVersion.value ||
    currentVersion.value === 'dev' ||
    currentVersion.value?.includes('alpha') ||
    currentVersion.value === 'N/A'
  )
})

const openGithubReleasePage = () => {
  // update link removed
}

async function getLatestVersion(): Promise<string | null> {
  try {
    const response: Response = await fetch(
      'https://api.github.com/repos/specklesystems/speckle-server/releases/latest'
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    } else {
      const data = (await response.json()) as GithubRelease
      return data.tag_name
    }
  } catch (err) {
    logger.error(err)
    return null
  }
}

latestVersion.value = await getLatestVersion()
</script>
