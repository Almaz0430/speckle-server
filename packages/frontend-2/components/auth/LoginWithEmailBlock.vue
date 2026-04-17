<template>
  <form method="post" @submit="onSubmit">
    <div class="flex flex-col space-y-2">
      <FormTextInput
        type="email"
        name="email"
        :label="t.auth.login.email"
        :placeholder="t.auth.login.emailPlaceholder"
        size="lg"
        color="foundation"
        :rules="emailRules"
        show-label
        :disabled="!!(loading || shouldForceInviteEmail)"
        auto-focus
        autocomplete="email"
      />
      <FormTextInput
        type="password"
        name="password"
        :label="t.auth.login.password"
        :placeholder="t.auth.login.passwordPlaceholder"
        color="foundation"
        size="lg"
        :rules="passwordRules"
        show-label
        :disabled="loading"
        autocomplete="current-password"
      />
    </div>
    <FormButton
      size="lg"
      submit
      full-width
      class="mt-8 mb-4"
      :disabled="loading || !isMounted"
    >
      {{ t.auth.login.loginButton }}
    </FormButton>
    <div class="mt-1 text-center text-body-xs text-foreground-3 select-none">
      {{ t.auth.login.forgotPassword }}
      <NuxtLink :to="forgottenPasswordRoute" class="text-foreground">
        {{ t.auth.login.resetPassword }}
      </NuxtLink>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { isEmail, isRequired } from '~~/lib/common/helpers/validation'
import { ToastNotificationType, useGlobalToast } from '~~/lib/common/composables/toast'
import { ensureError } from '@speckle/shared'
import { useAuthManager } from '~~/lib/auth/composables/auth'
import { forgottenPasswordRoute } from '~~/lib/common/helpers/route'
import { useMounted } from '@vueuse/core'
import { graphql } from '~/lib/common/generated/gql'
import type { AuthLoginWithEmailBlock_PendingWorkspaceCollaboratorFragment } from '~/lib/common/generated/gql/graphql'

type FormValues = { email: string; password: string }

graphql(`
  fragment AuthLoginWithEmailBlock_PendingWorkspaceCollaborator on PendingWorkspaceCollaborator {
    id
    email
    user {
      id
    }
  }
`)

const props = defineProps<{
  challenge: string
  workspaceInvite?: AuthLoginWithEmailBlock_PendingWorkspaceCollaboratorFragment
}>()

const { handleSubmit, setValues } = useForm<FormValues>()

const loading = ref(false)
const emailRules = [isEmail]
const passwordRules = [isRequired]

const isMounted = useMounted()
const { loginWithEmail } = useAuthManager()
const { triggerNotification } = useGlobalToast()
const { t } = useLocale()

const inviteEmail = computed(() => props.workspaceInvite?.email)
const isInviteForExistingUser = computed(() => !!props.workspaceInvite?.user)
const shouldForceInviteEmail = computed(
  () => !!(inviteEmail.value && isInviteForExistingUser.value)
)

const onSubmit = handleSubmit(async ({ email, password }) => {
  try {
    loading.value = true
    await loginWithEmail({ email, password, challenge: props.challenge })
  } catch (e) {
    triggerNotification({
      type: ToastNotificationType.Danger,
      title: t.value.auth.login.loginFailed,
      description: `${ensureError(e).message}`
    })
  } finally {
    loading.value = false
  }
})

watch(
  shouldForceInviteEmail,
  (shouldForce) => {
    if (shouldForce) {
      setValues({ email: inviteEmail.value || '' })
    }
  },
  { immediate: true }
)
</script>
