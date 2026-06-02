---
name: vue-nuxt-version-optimizer
description: "Detects the project's Vue, Nuxt, and TypeScript versions and searches for the latest features, patterns, and improvements to leverage. Ensures code uses modern framework capabilities instead of outdated patterns. Always active when writing Vue/Nuxt code."
---

# Vue / Nuxt Version Optimizer

An always-active skill that ensures the Agent leverages the **latest features and modern patterns** of the detected Vue, Nuxt, and TypeScript versions. Instead of writing code using old conventions, this skill identifies opportunities to use newer, cleaner, and more efficient framework features introduced in the project's current versions.

---

## When to use this skill

- **Always active** when writing, modifying, or reviewing any Vue/Nuxt/TypeScript code in a project with `vue` or `nuxt` in `package.json`.
- When the Agent is about to write code that could benefit from a **newer framework feature** available in the detected version.
- When the user upgrades their Vue/Nuxt version and wants to know **what new features they can now use**.
- When the user asks: "ما الجديد في فيو؟", "what's new in this Vue version?", "هل يوجد طريقة أحدث؟", "is there a modern way to do this?".
- **Do NOT** suggest features from versions newer than what the project uses — always match the detected version.

---

## How to use it

### Step 0 — Detect Project Version (Run Once Per Session)

1. Read `package.json` → extract `vue`, `nuxt`, and `typescript` versions.
2. Check `node_modules/vue/package.json` for the **exact installed version**.
3. Store the detected versions and use them throughout the session.

### Step 1 — Search for Latest Features

**Every time before writing code**, check if the detected version has a modern feature that replaces the traditional approach:

1. **Check the Feature Registry** (Section 1 below) for the detected version.
2. If a modern alternative exists → use it instead of the old pattern.
3. If uncertain about a feature → **search the web** for the official docs:
   - `https://vuejs.org/api/`
   - `https://nuxt.com/docs/`
   - `https://blog.vuejs.org/`
4. **Read changelogs** for minor version features.

### Step 2 — Apply Modern Patterns

When writing code, **always prefer** the newer pattern if available in the detected version. Show the user both the old and new way in a comment if the pattern is significantly different.

### Step 3 — Stay Updated

Since Vue/Nuxt release minor versions frequently, the Agent **MUST search the web** for the latest changelog when the detected minor version is newer than what this skill documents.

**Search query template:**

```
Vue {version} new features changelog
Nuxt {version} new features changelog
```

---

## 1. Feature Registry — Old vs. Modern Patterns

### Vue 3.5+ (June 2025)

#### 1.1 — useTemplateRef()

```typescript
// ❌ OLD PATTERN — Magic string ref matching
const inputRef = ref<HTMLInputElement | null>(null)
// template: <input ref="inputRef" />

// ✅ MODERN PATTERN (Vue 3.5+) — Explicit, type-safe template refs
const inputRef = useTemplateRef<HTMLInputElement>('my-input')
// template: <input ref="my-input" />
// Decouples variable name from template ref name
```

**When to use**: All new template refs. Provides better type inference and decouples the ref variable from the template attribute.

#### 1.2 — Reactive Props Destructure (Stable)

```vue
<!-- ❌ OLD PATTERN — Must access via props.xxx -->
<script setup lang="ts">
const props = defineProps<{
  title: string
  count: number
}>()
// Usage: props.title, props.count
</script>

<!-- ✅ MODERN PATTERN (Vue 3.5+) — Direct destructure with reactivity -->
<script setup lang="ts">
const { title, count = 0 } = defineProps<{
  title: string
  count?: number
}>()
// Usage: title, count — reactive, with default value support
</script>
```

**When to use**: All new components. Cleaner code and native default values.

#### 1.3 — useId() for SSR-Safe IDs

```typescript
// ❌ OLD PATTERN — Manual ID generation (hydration mismatch risk)
const id = `input-${Math.random().toString(36).slice(2)}`

// ✅ MODERN PATTERN (Vue 3.5+) — SSR-safe unique ID
const id = useId()
// Generates consistent IDs across server and client rendering
```

**When to use**: Any dynamic ID needed for form labels, ARIA attributes, or accessible components.

#### 1.4 — onWatcherCleanup()

```typescript
// ❌ OLD PATTERN — Manual cleanup in watch
watch(searchQuery, (newQuery, oldQuery, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())
  fetchResults(newQuery, { signal: controller.signal })
})

// ✅ MODERN PATTERN (Vue 3.5+) — onWatcherCleanup()
import { onWatcherCleanup } from 'vue'

watch(searchQuery, (newQuery) => {
  const controller = new AbortController()
  onWatcherCleanup(() => controller.abort())
  fetchResults(newQuery, { signal: controller.signal })
})
```

**When to use**: Any watcher that creates resources needing cleanup.

#### 1.5 — Deferred Teleport

```vue
<!-- ❌ OLD PATTERN — Teleport target must exist before rendering -->
<Teleport to="#modal-container">
  <MyModal />
</Teleport>

<!-- ✅ MODERN PATTERN (Vue 3.5+) — Deferred Teleport -->
<Teleport defer to="#modal-container">
  <MyModal />
</Teleport>
<!-- Target can be rendered AFTER this Teleport — Vue waits for it -->
```

---

### Vue 3.4 (December 2023)

#### 1.6 — defineModel()

```vue
<!-- ❌ OLD PATTERN — Manual v-model implementation -->
<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<!-- ✅ MODERN PATTERN (Vue 3.4+) — defineModel() -->
<script setup lang="ts">
const model = defineModel<string>({ required: true })
// model is a Ref<string> that auto-syncs with parent's v-model
// template: <input v-model="model" />
</script>
```

**When to use**: Any component that accepts `v-model`. Eliminates boilerplate.

#### 1.7 — v-bind Same-Name Shorthand

```vue
<!-- ❌ OLD PATTERN — Explicit attribute binding -->
<template>
  <div :id="id" :class="class" :style="style">
    <UserCard :user="user" :loading="loading" />
  </div>
</template>

<!-- ✅ MODERN PATTERN (Vue 3.4+) — Same-name shorthand -->
<template>
  <div :id :class :style>
    <UserCard :user :loading />
  </div>
</template>
```

**When to use**: When prop/attribute name matches variable name. Cleaner templates.

#### 1.8 — Generic defineProps Improvements

```vue
<!-- ❌ OLD PATTERN — Limited generics support -->
<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<!-- ✅ MODERN PATTERN (Vue 3.4+) — Full generic support -->
<script setup lang="ts" generic="T extends Record<string, any>">
defineProps<{
  items: T[]
  selected?: T
}>()

defineEmits<{
  select: [item: T]
}>()
</script>
<!-- Usage: <MyList :items="users" @select="handleUser" /> -->
```

**When to use**: Reusable components that work with different data types (lists, tables, selects).

---

### Vue 3.3 (May 2023)

#### 1.9 — defineOptions()

```vue
<!-- ❌ OLD PATTERN — Separate <script> block for component options -->
<script lang="ts">
export default { name: 'MyComponent', inheritAttrs: false }
</script>
<script setup lang="ts">
// setup logic
</script>

<!-- ✅ MODERN PATTERN (Vue 3.3+) — defineOptions() in setup -->
<script setup lang="ts">
defineOptions({
  name: 'MyComponent',
  inheritAttrs: false,
})
</script>
```

#### 1.10 — defineSlots()

```vue
<!-- ❌ OLD PATTERN — No typed slots -->
<script setup lang="ts">
// Slots are untyped
</script>

<!-- ✅ MODERN PATTERN (Vue 3.3+) — Typed slots -->
<script setup lang="ts">
defineSlots<{
  default(props: { item: User; index: number }): any
  header(props: { title: string }): any
  empty(): any
}>()
</script>
```

#### 1.11 — toValue() Utility

```typescript
// ❌ OLD PATTERN — Manual unwrapping
import { unref, isRef } from 'vue'
function useFeature(input: Ref<string> | string | (() => string)) {
  const value = isRef(input) ? input.value : typeof input === 'function' ? input() : input
}

// ✅ MODERN PATTERN (Vue 3.3+) — toValue()
import { toValue } from 'vue'
function useFeature(input: MaybeRefOrGetter<string>) {
  const value = toValue(input) // Handles ref, getter, and raw value
}
```

**When to use**: Composable arguments that accept ref, getter, or raw values.

---

### Nuxt 4 (2025-2026)

#### 1.12 — app/ Directory Structure

```
# ❌ OLD PATTERN (Nuxt 3 default) — Root-level directories
├── components/
├── composables/
├── pages/
├── layouts/
├── nuxt.config.ts

# ✅ MODERN PATTERN (Nuxt 4) — Encapsulated app/ directory
├── app/
│   ├── components/
│   ├── composables/
│   ├── pages/
│   ├── layouts/
│   └── stores/
├── server/
├── shared/
│   └── types/
└── nuxt.config.ts
```

**When to use**: All new Nuxt 4 projects. Set `srcDir: 'app/'` in `nuxt.config.ts`.

#### 1.13 — Shared Types Folder

```typescript
// ❌ OLD PATTERN — Duplicate types in app/ and server/
// app/types/user.ts AND server/types/user.ts — duplicated!

// ✅ MODERN PATTERN (Nuxt 4) — Shared types
// shared/types/index.ts — available in BOTH app/ and server/
export interface User {
  id: number
  name: string
  email: string
}

// In app/:  import type { User } from '#shared/types'
// In server/: import type { User } from '#shared/types'
```

#### 1.14 — Singleton useFetch Behavior

```typescript
// ❌ OLD PATTERN — Duplicate fetches when key matches
// Layout calls useFetch('/api/user') AND Page calls useFetch('/api/user')
// → Two requests!

// ✅ MODERN PATTERN (Nuxt 4) — Automatic deduplication
// When the same key is used, Nuxt shares the data and status
// Layout and Page both get the same data from ONE request
const { data: user } = await useFetch('/api/user', {
  key: 'current-user', // Same key = shared data
})
```

---

### Nuxt 3.10+

#### 1.15 — callOnce()

```typescript
// ❌ OLD PATTERN — Manual flag to prevent re-execution
const initialized = ref(false)
onMounted(async () => {
  if (initialized.value) return
  initialized.value = true
  await initializeApp()
})

// ✅ MODERN PATTERN (Nuxt 3.10+) — callOnce()
await callOnce(async () => {
  await initializeApp()
})
// Runs exactly once during SSR and never again on client
```

---

### TypeScript 5.x+ Features

#### 1.16 — satisfies Operator

```typescript
// ❌ OLD PATTERN — Type assertion widens the type
const config = {
  theme: 'dark',
  locale: 'en',
} as AppConfig
// config.theme is typed as string (too wide)

// ✅ MODERN PATTERN (TypeScript 5.0+) — satisfies
const config = {
  theme: 'dark',
  locale: 'en',
} satisfies AppConfig
// config.theme is typed as 'dark' (literal type preserved!)
// AND it validates against AppConfig at compile time
```

#### 1.17 — const Type Parameters

```typescript
// ❌ OLD PATTERN — Loses literal types in generics
function createRoute<T extends string>(path: T) {
  return path
}
const route = createRoute('users') // type: string (too wide)

// ✅ MODERN PATTERN (TypeScript 5.0+) — const type parameter
function createRoute<const T extends string>(path: T) {
  return path
}
const route = createRoute('users') // type: 'users' (exact literal)
```

#### 1.18 — using Declarations (Resource Management)

```typescript
// ❌ OLD PATTERN — Manual cleanup
const controller = new AbortController()
try {
  await fetch(url, { signal: controller.signal })
} finally {
  controller.abort()
}

// ✅ MODERN PATTERN (TypeScript 5.2+) — using declaration
{
  using controller = new AbortController()
  await fetch(url, { signal: controller.signal })
} // Automatically disposed at end of scope
```

---

## 2. Vue/Nuxt Evolution Quick Reference

```
How to decide which pattern to use:

1. Read package.json → detect Vue, Nuxt, TypeScript versions
2. Check the Feature Registry above for that version
3. Use the MODERN pattern — never the old one
4. If unsure → search: "Vue {version} {feature} docs"

Priority:
  Vue 3.5 features > Vue 3.4 features > Vue 3.3 features > ...
  Nuxt 4 features > Nuxt 3.10 features > Nuxt 3.8 features > ...
  Use the NEWEST available pattern for the detected version
```

---

## Best Practices & Rules

### Mandatory Rules

- **MUST** detect Vue, Nuxt, and TypeScript versions from `package.json` before writing any code.
- **MUST** use the modern pattern from the Feature Registry when available for the detected version.
- **MUST** search the web for the latest changelog when the detected version is newer than documented here.
- **MUST** prefer the newest available pattern — never write old-style code when a modern alternative exists.
- **MUST** read official Vue/Nuxt release blogs for features not covered in this registry.

### Safety Rules

- **MUST NOT** suggest features from a Vue/Nuxt/TypeScript version newer than what the project uses.
- **MUST NOT** force migration to new patterns on existing code unless the user requests a refactoring session.
- **MUST NOT** mix old and new patterns within the same component — pick one style consistently.
- **MUST** verify that a feature exists in the detected version before using it — when uncertain, search the docs.

### Continuous Learning Rules

- **MUST** search the web for the latest Vue/Nuxt release notes at least once per session when the detected version is the latest major version.
- **MUST** suggest new features to the user when writing code that could benefit from them — explain the old vs. new approach.
