<template>
  <form class="mx-auto w-full px-2" @submit="onSubmit">
    <h1 class="text-heading-xl text-center inline-block mb-4 w-full">
      {{ t.auth.passwordReset.title }}
    </h1>
    <div class="flex flex-col space-y-4">
      <div class="text-body-xs text-foreground text-center mb-2">
        {{ t.auth.passwordReset.description }}
      </div>
      <div>
        <FormTextInput
          name="resetEmail"
          color="foundation"
          size="lg"
          type="email"
          :placeholder="t.auth.passwordReset.emailPlaceholder"
          :rules="emailRules"
        />
      </div>
    </div>

    <div class="flex flex-col gap-y-2 mt-8">
      <FormButton submit full-width size="lg" :disabled="loading">
        {{ t.auth.passwordReset.sendButton }}
      </FormButton>
      <FormButton color="outline" size="lg" full-width :to="homeRoute">
        {{ t.auth.passwordReset.backToLogin }}
      </FormButton>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { homeRoute } from '~/lib/common/helpers/route'
import { usePasswordReset } from '~~/lib/auth/composables/passwordReset'
import { isEmail, isRequired } from '~~/lib/common/helpers/validation'

type FormValues = { resetEmail: string }

const { t } = useLocale()
const { handleSubmit } = useForm<FormValues>()
const { sendResetEmail } = usePasswordReset()

const emailRules = [isEmail, isRequired]
const loading = ref(false)

const onSubmit = handleSubmit(
  async ({ resetEmail }) => await sendResetEmail(resetEmail)
)
</script>
