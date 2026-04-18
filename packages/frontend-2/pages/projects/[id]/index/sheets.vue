<template>
  <div class="py-6 px-2">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-heading-lg text-foreground">Листы проекта</h2>
        <p class="text-body-sm text-foreground-2 mt-1">
          Экспортированные листы Revit из последней версии модели листов
        </p>
      </div>
      <FormButton
        v-if="!loading"
        color="outline"
        size="sm"
        :icon-left="ArrowPathIcon"
        @click="refresh"
      >
        Обновить
      </FormButton>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="i in 8"
        :key="i"
        class="aspect-[1.41] bg-foundation-2 rounded-xl animate-pulse"
      />
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="p-4 rounded-lg bg-danger/10 text-danger text-body-sm"
    >
      {{ error }}
    </div>

    <!-- No sheets model found -->
    <div
      v-else-if="!sheetsModel"
      class="flex flex-col items-center justify-center py-16 text-foreground-2 space-y-3"
    >
      <DocumentIcon class="w-12 h-12 opacity-30" />
      <p class="text-body-sm text-center max-w-xs">
        Модель с листами не найдена. Опубликуйте листы из плагина Revit — они появятся здесь автоматически.
      </p>
      <p class="text-body-xs text-foreground-3">
        Модель должна называться <code class="bg-foundation-2 px-1 rounded">_sheets</code>
      </p>
    </div>

    <!-- No sheets in model -->
    <div
      v-else-if="sheets.length === 0"
      class="flex flex-col items-center justify-center py-16 text-foreground-2 space-y-3"
    >
      <DocumentIcon class="w-12 h-12 opacity-30" />
      <p class="text-body-sm">В модели листов нет данных.</p>
    </div>

    <!-- Sheets grid -->
    <div v-else>
      <!-- Version info -->
      <div class="flex items-center gap-2 mb-4 text-body-xs text-foreground-2">
        <span>Версия от {{ formatDate(sheetsModel.versions.items[0]?.createdAt) }}</span>
        <span>·</span>
        <span>{{ sheets.length }} листов</span>
      </div>

      <!-- Full screen viewer -->
      <Teleport to="body">
        <div
          v-if="activeSheet"
          class="fixed inset-0 z-50 bg-black/90 flex flex-col"
          @click.self="activeSheet = null"
        >
          <div class="flex items-center justify-between px-4 py-3 bg-black/50">
            <div class="text-white">
              <span class="font-mono text-sm opacity-70 mr-2">{{ activeSheet.sheetNumber }}</span>
              <span class="font-medium">{{ activeSheet.sheetName }}</span>
            </div>
            <button
              class="text-white/70 hover:text-white transition"
              @click="activeSheet = null"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>
          <div class="flex-1 flex items-center justify-center p-4 overflow-auto">
            <img
              :src="getBlobUrl(activeSheet.blobId)"
              :alt="`${activeSheet.sheetNumber} – ${activeSheet.sheetName}`"
              class="max-w-full max-h-full object-contain rounded shadow-2xl"
            />
          </div>
          <!-- Sheet nav -->
          <div class="flex items-center justify-center gap-2 py-3">
            <button
              class="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-body-xs transition disabled:opacity-30"
              :disabled="activeSheetIndex === 0"
              @click="activeSheetIndex--"
            >
              ← Пред.
            </button>
            <span class="text-white/50 text-body-xs">{{ activeSheetIndex + 1 }} / {{ sheets.length }}</span>
            <button
              class="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-body-xs transition disabled:opacity-30"
              :disabled="activeSheetIndex === sheets.length - 1"
              @click="activeSheetIndex++"
            >
              След. →
            </button>
          </div>
        </div>
      </Teleport>

      <!-- Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(sheet, index) in sheets"
          :key="sheet.blobId"
          class="group cursor-pointer rounded-xl border border-outline-2 overflow-hidden bg-foundation hover:border-primary transition"
          @click="openSheet(index)"
        >
          <!-- Thumbnail -->
          <div class="aspect-[1.41] bg-foundation-2 overflow-hidden relative">
            <img
              :src="getBlobUrl(sheet.blobId)"
              :alt="`${sheet.sheetNumber} – ${sheet.sheetName}`"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              loading="lazy"
              @error="onImgError"
            />
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center"
            >
              <MagnifyingGlassPlusIcon
                class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition drop-shadow-lg"
              />
            </div>
          </div>
          <!-- Info -->
          <div class="px-3 py-2">
            <div class="font-mono text-body-xs text-foreground-2">{{ sheet.sheetNumber }}</div>
            <div
              class="text-body-sm font-medium text-foreground truncate"
              :title="sheet.sheetName"
            >
              {{ sheet.sheetName }}
            </div>
            <div
              v-if="sheet.viewNames?.length"
              class="text-body-xs text-foreground-3 truncate mt-0.5"
              :title="sheet.viewNames.join(', ')"
            >
              {{ sheet.viewNames.join(', ') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowPathIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { DocumentIcon, MagnifyingGlassPlusIcon } from '@heroicons/vue/24/outline'
import { useApolloClient } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const route = useRoute()
const projectId = computed(() => route.params.id as string)
const { client } = useApolloClient()

// ─── Types ────────────────────────────────────────────────────────────────────

interface SheetEntry {
  sheetNumber: string
  sheetName: string
  blobId: string
  viewNames: string[]
  issuedBy: string
  issuedDate: string
}

// ─── State ────────────────────────────────────────────────────────────────────

const loading = ref(false)
const error = ref<string | null>(null)
const sheetsModel = ref<any | null>(null)
const sheets = ref<SheetEntry[]>([])
const activeSheetIndex = ref(0)

const activeSheet = computed({
  get: () => (activeSheetIndex.value >= 0 && sheets.value.length > 0 ? sheets.value[activeSheetIndex.value] : null),
  set: (val) => {
    if (val === null) activeSheetIndex.value = -1
  }
})

// ─── GraphQL ──────────────────────────────────────────────────────────────────

const sheetsModelQuery = gql`
  query ProjectSheetsModel($projectId: String!) {
    project(id: $projectId) {
      id
      models(limit: 100) {
        items {
          id
          name
          versions(limit: 1) {
            items {
              id
              createdAt
              referencedObject
            }
          }
        }
      }
    }
  }
`

const objectChildrenQuery = gql`
  query SheetObjects($projectId: String!, $objectId: String!, $cursor: String) {
    project(id: $projectId) {
      id
      object(id: $objectId) {
        id
        children(limit: 500, cursor: $cursor, select: ["speckle_type", "sheetNumber", "sheetName", "blobId", "viewNames", "issuedBy", "issuedDate"]) {
          cursor
          objects {
            id
            data
          }
        }
      }
    }
  }
`

// ─── Data loading ─────────────────────────────────────────────────────────────

const loadSheets = async () => {
  loading.value = true
  error.value = null
  sheetsModel.value = null
  sheets.value = []

  try {
    const result = await client.query({
      query: sheetsModelQuery,
      variables: { projectId: projectId.value },
      fetchPolicy: 'network-only'
    })

    const models = result.data?.project?.models?.items || []
    // Find model named "_sheets" (case-insensitive)
    const found = models.find((m: any) =>
      m.name.toLowerCase() === '_sheets' || m.name.toLowerCase().includes('sheet')
    )
    if (!found || !found.versions?.items?.[0]?.referencedObject) return

    sheetsModel.value = found
    const objectId = found.versions.items[0].referencedObject

    // Fetch children (sheet objects)
    let cursor: string | null = null
    do {
      const res = await client.query({
        query: objectChildrenQuery,
        variables: { projectId: projectId.value, objectId, cursor },
        fetchPolicy: 'network-only'
      })
      const children = res.data?.project?.object?.children
      if (!children) break

      for (const obj of children.objects) {
        const d = obj.data
        if (d?.speckle_type === 'RevitSheet' && d?.blobId) {
          sheets.value.push({
            sheetNumber: d.sheetNumber ?? '',
            sheetName: d.sheetName ?? '',
            blobId: d.blobId,
            viewNames: Array.isArray(d.viewNames) ? d.viewNames : [],
            issuedBy: d.issuedBy ?? '',
            issuedDate: d.issuedDate ?? ''
          })
        }
      }
      cursor = children.cursor || null
    } while (cursor)

    // Sort by sheet number
    sheets.value.sort((a, b) => a.sheetNumber.localeCompare(b.sheetNumber))
  } catch (e: any) {
    error.value = `Ошибка загрузки: ${e?.message || 'Неизвестная ошибка'}`
  } finally {
    loading.value = false
  }
}

const refresh = () => loadSheets()

onMounted(() => loadSheets())

// ─── Sheet viewer ─────────────────────────────────────────────────────────────

const openSheet = (index: number) => {
  activeSheetIndex.value = index
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const apiOrigin = useApiOrigin()

const getBlobUrl = (blobId: string) =>
  `${apiOrigin}/api/stream/${projectId.value}/blob/${blobId}`

const onImgError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.opacity = '0.3'
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>
