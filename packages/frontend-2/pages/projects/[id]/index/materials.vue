<template>
  <div class="py-6 px-2">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-heading-lg text-foreground">{{ t.project.materials.title }}</h2>
        <p class="text-body-sm text-foreground-2 mt-1">
          {{
            selectedModelId
              ? `${t.project.materials.modelLabel} ${models.find((m) => m.id === selectedModelId)?.name}`
              : t.project.materials.subtitle
          }}
        </p>
      </div>
      <FormButton
        v-if="!loading"
        color="outline"
        size="sm"
        :icon-left="ArrowPathIcon"
        @click="refresh"
      >
        {{ t.project.materials.refresh }}
      </FormButton>
    </div>

    <!-- Model selector -->
    <div v-if="!loading && models.length > 0" class="flex items-center gap-2 flex-wrap mb-4">
      <span class="text-body-xs text-foreground-2 shrink-0">{{ t.project.materials.modelLabel }}</span>
      <button
        class="px-2 py-0.5 rounded-full text-body-xs border transition"
        :class="
          selectedModelId === null
            ? 'bg-primary text-white border-primary'
            : 'border-outline-2 text-foreground-2 hover:border-primary hover:text-primary'
        "
        @click="selectedModelId = null"
      >
        {{ t.project.materials.all }}
      </button>
      <button
        v-for="model in models"
        :key="model.id"
        class="px-2 py-0.5 rounded-full text-body-xs border transition max-w-[180px] truncate"
        :title="model.name"
        :class="
          selectedModelId === model.id
            ? 'bg-primary text-white border-primary'
            : 'border-outline-2 text-foreground-2 hover:border-primary hover:text-primary'
        "
        @click="selectedModelId = model.id"
      >
        {{ model.name }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="space-y-3">
      <div
        v-for="i in 5"
        :key="i"
        class="h-12 bg-foundation-2 rounded-lg animate-pulse"
      />
    </div>

    <!-- Error -->
      <div
        v-else-if="error"
        class="p-4 rounded-lg bg-danger/10 text-danger text-body-sm"
      >
        {{ t.project.materials.error }} {{ error }}
      </div>

    <!-- No data -->
    <div
      v-else-if="aggregatedMaterials.length === 0"
      class="flex flex-col items-center justify-center py-16 text-foreground-2 space-y-3"
    >
      <BeakerIcon class="w-12 h-12 opacity-30" />
      <p class="text-body-sm">
        {{
          selectedModelId
            ? t.project.materials.noDataInModel
            : t.project.materials.noData
        }}
      </p>
    </div>

    <!-- Materials table -->
    <div v-else class="space-y-4">
      <!-- Summary cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div
          v-for="card in summaryCards"
          :key="card.label"
          class="bg-foundation rounded-xl border border-outline-2 p-4"
        >
          <div class="text-body-xs text-foreground-2 mb-1">{{ card.label }}</div>
          <div class="text-heading-md font-bold text-foreground">{{ card.value }}</div>
        </div>
      </div>

      <!-- Category filter -->
      <div class="flex items-center gap-2 flex-wrap mb-2">
        <span class="text-body-xs text-foreground-2">{{ t.project.materials.category }}</span>
        <button
          v-for="cat in availableCategories"
          :key="cat"
          class="px-2 py-0.5 rounded-full text-body-xs border transition"
          :class="
            selectedCategory === cat
              ? 'bg-primary text-white border-primary'
              : 'border-outline-2 text-foreground-2 hover:border-primary hover:text-primary'
          "
          @click="selectedCategory = selectedCategory === cat ? null : cat"
        >
          {{ cat || t.project.materials.other }}
        </button>
      </div>

      <!-- Table -->
      <div class="rounded-xl border border-outline-2 overflow-hidden">
        <table class="w-full text-body-sm">
          <thead>
            <tr class="bg-foundation-2 border-b border-outline-2">
              <th class="text-left px-4 py-3 text-foreground-2 font-medium">{{ t.project.materials.material }}</th>
              <th class="text-left px-4 py-3 text-foreground-2 font-medium hidden sm:table-cell">
                {{ t.project.tabs.models }}
              </th>
              <th class="text-right px-4 py-3 text-foreground-2 font-medium">{{ t.project.materials.volume }}</th>
              <th class="text-right px-4 py-3 text-foreground-2 font-medium hidden md:table-cell">
                {{ t.project.materials.area }}
              </th>
              <th class="text-right px-4 py-3 text-foreground-2 font-medium hidden lg:table-cell">
                {{ t.project.materials.elements }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="mat in filteredMaterials"
              :key="mat.name"
              class="border-b border-outline-2 last:border-0 hover:bg-foundation-2 transition"
            >
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <span
                    class="w-2.5 h-2.5 rounded-full shrink-0"
                    :style="{ backgroundColor: getCategoryColor(mat.category) }"
                  />
                  <span class="font-medium text-foreground truncate max-w-[200px]" :title="mat.name">
                    {{ mat.name }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-3 text-foreground-2 hidden sm:table-cell">
                {{ mat.category || '—' }}
              </td>
              <td class="px-4 py-3 text-right font-mono font-medium text-foreground">
                {{ formatNumber(mat.volume) }}
              </td>
              <td class="px-4 py-3 text-right font-mono text-foreground-2 hidden md:table-cell">
                {{ formatNumber(mat.area) }}
              </td>
              <td class="px-4 py-3 text-right text-foreground-2 hidden lg:table-cell">
                {{ mat.elementCount }}
              </td>
            </tr>
          </tbody>
          <tfoot v-if="filteredMaterials.length > 0">
            <tr class="bg-foundation-2 border-t border-outline-2">
              <td class="px-4 py-3 font-semibold text-foreground" colspan="2">{{ t.project.materials.total }}</td>
              <td class="px-4 py-3 text-right font-mono font-bold text-foreground">
                {{ formatNumber(totalVolume) }}
              </td>
              <td class="px-4 py-3 text-right font-mono font-semibold text-foreground-2 hidden md:table-cell">
                {{ formatNumber(totalArea) }}
              </td>
              <td class="px-4 py-3 text-right text-foreground-2 hidden lg:table-cell">
                {{ totalElements }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Progress info -->
      <div
        v-if="fetchProgress.total > 0"
        class="text-body-xs text-foreground-2 text-right"
      >
        {{ t.project.materials.progress }} {{ fetchProgress.loaded }} / {{ fetchProgress.total }}
        <span v-if="fetchProgress.loaded < fetchProgress.total" class="ml-2">
          ({{ t.project.materials.loading }})
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import { BeakerIcon } from '@heroicons/vue/24/outline'
import { useApolloClient } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const { t } = useLocale()
const route = useRoute()
const projectId = computed(() => route.params.id as string)
const { client } = useApolloClient()

// ─── Types ────────────────────────────────────────────────────────────────────

interface MaterialEntry {
  name: string
  category: string
  volume: number
  area: number
  elementCount: number
}

interface ModelInfo {
  id: string
  name: string
}

// ─── State ────────────────────────────────────────────────────────────────────

const loading = ref(false)
const error = ref<string | null>(null)
const models = ref<ModelInfo[]>([])
const materialsByModel = ref<Record<string, MaterialEntry[]>>({})
const selectedModelId = ref<string | null>(null)
const selectedCategory = ref<string | null>(null)
const fetchProgress = ref({ loaded: 0, total: 0 })

// Reset category filter when model changes
watch(selectedModelId, () => {
  selectedCategory.value = null
})

// ─── GraphQL Queries ──────────────────────────────────────────────────────────

const modelsQuery = gql`
  query ProjectModelsForMaterials($projectId: String!) {
    project(id: $projectId) {
      id
      models(limit: 100) {
        items {
          id
          name
          versions(limit: 1) {
            items {
              id
              referencedObject
            }
          }
        }
      }
    }
  }
`

const objectChildrenQuery = gql`
  query ObjectChildrenMaterials(
    $projectId: String!
    $objectId: String!
    $cursor: String
  ) {
    project(id: $projectId) {
      id
      object(id: $objectId) {
        id
        totalChildrenCount
        children(
          limit: 500
          cursor: $cursor
          select: ["properties"]
        ) {
          cursor
          totalCount
          objects {
            id
            data
          }
        }
      }
    }
  }
`

// ─── Data fetching ────────────────────────────────────────────────────────────

const fetchAllChildrenForObject = async (
  objectId: string,
  accumulator: Record<string, MaterialEntry>
) => {
  let cursor: string | null = null

  do {
    const result = await client.query({
      query: objectChildrenQuery,
      variables: { projectId: projectId.value, objectId, cursor },
      fetchPolicy: 'network-only'
    })

    const obj = result.data?.project?.object
    if (!obj) break

    const children = obj.children
    fetchProgress.value.total += children.totalCount

    for (const speckleObj of children.objects) {
      const matQty = speckleObj.data?.properties?.['Material Quantities']
      if (!matQty || typeof matQty !== 'object') continue

      for (const [matName, matData] of Object.entries(matQty as Record<string, any>)) {
        if (!matData || typeof matData !== 'object') continue
        const volume =
          typeof matData.volume === 'object' ? (matData.volume?.value ?? 0) :
          typeof matData.volume === 'number' ? matData.volume : 0
        const area =
          typeof matData.area === 'object' ? (matData.area?.value ?? 0) :
          typeof matData.area === 'number' ? matData.area : 0
        const category = matData.materialCategory || matData.materialClass || ''

        if (!accumulator[matName]) {
          accumulator[matName] = { name: matName, category, volume: 0, area: 0, elementCount: 0 }
        }
        accumulator[matName].volume += volume
        accumulator[matName].area += area
        accumulator[matName].elementCount += 1
      }
    }

    fetchProgress.value.loaded += children.objects.length
    cursor = children.cursor || null
  } while (cursor)
}

const loadMaterials = async () => {
  loading.value = true
  error.value = null
  models.value = []
  materialsByModel.value = {}
  selectedModelId.value = null
  fetchProgress.value = { loaded: 0, total: 0 }

  try {
    const modelsResult = await client.query({
      query: modelsQuery,
      variables: { projectId: projectId.value },
      fetchPolicy: 'network-only'
    })

    const rawModels = modelsResult.data?.project?.models?.items || []

    // Save model list (only those with a published version)
    models.value = rawModels
      .filter((m: any) => m.versions?.items?.[0]?.referencedObject)
      .map((m: any) => ({ id: m.id, name: m.name }))

    // Fetch each model's materials in parallel, storing per-model
    await Promise.all(
      rawModels.map(async (model: any) => {
        const version = model.versions?.items?.[0]
        if (!version?.referencedObject) return
        const accumulator: Record<string, MaterialEntry> = {}
        await fetchAllChildrenForObject(version.referencedObject, accumulator)
        materialsByModel.value[model.id] = Object.values(accumulator).sort(
          (a, b) => b.volume - a.volume
        )
      })
    )
  } catch (e: any) {
    error.value = e?.message || 'Неизвестная ошибка'
  } finally {
    loading.value = false
  }
}

const refresh = () => loadMaterials()

onMounted(() => loadMaterials())

// ─── Computed ─────────────────────────────────────────────────────────────────

// Aggregate across all models or return single model data
const aggregatedMaterials = computed((): MaterialEntry[] => {
  if (selectedModelId.value) {
    return materialsByModel.value[selectedModelId.value] || []
  }
  // Merge all models
  const acc: Record<string, MaterialEntry> = {}
  for (const entries of Object.values(materialsByModel.value)) {
    for (const mat of entries) {
      if (!acc[mat.name]) {
        acc[mat.name] = { name: mat.name, category: mat.category, volume: 0, area: 0, elementCount: 0 }
      }
      acc[mat.name].volume += mat.volume
      acc[mat.name].area += mat.area
      acc[mat.name].elementCount += mat.elementCount
    }
  }
  return Object.values(acc).sort((a, b) => b.volume - a.volume)
})

const availableCategories = computed(() => {
  const cats = new Set(aggregatedMaterials.value.map((m) => m.category))
  return Array.from(cats).sort()
})

const filteredMaterials = computed(() => {
  if (!selectedCategory.value) return aggregatedMaterials.value
  return aggregatedMaterials.value.filter((m) => m.category === selectedCategory.value)
})

const totalVolume = computed(() =>
  filteredMaterials.value.reduce((s, m) => s + m.volume, 0)
)
const totalArea = computed(() =>
  filteredMaterials.value.reduce((s, m) => s + m.area, 0)
)
const totalElements = computed(() =>
  filteredMaterials.value.reduce((s, m) => s + m.elementCount, 0)
)

const summaryCards = computed(() => [
  {
    label: t.project.materials.summary.totalMaterials,
    value: aggregatedMaterials.value.length.toString()
  },
  {
    label: t.project.materials.summary.totalVolume,
    value: formatNumber(aggregatedMaterials.value.reduce((s, m) => s + m.volume, 0))
  },
  {
    label: t.project.materials.summary.totalArea,
    value: formatNumber(aggregatedMaterials.value.reduce((s, m) => s + m.area, 0))
  },
  {
    label: t.project.materials.summary.totalElements,
    value: aggregatedMaterials.value.reduce((s, m) => s + m.elementCount, 0).toString()
  }
])

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatNumber = (n: number) => {
  if (n === 0) return '0'
  if (n < 0.01) return '< 0.01'
  return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const CATEGORY_COLORS: Record<string, string> = {
  Concrete: '#6b7280',
  Masonry: '#b45309',
  Metal: '#3b82f6',
  Wood: '#92400e',
  Glass: '#06b6d4',
  Finishes: '#8b5cf6',
  Insulation: '#f59e0b',
  Generic: '#10b981'
}

const getCategoryColor = (category: string) => {
  for (const [key, color] of Object.entries(CATEGORY_COLORS)) {
    if (category?.toLowerCase().includes(key.toLowerCase())) return color
  }
  return '#9ca3af'
}
</script>
