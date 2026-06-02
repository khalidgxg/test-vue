---
name: vue-nuxt-code-reviewer
description: "Reviews Vue 3, Nuxt 4, and TypeScript code changes for quality, performance bottlenecks, reactivity issues, hydration problems, and future risks. Analyzes modified files and delivers actionable feedback."
---

# Vue / Nuxt Code Reviewer

A dedicated code review skill for Vue 3 / Nuxt 4 / TypeScript projects. When invoked after completing a feature or hotfix, it scans all modified files, understands the intent behind each change, and delivers a structured review covering code quality, performance, reactivity correctness, SSR safety, and future risk scenarios — all aligned with Vue/Nuxt conventions and professional engineering standards.

---

## When to use this skill

- When the user says "راجع الكود", "مراجعة الكود", "راجع الاداء", "review my code", "check my changes", "شيك التعديلات", or "code review".
- When the user finishes a **feature**, **hotfix**, **refactor**, or **pull request** and wants a thorough review before merging.
- When the user asks to **check performance**, **find bottlenecks**, or **predict future problems** in Vue/Nuxt code.
- When the user asks to **review a specific file or set of files** in a Vue/Nuxt project.
- When the user pushes changes and wants to know if anything **hidden could break or be affected**.
- **Do NOT** use this skill to write new features, fix bugs, or generate code. This skill only **reviews and reports**.

---

## How to use it

Follow these steps **in exact order** for every code review request:

### Step 0 — Detect Vue, Nuxt & TypeScript Version (Critical First Step)

Before reviewing any code, detect the project's versions automatically:

1. Read `package.json` and extract `vue`, `nuxt`, and `typescript` versions.
2. Read `nuxt.config.ts` for enabled modules and configuration.
3. Store these versions and use them throughout the review to apply **version-appropriate rules**.
4. **MUST NOT** hardcode or assume a specific version. Always detect dynamically.
5. **MUST NOT** recommend features that don't exist in the detected version.

**Version Compatibility Matrix:**

| Vue | Key Features to Verify |
|---|---|
| **3.5+** | `useTemplateRef()` usage, reactive props destructure, `useId()`, `onWatcherCleanup()` |
| **3.4+** | `defineModel()`, short emit, `v-bind` shorthand, generic `defineProps` |
| **3.3+** | `defineOptions()`, `defineSlots()`, `toValue()`, generic components |
| **3.2+** | `<script setup>`, `v-memo`, `defineProps/defineEmits` |

| Nuxt | Key Features to Verify |
|---|---|
| **4+** | `app/` directory, shared types isolation, singleton `useFetch` |
| **3.10+** | `callOnce()`, `usePreviewMode()` |
| **3.8+** | `useRequestURL()`, improved Nitro types |

### Step 1 — Identify Changed Files

1. Ask the user which files were modified, OR detect them automatically:
   ```bash
   git diff --name-only HEAD~1
   git diff --name-only --cached
   git diff --name-only
   ```
2. List all modified files and categorize them by type:
   - **Components** (`app/components/`)
   - **Pages** (`app/pages/`)
   - **Composables** (`app/composables/`)
   - **Stores** (`app/stores/`)
   - **Layouts** (`app/layouts/`)
   - **Middleware** (`app/middleware/`)
   - **Plugins** (`app/plugins/`)
   - **Server Routes** (`server/api/`)
   - **Server Middleware** (`server/middleware/`)
   - **Types** (`shared/types/`)
   - **Config** (`nuxt.config.ts`, `tsconfig.json`)
   - **Tests** (`tests/`)
   - **Styles** (`app/assets/`)
   - **Other**

### Step 2 — Understand the Intent

1. Read each modified file's diff carefully.
2. Determine the **purpose of the change**: new feature, bug fix, refactor, performance improvement, or configuration change.
3. Document a one-line summary of what each file change accomplishes.

### Step 3 — Review Code Quality

For each modified file, evaluate the following and report findings:

#### 3.1 — Naming & Readability
- Verify that naming follows **Vue/Nuxt conventions**:
  - Components: `PascalCase.vue` (e.g., `UserProfile.vue`, `UiButton.vue`)
  - Composables: `useCamelCase.ts` with `use` prefix (e.g., `useAuth.ts`)
  - Stores: `camelCase.ts` with `useXxxStore` export (e.g., `useAuthStore`)
  - Pages: `kebab-case.vue` or `[param].vue` for dynamic routes
  - Server routes: `[resource].[method].ts` (e.g., `users.get.ts`)
  - Types: `PascalCase` (e.g., `User`, `CreateUserPayload`)
- Flag any **magic numbers**, **hardcoded strings**, or **unclear variable names**.
- Flag components that are doing too much (God Components).

#### 3.2 — Structure & Architecture
- Verify that **business logic is NOT in components**. Components should only handle UI rendering.
- Verify that complex logic is extracted into **composables** or **store actions**.
- Flag any **prop drilling** deeper than 2-3 levels. Recommend Pinia or provide/inject.
- Verify proper use of `defineProps<T>()` and `defineEmits<T>()` with TypeScript generics.
- Verify **Single Responsibility** — each component/composable does one thing.
- Flag use of Options API, mixins, or Vuex in new code.

#### 3.3 — TypeScript & Type Safety
- Verify that all files use TypeScript (`lang="ts"` in `<script setup>`).
- Verify that **all props and emits** are typed with TypeScript generics.
- Flag any `any` type — require `unknown`, proper types, or generics.
- Flag `@ts-ignore` or `@ts-expect-error` — require proper type fixes.
- Verify that shared types are in `shared/types/` for cross-context sharing.
- Flag excessive type casting (`as`) — prefer type guards.
  ```typescript
  // ❌ BAD — Unsafe type casting
  const user = data as User

  // ✅ GOOD — Type guard
  function isUser(data: unknown): data is User {
    return typeof data === 'object' && data !== null && 'id' in data
  }
  ```

#### 3.4 — Error Handling
- Verify that `useFetch`/`useAsyncData` responses handle `error` state in templates.
- Verify that composables with async operations use try-catch.
- Verify that server routes use `createError()` for HTTP errors.
- Flag any bare `catch` that silently swallows errors without handling.

### Step 4 — Review Performance (Critical)

#### 4.1 — Component Rendering Performance
- **Unnecessary re-renders**: Flag components that re-render too frequently. Check for:
  - Missing `v-memo` on expensive list items.
  - Wrong `:key` usage in `v-for` (using index instead of unique ID).
  - Inline object/array creation in templates causing re-renders.
  ```vue
  <!-- ❌ BAD — Creates new object every render, child always re-renders -->
  <UserCard :style="{ color: 'red' }" :config="{ showAvatar: true }" />

  <!-- ✅ GOOD — Static object reference -->
  <UserCard :style="cardStyle" :config="cardConfig" />
  ```
- **Heavy components**: Flag components imported synchronously that should use `defineAsyncComponent()`.
  ```typescript
  // ❌ BAD — Heavy chart library loaded eagerly
  import HeavyChart from '~/components/HeavyChart.vue'

  // ✅ GOOD — Lazy loaded, reduces initial bundle
  const HeavyChart = defineAsyncComponent(
    () => import('~/components/HeavyChart.vue'),
  )
  ```
- **Large lists**: Flag `v-for` with 100+ items that should use virtual scrolling.
- **v-if vs v-show**: Flag `v-if` on elements that toggle frequently (should be `v-show`). Flag `v-show` on elements that toggle rarely (should be `v-if`).

#### 4.2 — Reactivity Performance
- **Deep reactivity overhead**: Flag `ref()` / `reactive()` on large objects that don't need deep tracking.
  ```typescript
  // ❌ BAD — Deep reactivity on large dataset (tracks every nested property)
  const users = ref<User[]>(largeUserArray)

  // ✅ GOOD — Shallow reactivity (only tracks array itself, not nested properties)
  const users = shallowRef<User[]>(largeUserArray)
  ```
- **Computed vs Watchers**: Flag `watch()` that computes derived state — should be `computed()`.
  ```typescript
  // ❌ BAD — Using watch to sync derived state
  const fullName = ref('')
  watch([firstName, lastName], ([f, l]) => {
    fullName.value = `${f} ${l}`
  })

  // ✅ GOOD — Computed property (memoized, no extra ref)
  const fullName = computed(() => `${firstName.value} ${lastName.value}`)
  ```
- **Unnecessary watchers**: Flag `watch` with `{ deep: true }` on large objects. Prefer watching specific properties.
- **Memory leaks**: Flag event listeners or intervals in `<script setup>` without cleanup in `onUnmounted()`.

#### 4.3 — Data Fetching Performance
- **Double fetching**: Flag `$fetch()` in component setup (runs on both server and client). Use `useFetch()` instead.
  ```typescript
  // ❌ BAD — Runs on server AND client (double request)
  const data = await $fetch('/api/users')

  // ✅ GOOD — Runs on server, serializes to client (one request)
  const { data } = await useFetch('/api/users')
  ```
- **Waterfall requests**: Flag sequential `useFetch` calls that should be parallel.
  ```typescript
  // ❌ BAD — Sequential (waterfall)
  const { data: users } = await useFetch('/api/users')
  const { data: posts } = await useFetch('/api/posts')

  // ✅ GOOD — Parallel
  const [{ data: users }, { data: posts }] = await Promise.all([
    useFetch('/api/users'),
    useFetch('/api/posts'),
  ])
  ```
- **Missing cache keys**: Flag `useFetch` without explicit `key` when the same endpoint is called from multiple components.
- **Over-fetching**: Flag API calls that return more data than needed.

#### 4.4 — Bundle Size
- **Tree-shaking**: Flag star imports (`import * as`) from large libraries.
  ```typescript
  // ❌ BAD — Imports entire library
  import * as lodash from 'lodash'

  // ✅ GOOD — Tree-shakeable import
  import { debounce } from 'lodash-es'
  ```
- **Dynamic imports for routes**: Verify that page components are not imported eagerly in non-page files.
- **Large dependencies**: Flag large libraries that have lighter alternatives.

#### 4.5 — SSR & Hydration
- **Hydration mismatches**: Flag code that produces different output on server vs client.
  ```typescript
  // ❌ BAD — Produces different dates on server and client
  const now = new Date().toLocaleString()

  // ✅ GOOD — Use useState for consistent SSR state
  const now = useState('now', () => new Date().toISOString())
  ```
- **Browser APIs in setup**: Flag direct use of `window`, `document`, `localStorage` outside `onMounted()` or `<ClientOnly>`.
  ```typescript
  // ❌ BAD — Crashes on server (no window)
  const width = window.innerWidth

  // ✅ GOOD — Wrapped in onMounted
  const width = ref(0)
  onMounted(() => {
    width.value = window.innerWidth
  })
  ```
- **`<ClientOnly>` usage**: Verify that browser-only components are wrapped in `<ClientOnly>`.
- **Async state**: Flag shared reactive state in module scope (persists across requests in SSR).

### Step 5 — Review Security

1. **XSS**: Flag any `v-html` usage without explicit sanitization. Require DOMPurify or similar.
2. **Secrets exposure**: Flag any API keys, tokens, or secrets in client-side code. Must use `runtimeConfig` with server-only secrets.
   ```typescript
   // ❌ BAD — Secret exposed to client
   const apiKey = 'sk_live_xxx'

   // ✅ GOOD — Server-only via runtimeConfig
   const config = useRuntimeConfig()
   // config.apiSecret — only available on server
   // config.public.appName — available on client
   ```
3. **Input validation**: Flag server routes that process user input without validation.
4. **CORS/Headers**: Verify that server routes set appropriate security headers.
5. **Authentication**: Flag protected pages/routes without auth middleware.

### Step 6 — Generate Report

Output a structured report:

```markdown
# 🔍 Vue/Nuxt Code Review Report

## 📋 Summary
- **Files Reviewed**: [count]
- **Overall Score**: [⭐ out of 5]
- **Critical Issues**: [count]
- **Warnings**: [count]
- **Suggestions**: [count]

## 🔴 Critical Issues

### [Issue Title]
- **File**: `path/to/file.vue:L42`
- **Category**: [Performance / Security / Reactivity / Hydration / Type Safety]
- **Issue**: [What's wrong]
- **Impact**: [Why it matters]
- **Before**: [Current code]
- **After**: [Fixed code]

## 🟡 Warnings
[Same format as critical issues]

## 💡 Suggestions
[Same format as critical issues]

## 📊 Category Scorecard
| Category | Score | Notes |
|---|---|---|
| Component Quality | ⭐⭐⭐⭐⭐ | |
| TypeScript Safety | ⭐⭐⭐⭐⭐ | |
| Performance | ⭐⭐⭐⭐⭐ | |
| Reactivity | ⭐⭐⭐⭐⭐ | |
| SSR/Hydration | ⭐⭐⭐⭐⭐ | |
| Security | ⭐⭐⭐⭐⭐ | |
| Data Fetching | ⭐⭐⭐⭐⭐ | |
```

---

## Best Practices & Conventions

### Severity Classification

| Severity | Criteria | Action |
|---|---|---|
| 🔴 **Critical** | Security vulnerability (XSS, exposed secrets) | Must fix before merge |
| 🔴 **Critical** | Hydration mismatch causing client errors | Must fix before merge |
| 🔴 **Critical** | Memory leak (unbounded watchers, missing cleanup) | Must fix before merge |
| 🟡 **Warning** | Performance issue (unnecessary re-renders, deep reactivity) | Should fix |
| 🟡 **Warning** | Type safety issue (any, @ts-ignore) | Should fix |
| 🟡 **Warning** | Architecture violation (logic in component, prop drilling) | Should refactor |
| 💡 **Suggestion** | Minor improvement (naming, code style) | Nice to have |
| 💡 **Suggestion** | Modern pattern available (defineModel, useTemplateRef) | Consider upgrading |

### Mandatory Rules
- **MUST** detect project versions before reviewing.
- **MUST** categorize every finding by severity.
- **MUST** provide before/after code for every issue.
- **MUST NOT** recommend features from versions newer than detected.
- **MUST NOT** report style/formatting issues — that's ESLint/Prettier's job.
