<template>
  <div>
    <CommonCard class="pb-6 !bg-foundation mb-6">
      <div class="flex flex-col sm:flex-row sm:gap-2 text-foreground">
        <ExclamationCircleIcon class="h-8 w-8 m-1 text-warning shrink-0" />
        <div class="flex flex-col gap-3">
          <h3 class="text-heading mt-2">
            {{
              projectId
                ? t.projects.moveToWorkspace.bannerTitleProject
                : t.projects.moveToWorkspace.bannerTitleProjects
            }}
          </h3>

          <div class="text-body-xs">
            <div class="mb-4">
              {{ t.projects.moveToWorkspace.description }}
            </div>
            <div class="flex gap-2">
              <div
                v-tippy="
                  disableButton
                    ? t.projects.moveToWorkspace.onlyOwnerTooltip
                    : undefined
                "
              >
                <FormButton
                  :disabled="disableButton"
                  @click="$emit('moveProject', projectId)"
                >
                  {{ projectId ? t.projects.moveToWorkspace.moveProject : t.projects.moveToWorkspace.moveProjects }}
                </FormButton>
              </div>
              <FormButton
                color="outline"
                :to="LearnMoreMoveProjectsUrl"
                external
                target="_blank"
              >
                {{ t.projects.card.viewPricing }}
              </FormButton>
            </div>
          </div>
        </div>
      </div>
    </CommonCard>
  </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import { LearnMoreMoveProjectsUrl } from '~/lib/common/helpers/route'

const { t } = useLocale()

defineEmits(['moveProject'])

defineProps<{
  projectId?: string
  disableButton?: boolean
}>()
</script>
