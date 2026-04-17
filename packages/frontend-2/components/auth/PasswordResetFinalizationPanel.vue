<template>
  <form class="mx-auto w-full px-2" @submit="onSubmit">
    <h1 class="text-heading-xl text-center w-full inline-block mb-4">
      {{ t.auth.passwordReset.title }}
    </h1>

    <div class="flex flex-col space-y-4">
      <p class="text-center text-body-xs text-foreground mb-2">
        {{ t.settings.profile.changePassword.description }}
      </p>
      <FormTextInput
        v-model="password"
        type="password"
        name="password"
        :label="t.auth.passwordReset.newPassword"
        :placeholder="t.auth.passwordReset.newPasswordPlaceholder"
        color="foundation"
        size="lg"
        :rules="[isRequired]"
        show-label
      />
      <AuthPasswordChecks :password="password" />
    </div>

    <FormButton class="mt-8" submit full-width size="lg" :disabled="loading">
      {{ t.auth.passwordReset.resetButton }}
    </FormButton>
  </form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { usePasswordReset } from '~~/lib/auth/composables/passwordReset'
import { isRequired } from '~~/lib/common/helpers/validation'

type FormValues = {
  password: string
}

const props = defineProps<{
  token: string
}>()

const { t } = useLocale()
const { handleSubmit } = useForm<FormValues>()
const { finalize } = usePasswordReset()

const loading = ref(false)
const password = ref('')

const onSubmit = handleSubmit(
  async ({ password }) => await finalize(password, props.token)
)
</script>
