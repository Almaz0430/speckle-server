<template>
  <section>
    <div class="md:max-w-xl md:mx-auto pb-6 md:pb-0">
      <SettingsSectionHeader :title="t.settings.server.general.title" :text="t.settings.server.general.subtitle" />
      <div class="flex flex-col space-y-6">
        <SettingsSectionHeader :title="t.settings.server.general.serverDetails" subheading />
        <form class="flex flex-col gap-2" @submit="onSubmit">
          <div class="flex flex-col gap-4">
            <FormTextInput
              v-model="name"
              :label="t.settings.server.general.publicName"
              name="serverName"
              color="foundation"
              :placeholder="t.settings.server.general.namePlaceholder"
              show-label
              label-position="left"
              :rules="requiredRule"
              type="text"
            />
            <hr class="border-outline-3" />
            <FormTextArea
              v-model="description"
              color="foundation"
              :label="t.settings.server.general.description"
              name="description"
              :placeholder="t.settings.server.general.descriptionPlaceholder"
              show-label
              label-position="left"
            />
            <hr class="border-outline-3" />
            <FormTextInput
              v-model="company"
              color="foundation"
              :label="t.settings.server.general.owner"
              name="owner"
              :placeholder="t.settings.server.general.ownerPlaceholder"
              show-label
              label-position="left"
            />
            <hr class="border-outline-3" />
            <FormTextInput
              v-model="adminContact"
              color="foundation"
              :label="t.settings.server.general.adminEmail"
              name="adminEmail"
              :placeholder="t.settings.server.general.adminEmailPlaceholder"
              show-label
              type="email"
              label-position="left"
            />
            <hr class="border-outline-3" />
            <FormTextInput
              v-model="termsOfService"
              color="foundation"
              :label="t.settings.server.general.termsOfService"
              name="terms"
              show-label
              label-position="left"
            />
            <hr class="border-outline-3" />
            <FormCheckbox
              v-model="inviteOnly"
              :label="t.settings.server.general.inviteOnly"
              :description="t.settings.server.general.inviteOnlyDescription"
              label-position="left"
              name="inviteOnly"
              show-label
            />
            <hr class="border-outline-3" />
            <FormCheckbox
              v-model="guestModeEnabled"
              :label="t.settings.server.general.guestMode"
              :description="t.settings.server.general.guestModeDescription"
              label-position="left"
              name="guestModeEnabled"
              show-label
            />
            <div class="mt-6">
              <FormButton color="primary" @click="onSubmit">{{ t.settings.server.general.saveChanges }}</FormButton>
            </div>
          </div>
        </form>
      </div>
      <hr class="my-6 md:my-8 border-outline-2" />
      <SettingsServerGeneralVersion />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useQuery, useMutation } from '@vue/apollo-composable'
import { useForm } from 'vee-validate'
import { isRequired } from '~~/lib/common/helpers/validation'
import { useGlobalToast, ToastNotificationType } from '~~/lib/common/composables/toast'
import { FormTextInput, useFormCheckboxModel } from '@speckle/ui-components'
import { useLogger } from '~~/composables/logging'
import {
  ROOT_QUERY,
  convertThrowIntoFetchResult,
  modifyObjectFields
} from '~~/lib/common/helpers/graphql'
import { serverInfoQuery } from '~~/lib/server-management/graphql/queries'
import { serverInfoUpdateMutation } from '~~/lib/server-management/graphql/mutations'
import type {
  ServerInfoUpdateMutationVariables,
  Query
} from '~~/lib/common/generated/gql/graphql'

definePageMeta({
  layout: 'settings'
})

useHead({
  title: 'Settings | Server - General'
})

type FormValues = {
  name: string
  description: string
  company: string
  adminContact: string
  termsOfService: string
  inviteOnly: boolean
  guestModeEnabled: boolean
}

const logger = useLogger()
const { t } = useLocale()
const { triggerNotification } = useGlobalToast()
const { handleSubmit } = useForm<FormValues>()
const { result } = useQuery(serverInfoQuery)
const { mutate: updateServerInfo } = useMutation(serverInfoUpdateMutation)

const name = ref('')
const description = ref('')
const company = ref('')
const adminContact = ref('')
const termsOfService = ref('')
const { model: inviteOnly, isChecked: isInviteOnlyChecked } = useFormCheckboxModel()
const { model: guestModeEnabled, isChecked: isGuestModeChecked } =
  useFormCheckboxModel()

const requiredRule = [isRequired]

const updateServerInfoAndCache = async (
  variables: ServerInfoUpdateMutationVariables
) => {
  try {
    const result = await updateServerInfo(variables, {
      update: (cache, result) => {
        if (result?.data?.serverInfoUpdate) {
          // Modify 'serverInfo' field of ROOT_QUERY
          modifyObjectFields<undefined, Query['serverInfo']>(
            cache,
            ROOT_QUERY,
            (_fieldName, _variables, value) => {
              const newData = variables.info
              return {
                ...value,
                ...newData,
                guestModeEnabled: newData.guestModeEnabled ?? value.guestModeEnabled
              }
            },
            { fieldNameWhitelist: ['serverInfo'] }
          )
        }
      }
    })
    return result
  } catch (error) {
    return convertThrowIntoFetchResult(error)
  }
}

const onSubmit = handleSubmit(async () => {
  const result = await updateServerInfoAndCache({
    info: {
      name: name.value,
      description: description.value,
      company: company.value,
      adminContact: adminContact.value,
      termsOfService: termsOfService.value,
      inviteOnly: isInviteOnlyChecked.value,
      guestModeEnabled: isGuestModeChecked.value
    }
  })

  if (result && result.data) {
    triggerNotification({
      type: ToastNotificationType.Success,
      title: t.value.settings.server.general.savedSuccess,
      description: t.value.settings.server.general.savedSuccessDescription
    })
  } else {
    logger.error(result && result.errors)
    triggerNotification({
      type: ToastNotificationType.Danger,
      title: t.value.settings.server.general.saveFailed,
      description: t.value.settings.server.general.saveFailedDescription
    })
  }
})

onBeforeMount(() => {
  if (!result.value?.serverInfo) return

  name.value = result.value.serverInfo.name
  description.value = result.value.serverInfo.description || ''
  company.value = result.value.serverInfo.company || ''
  adminContact.value = result.value.serverInfo.adminContact || ''
  termsOfService.value = result.value.serverInfo.termsOfService || ''
  isInviteOnlyChecked.value = !!result.value.serverInfo.inviteOnly
  isGuestModeChecked.value = !!result.value.serverInfo.guestModeEnabled
})
</script>
