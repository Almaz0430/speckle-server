<template>
  <div class="flex flex-col space-y-6">
    <SettingsSectionHeader :title="t.settings.profile.changePassword.title" subheading />
    <CommonCard class="text-body-xs bg-foundation">
      {{ t.settings.profile.changePassword.description }}
    </CommonCard>
    <div>
      <FormButton color="primary" @click="onClick">{{ t.settings.profile.changePassword.resetButton }}</FormButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { SettingsUserProfileChangePassword_UserFragment } from '~~/lib/common/generated/gql/graphql'
import { graphql } from '~~/lib/common/generated/gql'
import { usePasswordReset } from '~~/lib/auth/composables/passwordReset'

graphql(`
  fragment SettingsUserProfileChangePassword_User on User {
    id
    email
  }
`)

const { sendResetEmail } = usePasswordReset()
const { t } = useLocale()

const props = defineProps<{
  user: SettingsUserProfileChangePassword_UserFragment
}>()

const onClick = async () => {
  const email = props.user.email
  if (!email) return
  await sendResetEmail(email)
}
</script>
