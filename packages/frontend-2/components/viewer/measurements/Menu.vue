<template>
  <div>
    <ViewerLayoutPanel v-if="showSettings" class="p-3 pb-2">
      <span class="flex flex-col gap-1.5">
        <label class="text-body-2xs" for="units">{{ t.viewer.measurements.units }}</label>
        <ViewerMeasurementsUnitSelect
          v-model="measurementOptions.units"
          mount-menu-on-body
          @update:model-value="onChangeMeasurementUnits"
        />
      </span>

      <span class="flex flex-col gap-1.5 py-3">
        <FormRange
          v-model="measurementOptions.precision"
          name="precision"
          :label="t.viewer.measurements.precision"
          :min="1"
          :max="5"
          :step="1"
        />
      </span>

      <div class="flex flex-col gap-1.5 pb-1">
        <FormCheckbox
          :name="t.viewer.measurements.chainMeasurements"
          :label="t.viewer.measurements.chainMeasurements"
          label-position="right"
          label-classes="text-body-2xs font-normal"
          :model-value="measurementOptions.chain"
          @update:model-value="toggleMeasurementsChaining"
        />

        <FormCheckbox
          :name="t.viewer.measurements.snapToVertices"
          :label="t.viewer.measurements.snapToVertices"
          label-position="right"
          label-classes="text-body-2xs font-normal"
          :model-value="measurementOptions.vertexSnap"
          @update:model-value="toggleMeasurementsSnap"
        />
      </div>
    </ViewerLayoutPanel>
    <ViewerLayoutPanel class="mt-1 p-1 pr-2">
      <div class="flex gap-2 justify-between items-center">
        <ViewerButtonGroup>
          <ViewerButtonGroupButton
            v-for="option in measurementTypeOptions"
            :key="option.value"
            v-tippy="getTooltipProps(option.title)"
            class="size-8"
            :is-active="measurementOptions.type === option.value"
            @click="updateMeasurementsType(option)"
          >
            <component :is="option.icon" class="size-5 flex-shrink-0" />
          </ViewerButtonGroupButton>
        </ViewerButtonGroup>

        <div class="flex gap-1.5">
          <FormButton
            size="sm"
            color="outline"
            tabindex="-1"
            @click="clearMeasurements"
          >
            {{ t.viewer.measurements.deleteAll }}
          </FormButton>
          <button
            class="size-6 flex items-center justify-center rounded-md"
            :class="[
              showSettings &&
                'text-primary-focus bg-info-lighter dark:text-foreground-on-primary',
              !showSettings && 'text-foreground hover:bg-foundation-2'
            ]"
            @click="showSettings = !showSettings"
          >
            <IconViewerSettings class="size-4" />
          </button>
        </div>
      </div>
    </ViewerLayoutPanel>
  </div>
</template>

<script setup lang="ts">
import { MeasurementType } from '@speckle/shared/viewer/state'
import { useMeasurementUtilities } from '~~/lib/viewer/composables/ui'

interface MeasurementTypeOption {
  title: string
  value: MeasurementType
}

const { t } = useLocale()
const { measurementOptions, setMeasurementOptions, clearMeasurements } =
  useMeasurementUtilities()
const { getTooltipProps } = useSmartTooltipDelay()

const showSettings = ref(false)

const updateMeasurementsType = (selectedOption: MeasurementTypeOption) => {
  setMeasurementOptions({
    ...measurementOptions.value,
    type: selectedOption.value
  })
}

const onChangeMeasurementUnits = (newUnit: string) => {
  setMeasurementOptions({
    ...measurementOptions.value,
    units: newUnit
  })
}

const toggleMeasurementsChaining = () => {
  setMeasurementOptions({
    ...measurementOptions.value,
    chain: !measurementOptions.value.chain
  })
}

const toggleMeasurementsSnap = () => {
  setMeasurementOptions({
    ...measurementOptions.value,
    vertexSnap: !measurementOptions.value.vertexSnap
  })
}

const measurementTypeOptions = computed(() => [
  {
    title: t.value.viewer.measurements.pointToPoint,
    icon: 'IconMeasurePointToPoint',
    value: MeasurementType.POINTTOPOINT,
    description: t.value.viewer.measurements.pointToPointDesc
  },
  {
    title: t.value.viewer.measurements.perpendicular,
    icon: 'IconMeasurePerpendicular',
    value: MeasurementType.PERPENDICULAR,
    description: t.value.viewer.measurements.perpendicularDesc
  },
  {
    title: t.value.viewer.measurements.area,
    icon: 'IconMeasureArea',
    value: MeasurementType.AREA,
    description: t.value.viewer.measurements.areaDesc
  },
  {
    title: t.value.viewer.measurements.pointCoordinates,
    icon: 'IconMeasurePoint',
    value: MeasurementType.POINT,
    description: t.value.viewer.measurements.pointCoordinatesDesc
  }
])
</script>
