<template>
  <section>
    <div class="md:max-w-xl md:mx-auto">
      <SettingsSectionHeader
        :title="t.settings.emails.title"
        :text="t.settings.emails.subtitle"
      />
      <SettingsSectionHeader :title="t.settings.emails.yourEmails" subheading />
      <SettingsUserEmailList />
      <hr class="my-6 md:my-8 border-outline-2" />
      <SettingsSectionHeader :title="t.settings.emails.addNew" subheading />
      <div class="flex flex-col md:flex-row w-full pt-4 md:pt-6 pb-6">
        <div class="flex flex-col md:flex-row gap-x-2 w-full">
          <FormTextInput
            v-model="email"
            color="foundation"
            label-position="left"
            :label="t.settings.emails.emailAddress"
            name="email"
            :rules="[isEmail, isRequired]"
            :placeholder="t.settings.emails.emailPlaceholder"
            show-label
            wrapper-classes="flex-1 py-3 md:py-0 w-full"
          />
          <FormButton @click="onAddEmailSubmit">{{ t.settings.emails.addButton }}</FormButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { isEmail, isRequired } from '~~/lib/common/helpers/validation'
import { useUserEmails } from '~/lib/user/composables/emails'

definePageMeta({
  layout: 'settings'
})

useHead({
  title: 'Settings - Emails'
})

type FormValues = { email: string }

const { handleSubmit } = useForm<FormValues>()
const { addUserEmail } = useUserEmails()
const { t } = useLocale()
const email = ref('')

const onAddEmailSubmit = handleSubmit(async () => {
  const success = await addUserEmail(email.value)
  if (success) {
    email.value = ''
  }
})
</script>
