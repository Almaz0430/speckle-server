<template>
  <div>
    <div class="flex flex-col space-y-6">
      <SettingsSectionHeader :title="t.settings.profile.deleteAccount.title" subheading />
      <CommonCard class="text-body-xs bg-foundation">
        {{ t.settings.profile.deleteAccount.description }}
      </CommonCard>
      <div>
        <FormButton @click="toggleDeleteDialog">{{ t.settings.profile.deleteAccount.deleteButton }}</FormButton>
      </div>
    </div>

    <SettingsUserProfileDeleteAccountDialog
      v-model:open="showDeleteDialog"
      :user="user"
    />
  </div>
</template>

<script setup lang="ts">
import type { SettingsUserProfileDeleteAccount_UserFragment } from '~~/lib/common/generated/gql/graphql'

defineProps<{
  user: SettingsUserProfileDeleteAccount_UserFragment
}>()

const { t } = useLocale()
const showDeleteDialog = ref(false)

function toggleDeleteDialog() {
  showDeleteDialog.value = true
}
</script>
