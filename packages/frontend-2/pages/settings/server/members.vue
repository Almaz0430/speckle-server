<template>
  <section>
    <div class="md:max-w-5xl md:mx-auto pb-6 md:pb-0">
      <SettingsSectionHeader
        :title="t.settings.server.members.title"
        :text="t.settings.server.members.subtitle"
        hide-divider
      />

      <div class="mt-6">
        <LayoutTabsHorizontal v-model:active-item="activeTab" :items="tabItems">
          <template #default="{ activeItem }">
            <SettingsServerActiveUsers v-if="activeItem.id === 'members'" />
            <SettingsServerPendingInvitations v-if="activeItem.id === 'invites'" />
          </template>
        </LayoutTabsHorizontal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { LayoutPageTabItem } from '~~/lib/layout/helpers/components'
import {
  getInvitesCountQuery,
  getUsersCountQuery
} from '~~/lib/server-management/graphql/queries'
import { useQuery } from '@vue/apollo-composable'

definePageMeta({
  layout: 'settings'
})

useHead({
  title: 'Settings | Server - Members'
})

const { t } = useLocale()
const { result: invitesResult } = useQuery(getInvitesCountQuery)
const { result: usersResult } = useQuery(getUsersCountQuery)

const tabItems = computed<LayoutPageTabItem[]>(() => [
  {
    title: t.value.settings.server.members.membersTab,
    id: 'members',
    count: usersResult.value?.admin?.userList?.totalCount
  },
  {
    title: t.value.settings.server.members.pendingInvites,
    id: 'invites',
    count: invitesResult.value?.admin?.inviteList?.totalCount
  }
])

const activeTab = ref(tabItems.value[0])
</script>
