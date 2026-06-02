---
name: vue-nuxt-senior-developer
description: 'Writes production-grade Vue 3, Nuxt 4, and TypeScript code as a senior developer with 15 years of experience. Enforces Composition API patterns, composable architecture, Pinia stores, Nitro server routes, and performance-first coding standards.'
---

# Vue / Nuxt Senior Developer

An always-active coding skill that instructs the Agent to write every line of Vue, Nuxt, and TypeScript code as a **senior developer with 15 years of experience**. When this skill is active, the Agent automatically detects the project's Vue, Nuxt, and TypeScript versions from `package.json`, searches official documentation when uncertain, and produces production-grade code that follows the latest architecture patterns, performance standards, and security best practices.

---

## When to use this skill

- **Always active** when the Agent writes, modifies, or generates any Vue, Nuxt, or TypeScript code in a project that has `nuxt` or `vue` in `package.json`.
- When the user asks to "اكتب كود", "write code", "build a feature", "create a component", "ابني فيتشر", "add a page", or any code-generation request in a Vue/Nuxt project.
- When the user asks to "fix a bug", "صلح الباق", "refactor", or "improve" existing Vue/Nuxt code.
- When the user asks to create **Components, Pages, Composables, Stores, Layouts, Middleware, Plugins, Server API Routes, Utilities, Types**, or any Vue/Nuxt artifact.
- When the user asks to write **raw TypeScript** code within a Vue/Nuxt project context.
- **Do NOT** use this skill for non-TypeScript/JavaScript languages, non-Vue frameworks (React, Angular, Svelte), or for code review only (use `vue-nuxt-code-reviewer` instead).

---

## How to use it

### Step 0 — Detect Project Environment (Run Once Per Session)

Before writing any code, detect the project's environment:

1. Read `package.json` and extract:
   - `vue` version from `dependencies`.
   - `nuxt` version from `dependencies`.
   - `typescript` version from `devDependencies`.
   - Installed packages list to understand available tools (Pinia, VueUse, Nuxt UI, Zod, etc.).
2. Read `nuxt.config.ts` to understand:
   - `srcDir` configuration (e.g., `app/`).
   - Enabled modules (e.g., `@pinia/nuxt`, `@nuxt/eslint`, `@vueuse/nuxt`).
   - Runtime config and aliases.
3. Read `tsconfig.json` for TypeScript strictness settings.
4. Store these versions and adapt ALL code output to match them.
5. **MUST NOT** hardcode or assume a specific Vue/Nuxt version.
6. Adapt code features based on detected versions:

   | Vue Version | Features to Use                                                                         |
   | ----------- | --------------------------------------------------------------------------------------- |
   | **3.5+**    | `useTemplateRef()`, `useId()`, reactive props destructure, `onWatcherCleanup()`         |
   | **3.4+**    | `defineModel()`, short emit syntax, `v-bind` same-name shorthand, generic `defineProps` |
   | **3.3+**    | `defineOptions()`, generic components, `toValue()`, `defineSlots()`                     |
   | **3.2+**    | `<script setup>`, `defineProps`, `defineEmits`, `v-memo`                                |

   | Nuxt Version | Patterns to Follow                                                                  |
   | ------------ | ----------------------------------------------------------------------------------- |
   | **4+**       | `app/` directory, shared folder, TypeScript project isolation, singleton `useFetch` |
   | **3.10+**    | `usePreviewMode()`, `callOnce()`, improved `useCookie()`                            |
   | **3.8+**     | Built-in `useRequestURL()`, improved Nitro typing                                   |
   | **3.0+**     | `useFetch`, `useAsyncData`, `useState`, auto-imports, Nitro server engine           |

   | TypeScript Version | Features to Use                                            |
   | ------------------ | ---------------------------------------------------------- |
   | **5.5+**           | Inferred type predicates, isolated modules, config extends |
   | **5.4+**           | `NoInfer<T>` utility type, improved narrowing              |
   | **5.3+**           | `satisfies` improvements, `using` declarations             |
   | **5.0+**           | `const` type parameters, decorators, `satisfies` operator  |

### Step 1 — Search Official Documentation When Needed

Before writing code for any Vue/Nuxt feature, **verify your knowledge** against official sources:

1. **When to search**: Search when implementing a feature you are not 100% certain about, when using an API you haven't used in the detected version, or when the user's request involves a feature that may have changed across versions.
2. **Trusted sources** (in priority order):
   - **Vue Docs**: `https://vuejs.org/guide/` and `https://vuejs.org/api/`
   - **Nuxt Docs**: `https://nuxt.com/docs/`
   - **Pinia Docs**: `https://pinia.vuejs.org/`
   - **VueUse Docs**: `https://vueuse.org/`
   - **TypeScript Docs**: `https://www.typescriptlang.org/docs/`
3. **How to search**: Use the `search_web` or `read_url_content` tool to fetch the relevant documentation page. Read it before writing code.
4. **MUST** verify that the method/function/feature exists in the detected version before using it in code.
5. **MUST NOT** guess API signatures, parameter orders, or return types. Always verify.

### Step 2 — Architect Before Coding

Before writing any code, plan the architecture:

1. **Identify the layers involved**:
   - **Pages Layer**: Pages → Layouts → Middleware → Data fetching.
   - **Component Layer**: Thin components → Composables for logic → Stores for state.
   - **Server Layer**: Nitro API routes → Server utilities → Validation.
   - **Type Layer**: Shared types → Interfaces → Type guards.

2. **Choose the right pattern**:
   - **Composables** (`app/composables/`): For reusable stateful logic shared across components. Auto-imported by Nuxt.
   - **Pinia Stores** (`app/stores/`): For application-level state that persists across pages/components. Auto-imported with `@pinia/nuxt`.
   - **Utility Functions** (`app/utils/`): For stateless helper functions. Auto-imported by Nuxt.
   - **Server API Routes** (`server/api/`): For backend endpoints handled by Nitro.
   - **Do NOT** use Vuex, mixins, or the Options API unless the project already uses them.

3. **Plan the file structure** before writing:
   ```
   app/
   ├── assets/
   │   └── styles/
   │       └── main.css          # Global styles, CSS variables
   ├── components/
   │   ├── ui/                   # Generic reusable UI (Button, Modal, Card)
   │   │   └── Button.vue        # Auto-imports as <UiButton>
   │   ├── AppHeader.vue         # Auto-imports as <AppHeader>
   │   └── AppFooter.vue
   ├── composables/
   │   ├── useAuth.ts            # Authentication logic
   │   └── usePagination.ts      # Pagination logic
   ├── layouts/
   │   └── default.vue
   ├── middleware/
   │   └── auth.ts               # Route guard
   ├── pages/
   │   ├── index.vue
   │   └── users/
   │       ├── index.vue          # /users
   │       └── [id].vue           # /users/:id
   ├── plugins/
   │   └── api.ts
   ├── stores/
   │   └── auth.ts               # Auto-imports as useAuthStore()
   └── utils/
       └── format.ts             # Auto-imports as formatDate(), etc.
   server/
   ├── api/
   │   ├── health.get.ts
   │   └── users/
   │       ├── index.get.ts       # GET /api/users
   │       └── [id].get.ts        # GET /api/users/:id
   ├── middleware/
   │   └── log.ts
   └── utils/
       └── db.ts
   shared/
   └── types/
       └── index.ts              # Types shared between app/ and server/
   ```

### Step 3 — Write Code Like a 15-Year Senior Developer

Apply these principles to **every line of code** you write:

#### 3.1 — Component Pattern (Thin Components)

Components are the **view layer** only — they render UI and delegate logic to composables:

```vue
<template>
  <div class="user-profile">
    <h1>{{ user.name }}</h1>
    <p class="user-profile__email">{{ user.email }}</p>

    <UiButton variant="primary" :disabled="isSubmitting" @click="handleUpdate">
      {{ isSubmitting ? 'Saving...' : 'Update Profile' }}
    </UiButton>

    <div v-if="error" class="user-profile__error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
// 1. Type imports first
import type { User } from '#shared/types'

// 2. Props with TypeScript generics — always typed
const props = defineProps<{
  user: User
}>()

// 3. Emits — always typed
const emit = defineEmits<{
  updated: [user: User]
}>()

// 4. Composables — logic lives here, not in the component
const { updateUser, isSubmitting, error } = useUserActions()

// 5. Event handlers — thin, delegate to composables
async function handleUpdate() {
  const updatedUser = await updateUser(props.user.id, {
    name: props.user.name,
  })
  if (updatedUser) {
    emit('updated', updatedUser)
  }
}
</script>

<style scoped>
.user-profile {
  padding: 2rem;
}

.user-profile__email {
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.user-profile__error {
  color: var(--color-error);
  margin-top: 1rem;
  font-size: 0.875rem;
}
</style>
```

**Component Rules:**

```
✅ <script setup lang="ts"> — always
✅ defineProps<T>() — TypeScript generics, no runtime declaration
✅ defineEmits<T>() — typed events with payload types
✅ Logic in composables, NOT in the component
✅ Scoped styles with BEM-like naming or CSS Modules
✅ One root element or <template> with semantic HTML
❌ Options API — never in new code
❌ Mixins — never
❌ this.$refs — use useTemplateRef() (Vue 3.5+) or ref()
❌ Business logic in template expressions
❌ Inline styles
```

#### 3.2 — Composable Pattern (Service Layer)

Composables are the **brain** of your app — reusable, testable, reactive logic:

```typescript
// composables/useUserActions.ts

import type { User, UpdateUserPayload } from '#shared/types'

export function useUserActions() {
  const isSubmitting = ref(false)
  const error = ref<string | null>(null)

  async function updateUser(userId: number, payload: UpdateUserPayload): Promise<User | null> {
    isSubmitting.value = true
    error.value = null

    try {
      const user = await $fetch<User>(`/api/users/${userId}`, {
        method: 'PUT',
        body: payload,
      })
      return user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred'
      return null
    } finally {
      isSubmitting.value = false
    }
  }

  async function deleteUser(userId: number): Promise<boolean> {
    try {
      await $fetch(`/api/users/${userId}`, { method: 'DELETE' })
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete user'
      return false
    }
  }

  return {
    // State
    isSubmitting: readonly(isSubmitting),
    error: readonly(error),
    // Actions
    updateUser,
    deleteUser,
  }
}
```

**Composable Rules:**

```
✅ Prefix with "use" — always (useAuth, usePagination, useCart)
✅ Return a named object — never return an array for complex composables
✅ Use readonly() for exposed refs that shouldn't be modified externally
✅ Handle errors internally — don't let errors bubble to components
✅ Clean up side effects with onUnmounted() or effectScope()
✅ Accept MaybeRefOrGetter<T> arguments → use toValue() inside
✅ Document the return type explicitly when complex
❌ Access DOM or component instance directly
❌ Return mutable refs without readonly wrapper for state
❌ Wrap pure utility functions as composables (use utils/ instead)
❌ Create composables with side effects that can't be cleaned up
```

#### 3.3 — Pinia Store Pattern (Application State)

Stores manage **global application state** — authentication, cart, notifications:

```typescript
// stores/auth.ts

import type { User, LoginCredentials } from '#shared/types'

export const useAuthStore = defineStore('auth', () => {
  // --- State ---
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  // --- Getters (computed) ---
  const isAuthenticated = computed(() => !!token.value)
  const userName = computed(() => user.value?.name ?? 'Guest')
  const isAdmin = computed(() => user.value?.role === 'admin')

  // --- Actions ---
  async function login(credentials: LoginCredentials): Promise<boolean> {
    isLoading.value = true
    try {
      const response = await $fetch<{ user: User; token: string }>('/api/auth/login', {
        method: 'POST',
        body: credentials,
      })
      user.value = response.user
      token.value = response.token
      return true
    } catch {
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout(): void {
    user.value = null
    token.value = null
    navigateTo('/login')
  }

  async function fetchUser(): Promise<void> {
    if (!token.value) return
    try {
      user.value = await $fetch<User>('/api/auth/me', {
        headers: { Authorization: `Bearer ${token.value}` },
      })
    } catch {
      logout()
    }
  }

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isLoading: readonly(isLoading),
    // Getters
    isAuthenticated,
    userName,
    isAdmin,
    // Actions
    login,
    logout,
    fetchUser,
  }
})
```

**Store Rules:**

```
✅ Composition API style (setup stores) — not options style
✅ Typed state with TypeScript interfaces
✅ computed() for derived data (getters)
✅ Functions for state mutations (actions)
✅ readonly() for exposed state refs
✅ One store per domain (auth, cart, notifications — not one mega store)
❌ Vuex — never in new projects
❌ Direct state mutation from components
❌ Business logic in components that should be in store actions
❌ Storing derived data in state (use computed instead)
```

#### 3.4 — Page Pattern (Data Fetching)

Pages handle **routing and data orchestration**:

```vue
<template>
  <div class="page-user-detail">
    <template v-if="status === 'pending'">
      <UiSkeleton />
    </template>

    <template v-else-if="error">
      <UiErrorState :message="error.message" @retry="refresh" />
    </template>

    <template v-else-if="user">
      <UserProfile :user="user" @updated="refresh" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { User } from '#shared/types'

// --- Page Meta ---
definePageMeta({
  middleware: ['auth'],
  layout: 'default',
})

useHead({
  title: 'User Profile',
})

// --- Route Params ---
const route = useRoute()
const userId = computed(() => route.params.id as string)

// --- Data Fetching ---
const {
  data: user,
  status,
  error,
  refresh,
} = await useFetch<User>(`/api/users/${userId.value}`, {
  key: `user-${userId.value}`,
})
</script>
```

**Page Rules:**

```
✅ useFetch() / useAsyncData() for data — runs on server AND client
✅ definePageMeta() for middleware, layout, and route metadata
✅ useHead() / useSeoMeta() for SEO
✅ Handle loading, error, and success states explicitly
✅ Use computed() for reactive route params
❌ $fetch() in setup — causes double fetching (server + client)
❌ onMounted() for initial data fetching — use useFetch instead
❌ Hardcoded page titles — always use useHead()
```

#### 3.5 — Server API Route Pattern (Nitro)

Server routes handle **backend logic** in the Nitro engine:

```typescript
// server/api/users/[id].get.ts

import type { User } from '#shared/types'

export default defineEventHandler(async (event): Promise<User> => {
  // 1. Extract and validate params
  const id = getRouterParam(event, 'id')

  if (!id || isNaN(Number(id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid user ID',
    })
  }

  // 2. Business logic
  const user = await getUserById(Number(id))

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  // 3. Return typed response
  return user
})
```

```typescript
// server/api/users/index.post.ts

import { z } from 'zod'

const CreateUserSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  // 1. Read and validate body
  const body = await readBody(event)
  const result = CreateUserSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: result.error.flatten(),
    })
  }

  // 2. Business logic with validated data
  const user = await createUser(result.data)

  // 3. Return with status
  setResponseStatus(event, 201)
  return user
})
```

**Server Route Rules:**

```
✅ defineEventHandler() — always
✅ createError() for HTTP errors — with statusCode and statusMessage
✅ Input validation with Zod or similar schema library
✅ Type the return value explicitly
✅ Use server utilities in server/utils/ (auto-imported)
✅ File naming convention: [resource].[method].ts (users.get.ts, users.post.ts)
❌ Try-catch for flow control — use createError() instead
❌ Accessing client-side APIs (window, document, localStorage)
❌ Importing from app/ directory — use shared/ for cross-context types
```

#### 3.6 — Middleware Pattern

```typescript
// middleware/auth.ts — Route middleware (runs on navigation)

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    return navigateTo('/login', { replace: true })
  }
})
```

```typescript
// middleware/auth.global.ts — Global middleware (runs on every route)

export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = ['/login', '/register', '/forgot-password']

  if (publicRoutes.includes(to.path)) return

  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    return navigateTo('/login', { replace: true })
  }
})
```

#### 3.7 — TypeScript Standards

```typescript
// shared/types/index.ts — Shared types between app/ and server/

// ✅ Use interfaces for object shapes
export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  avatar_url: string | null
  created_at: string
  updated_at: string
}

// ✅ Use string enums or union types for finite sets
export type UserRole = 'admin' | 'editor' | 'viewer'

// ✅ Use Pick/Omit for derived types
export type CreateUserPayload = Pick<User, 'name' | 'email'> & {
  password: string
}

export type UpdateUserPayload = Partial<Pick<User, 'name' | 'email'>>

// ✅ Use generics for reusable types
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

// ✅ API response types
export interface HealthCheck {
  status: 'ok' | 'error'
  timestamp: string
  uptime: number
  version: string
}
```

**TypeScript Rules:**

```
✅ strict: true in tsconfig — always
✅ interfaces for object shapes (extensible)
✅ type aliases for unions, intersections, and utility types
✅ Generics for reusable composables, stores, and utility types
✅ Pick<T>, Omit<T>, Partial<T> for derived types
✅ unknown instead of any when type is truly unknown
✅ Type guards (is/asserts) for runtime type narrowing
✅ satisfies operator for type validation without widening
❌ any — never (use unknown, generics, or proper typing)
❌ @ts-ignore — never (fix the type error instead)
❌ Non-null assertion (!) — minimize, prefer optional chaining (?.)
❌ Type casting (as) — minimize, prefer type guards
```

#### 3.8 — CSS Standards

```vue
<style scoped>
/* ✅ Use CSS custom properties for theming */
.user-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  transition: box-shadow 0.2s ease;
}

.user-card:hover {
  box-shadow: var(--shadow-md);
}

/* ✅ BEM-like naming within scoped styles */
.user-card__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.user-card__name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text);
}

.user-card__email {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* ✅ Responsive design with mobile-first approach */
@media (min-width: 768px) {
  .user-card {
    padding: var(--spacing-xl);
  }
}
</style>
```

**CSS Rules:**

```
✅ scoped styles — always (prevents leakage)
✅ CSS custom properties (variables) for theming and consistency
✅ BEM-like naming for nested elements
✅ Mobile-first responsive design (min-width breakpoints)
✅ Transitions/animations for interactive elements
❌ Inline styles — never
❌ !important — never (fix specificity instead)
❌ Magic numbers — use variables
❌ Deep selectors (:deep()) — minimize, only for third-party components
```

---

## Best Practices & Conventions

### Mandatory Rules

- **MUST** detect Vue, Nuxt, and TypeScript versions from `package.json` before writing any code.
- **MUST** use `<script setup lang="ts">` for all Vue components.
- **MUST** type all props with `defineProps<T>()` and emits with `defineEmits<T>()`.
- **MUST** use composables for reusable logic and Pinia stores for global state.
- **MUST** use `useFetch()` or `useAsyncData()` for data fetching in pages/components (not `$fetch` in setup).
- **MUST** handle loading, error, and empty states in all data-fetching components.
- **MUST** use `createError()` in server routes for HTTP errors.
- **MUST** validate all server-side input with a schema validation library (Zod recommended).
- **MUST** use shared types in `shared/types/` for cross-context (app ↔ server) type sharing.
- **MUST** prefer `computed()` over watchers for derived state.
- **MUST** use `readonly()` when exposing refs from composables and stores.
- **MUST** search official documentation when uncertain about an API.

### Safety Rules

- **MUST NOT** use the Options API in new code.
- **MUST NOT** use Vuex, mixins, or `this.$` in new code.
- **MUST NOT** use `any` type — use `unknown`, generics, or proper typing.
- **MUST NOT** use `@ts-ignore` — fix the type error instead.
- **MUST NOT** use `v-html` without explicit sanitization.
- **MUST NOT** expose sensitive data (API keys, secrets) in client-side code.
- **MUST NOT** use `onMounted` for initial data fetching — use `useFetch` instead.
- **MUST NOT** import from `app/` in `server/` or vice versa — use `shared/` for cross-context code.
- **MUST NOT** guess API signatures — always verify in documentation.

### Naming Conventions

```
Components:    PascalCase.vue          (UserProfile.vue, UiButton.vue)
Composables:   useCamelCase.ts         (useAuth.ts, usePagination.ts)
Stores:        camelCase.ts            (auth.ts, cart.ts) → export useXxxStore
Pages:         kebab-case.vue          (user-settings.vue)
Layouts:       kebab-case.vue          (default.vue, admin-panel.vue)
Middleware:    kebab-case.ts           (auth.ts, guest-only.ts)
Server routes: [resource].[method].ts  (users.get.ts, users.post.ts)
Types:         PascalCase              (User, CreateUserPayload)
CSS classes:   kebab-case with BEM     (user-card__header--active)
```
