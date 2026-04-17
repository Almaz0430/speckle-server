<template>
  <div>
    <template v-if="user">
      <div class="md:max-w-xl md:mx-auto pb-6 md:pb-0">
        <SettingsSectionHeader :title="t.settings.profile.title" :text="t.settings.profile.subtitle" />
        <SettingsUserProfileDetails :user="user" />
        <hr class="my-6 md:my-8 border-outline-2" />
        <SettingsUserProfileChangePassword :user="user" />
        <hr class="my-6 md:my-8 border-outline-2" />

        <!-- Language switcher -->
        <SettingsSectionHeader
          :title="t.settings.profile.language"
          :text="t.settings.profile.languageSubtitle"
          subheading
        />
        <div class="flex gap-2 mt-4">
          <FormButton
            :color="locale === 'en' ? 'primary' : 'outline'"
            @click="setLocale('en')"
          >
            {{ t.settings.profile.languageEn }}
          </FormButton>
          <FormButton
            :color="locale === 'ru' ? 'primary' : 'outline'"
            @click="setLocale('ru')"
          >
            {{ t.settings.profile.languageRu }}
          </FormButton>
        </div>

        <hr class="my-6 md:my-8 border-outline-2" />
        <SettingsUserProfileDeleteAccount :user="user" />
        <hr class="my-6 md:my-8 border-outline-2" />
        <div class="text-body-2xs text-foreground-2 w-full flex flex-col space-y-2">
          <div class="flex">
            {{ t.settings.profile.userId }}: #{{ user.id }}
            <ClipboardIcon
              class="w-4 h-4 ml-2 cursor-pointer hover:text-foreground transition"
              @click="copyUserId"
            />
          </div>
          <div v-if="distinctId" class="flex">
            {{ distinctId }}
            <ClipboardIcon
              class="w-4 h-4 ml-2 cursor-pointer hover:text-foreground transition"
              @click="copyDistinctId"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useActiveUser } from '~/lib/auth/composables/activeUser'
import { ClipboardIcon } from '@heroicons/vue/24/outline'
import { FormButton } from '@speckle/ui-components'

useHead({
  title: 'Settings - Profile'
})

definePageMeta({
  layout: 'settings'
})

const { distinctId, activeUser: user } = useActiveUser()
const { copy } = useClipboard()
const { t, locale, setLocale } = useLocale()

const copyUserId = () => {
  if (user.value) {
    copy(user.value.id)
  }
}

const copyDistinctId = () => {
  if (distinctId.value) {
    copy(distinctId.value)
  }
}
</script>
