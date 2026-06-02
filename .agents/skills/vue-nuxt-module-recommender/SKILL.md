---
name: vue-nuxt-module-recommender
description: 'Recommends trusted Vue and Nuxt modules, packages, and composable libraries when detecting code patterns or feature requests that could benefit from an existing solution. Suggests official Nuxt modules, VueUse, and community-vetted packages to save development time.'
---

# Vue / Nuxt Module Recommender

An advisory skill that monitors code-generation requests and detects when a well-known, battle-tested Vue/Nuxt module or package could replace custom implementation. Instead of writing boilerplate code from scratch, this skill recommends the right module — saving hours of development, reducing bugs, and leveraging community-maintained solutions.

---

## When to use this skill

- When the user asks to **build a feature** that a well-known module already solves (e.g., "add authentication", "add image optimization", "internationalization").
- When the Agent is about to **write custom code** for a problem that has an established module solution (e.g., writing a custom debounce, building a media upload system).
- When the user asks "ما هي أفضل مكتبة لـ...", "is there a module for...", "what package should I use for...".
- When the Agent detects a **pattern** in the codebase that indicates a module need (e.g., many manual `fetch` calls that could use `ofetch`, repeated localStorage logic that VueUse handles).
- **Do NOT** recommend modules for trivial tasks that Vue/Nuxt already handles natively (e.g., basic routing, auto-imports, simple state with `ref()`).

---

## How to use it

### Step 0 — Detect Before You Build

Before writing **any** custom implementation for a common feature, check the Module Registry below. If a trusted module exists:

1. **Pause** before implementing.
2. **Suggest** the module to the user with a brief explanation of why.
3. **Wait** for user confirmation before installing or using.
4. **Never** install modules silently — always propose first.

### Step 1 — Recommend with Context

When recommending a module, provide:

1. **Module name**: Full npm name (e.g., `@vueuse/nuxt`).
2. **Why it's better**: What the module does that custom code would take hours to build.
3. **One-line install**: `npm install module-name` or `npx nuxi module add module-name`.
4. **Quick usage example**: A 3-5 line code snippet showing basic usage.
5. **Docs link**: Link to official documentation.

**Recommendation format:**

```
📦 Recommended Module: {module-name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Why: {reason — what it saves you from building}
Install: npm install {module-name}
Docs: {documentation-url}

Quick example:
{3-5 line code snippet}
```

### Step 2 — Verify Compatibility

Before recommending, always verify:

1. **Check `package.json`** for the project's Vue, Nuxt, and Node versions.
2. **Search the web** for the module's latest version and compatibility.
3. **Only recommend** modules that support the project's detected versions.
4. **Check if already installed**: Search `package.json` → `dependencies` and `devDependencies`. Do not recommend modules already in the project.

### Step 3 — Respect User Decision

- If the user **accepts**: Install with `npm install` and guide implementation.
- If the user **declines**: Proceed to write clean custom code following `vue-nuxt-senior-developer` skill standards.
- **Never force** a module — some projects have dependency restrictions or prefer minimal dependencies.

---

## Module Registry

This is the curated list of trusted, production-grade modules and packages organized by problem domain. All are actively maintained, well-documented, and battle-tested.

### 1 — Utility Composables (VueUse)

| Trigger Pattern                                                                                   | Module         | Install                            |
| ------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------- |
| User needs common composables: debounce, throttle, localStorage, clipboard, resize observer, etc. | `@vueuse/nuxt` | `npx nuxi module add @vueuse/nuxt` |

**Why not custom?** VueUse provides 200+ composables covering browser APIs, sensors, animations, state, and more. Writing them manually is reinventing the wheel.

```typescript
// Auto-imported with @vueuse/nuxt
const { width, height } = useWindowSize()
const isDark = useDark()
const { copy, copied } = useClipboard()
const debouncedSearch = useDebounceFn(handleSearch, 300)
const { data, isFinished } = useLocalStorage('user-prefs', { theme: 'dark' })
```

**Docs:** https://vueuse.org/

---

### 2 — UI Component Library

| Trigger Pattern                                             | Module     | Install                        |
| ----------------------------------------------------------- | ---------- | ------------------------------ |
| User asks for UI components, design system, form components | `@nuxt/ui` | `npx nuxi module add @nuxt/ui` |

**Why not custom?** Building accessible, responsive, themed components from scratch takes weeks. Nuxt UI provides 50+ components with dark mode, keyboard navigation, and Tailwind integration.

```vue
<template>
  <UButton label="Click me" color="primary" variant="solid" />
  <UInput v-model="search" placeholder="Search..." icon="i-heroicons-magnifying-glass" />
  <UTable :rows="users" :columns="columns" />
</template>
```

**Alternative:** `PrimeVue` for framework-agnostic UI, `shadcn-vue` for headless/customizable components.

**Docs:** https://ui.nuxt.com/

---

### 3 — Form Validation

| Trigger Pattern                                                    | Module | Install           |
| ------------------------------------------------------------------ | ------ | ----------------- |
| User asks for form validation, schema validation, input validation | `zod`  | `npm install zod` |

**Why not custom?** Schema-based validation with type inference, composable schemas, and error formatting. Works on both client and server.

```typescript
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  age: z.number().int().min(18).optional(),
})

type User = z.infer<typeof UserSchema> // Auto-generates TypeScript type

// Server-side validation
const result = UserSchema.safeParse(body)
if (!result.success) {
  throw createError({ statusCode: 422, data: result.error.flatten() })
}
```

**Alternative:** `valibot` (smaller bundle, similar API), `yup` (legacy but stable).

**Docs:** https://zod.dev/

---

### 4 — Image Optimization

| Trigger Pattern                                                              | Module        | Install                           |
| ---------------------------------------------------------------------------- | ------------- | --------------------------------- |
| User asks for image optimization, responsive images, lazy loading, WebP/AVIF | `@nuxt/image` | `npx nuxi module add @nuxt/image` |

**Why not custom?** Automatic format conversion (WebP/AVIF), responsive srcset, lazy loading, and CDN provider support.

```vue
<template>
  <NuxtImg
    src="/images/hero.jpg"
    width="800"
    height="400"
    format="webp"
    quality="80"
    loading="lazy"
    placeholder
  />
</template>
```

**Docs:** https://image.nuxt.com/

---

### 5 — SEO & Meta Tags

| Trigger Pattern                                                     | Module        | Install                           |
| ------------------------------------------------------------------- | ------------- | --------------------------------- |
| User asks for SEO, sitemap, robots.txt, Open Graph, structured data | `@nuxtjs/seo` | `npx nuxi module add @nuxtjs/seo` |

**Why not custom?** Comprehensive SEO toolkit: sitemap generation, robots.txt, Open Graph images, schema.org structured data, and canonical URLs — all auto-configured.

```typescript
// In nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo'],
  site: {
    url: 'https://example.com',
    name: 'My Website',
    description: 'A great website',
  },
})
```

**Docs:** https://nuxtseo.com/

---

### 6 — Internationalization (i18n)

| Trigger Pattern                                                   | Module         | Install                            |
| ----------------------------------------------------------------- | -------------- | ---------------------------------- |
| User asks for multi-language, translations, RTL, locale switching | `@nuxtjs/i18n` | `npx nuxi module add @nuxtjs/i18n` |

**Why not custom?** Full i18n with lazy-loaded locales, SEO-friendly URL prefixes, RTL support, and pluralization.

```vue
<template>
  <h1>{{ $t('welcome') }}</h1>
  <NuxtLink :to="switchLocalePath('ar')">العربية</NuxtLink>
</template>
```

**Docs:** https://i18n.nuxtjs.org/

---

### 7 — Authentication

| Trigger Pattern                                      | Module            | Install                               |
| ---------------------------------------------------- | ----------------- | ------------------------------------- |
| User asks for auth, login, OAuth, session management | `nuxt-auth-utils` | `npx nuxi module add nuxt-auth-utils` |

**Why not custom?** Secure session management, OAuth providers (GitHub, Google, etc.), and server-side session handling with zero client-side token exposure.

```typescript
// server/routes/auth/github.get.ts
export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, { user })
    return sendRedirect(event, '/')
  },
})
```

**Alternative:** `sidebase/nuxt-auth` for JWT/token-based auth with NextAuth.js-like API.

**Docs:** https://github.com/atinux/nuxt-auth-utils

---

### 8 — Icons

| Trigger Pattern                              | Module       | Install                          |
| -------------------------------------------- | ------------ | -------------------------------- |
| User asks for icons, SVG icons, icon library | `@nuxt/icon` | `npx nuxi module add @nuxt/icon` |

**Why not custom?** Access to 200,000+ icons from Iconify with on-demand loading, SSR support, and zero bundle bloat.

```vue
<template>
  <Icon name="heroicons:heart" class="text-red-500" />
  <Icon name="mdi:github" size="24" />
</template>
```

**Docs:** https://nuxt.com/modules/icon

---

### 9 — Fonts

| Trigger Pattern                                             | Module        | Install                           |
| ----------------------------------------------------------- | ------------- | --------------------------------- |
| User asks for custom fonts, Google Fonts, font optimization | `@nuxt/fonts` | `npx nuxi module add @nuxt/fonts` |

**Why not custom?** Automatic font optimization, self-hosting, and preloading. Eliminates FOUT/FOIT and improves CLS.

```typescript
// nuxt.config.ts — fonts are auto-detected from CSS
export default defineNuxtConfig({
  modules: ['@nuxt/fonts'],
})
```

**Docs:** https://fonts.nuxt.com/

---

### 10 — Content Management (CMS)

| Trigger Pattern                                          | Module          | Install                             |
| -------------------------------------------------------- | --------------- | ----------------------------------- |
| User asks for blog, documentation, Markdown content, CMS | `@nuxt/content` | `npx nuxi module add @nuxt/content` |

**Why not custom?** File-based CMS with Markdown/MDC, full-text search, content navigation, and Vue component embedding in Markdown.

```vue
<template>
  <ContentDoc />
</template>
```

**Docs:** https://content.nuxt.com/

---

### 11 — Date & Time

| Trigger Pattern                                                 | Module  | Install             |
| --------------------------------------------------------------- | ------- | ------------------- |
| User asks for date formatting, relative time, date manipulation | `dayjs` | `npm install dayjs` |

**Why not custom?** Lightweight (2KB), immutable, chainable date library with locale and plugin support.

```typescript
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
const formatted = dayjs(date).format('YYYY-MM-DD')
const ago = dayjs(date).fromNow() // "3 hours ago"
```

**Alternative:** `date-fns` for tree-shakeable, functional approach.

**Docs:** https://day.js.org/

---

### 12 — Animation & Motion

| Trigger Pattern                                                  | Module           | Install                      |
| ---------------------------------------------------------------- | ---------------- | ---------------------------- |
| User asks for animations, transitions, motion, scroll animations | `@vueuse/motion` | `npm install @vueuse/motion` |

**Why not custom?** Declarative motion directives with spring physics, gesture support, and SSR safety.

```vue
<template>
  <div v-motion-slide-bottom>Slides in from bottom on mount</div>
</template>
```

**Alternative:** `gsap` for complex timeline animations, `lottie-web` for After Effects animations.

**Docs:** https://motion.vueuse.org/

---

### 13 — Charts & Visualization

| Trigger Pattern                                  | Module        | Install                            |
| ------------------------------------------------ | ------------- | ---------------------------------- |
| User asks for charts, graphs, data visualization | `vue-chartjs` | `npm install vue-chartjs chart.js` |

**Why not custom?** Reactive Chart.js wrapper for Vue with TypeScript support and all chart types.

```vue
<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js'
Chart.register(BarElement, CategoryScale, LinearScale)
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
```

**Alternative:** `@antv/g2` for grammar-of-graphics approach, `echarts` via `vue-echarts` for enterprise dashboards.

**Docs:** https://vue-chartjs.org/

---

### 14 — Testing

| Trigger Pattern                                          | Module                       | Install                                                  |
| -------------------------------------------------------- | ---------------------------- | -------------------------------------------------------- |
| User asks for unit tests, component tests, testing setup | `vitest` + `@vue/test-utils` | `npm install -D vitest @vue/test-utils @nuxt/test-utils` |

**Why not custom?** Vitest is the standard test runner for Vue/Nuxt with Vite-native speed, and `@vue/test-utils` provides component mounting, event simulation, and assertion helpers.

```typescript
import { mount } from '@vue/test-utils'
import UserCard from '~/components/UserCard.vue'

describe('UserCard', () => {
  it('renders user name', () => {
    const wrapper = mount(UserCard, {
      props: { user: { name: 'Khalid', email: 'khalid@test.com' } },
    })
    expect(wrapper.text()).toContain('Khalid')
  })
})
```

**Docs:** https://vitest.dev/ | https://test-utils.vuejs.org/

---

### 15 — DevTools

| Trigger Pattern                                                               | Module           | Install              |
| ----------------------------------------------------------------------------- | ---------------- | -------------------- |
| User asks for debugging, devtools, component inspector, performance profiling | `@nuxt/devtools` | Built-in with Nuxt 4 |

**Why essential?** Visual component tree, Pinia state inspector, route visualization, API playground, and performance profiling — all in-browser.

```typescript
// Already enabled by default in Nuxt 4
// Toggle with Shift + Alt + D in browser
```

**Docs:** https://devtools.nuxt.com/

---

### 16 — Styling (Tailwind CSS)

| Trigger Pattern                               | Module                | Install                                   |
| --------------------------------------------- | --------------------- | ----------------------------------------- |
| User asks for Tailwind CSS, utility-first CSS | `@nuxtjs/tailwindcss` | `npx nuxi module add @nuxtjs/tailwindcss` |

**Why not custom?** Zero-config Tailwind integration with HMR, PurgeCSS, and Nuxt-aware content paths.

**Alternative:** `@unocss/nuxt` for faster, more flexible atomic CSS engine.

**Docs:** https://tailwindcss.nuxtjs.org/

---

### 17 — WebSocket / Real-Time

| Trigger Pattern                                        | Module             | Install                        |
| ------------------------------------------------------ | ------------------ | ------------------------------ |
| User asks for real-time, WebSocket, live updates, chat | `socket.io-client` | `npm install socket.io-client` |

**Why not custom?** Reliable WebSocket with automatic reconnection, fallback to long-polling, and rooms/namespaces.

```typescript
// composables/useSocket.ts
export function useSocket() {
  const socket = ref<Socket | null>(null)

  onMounted(() => {
    socket.value = io('ws://localhost:3001')
  })

  onUnmounted(() => {
    socket.value?.disconnect()
  })

  return { socket }
}
```

**Alternative:** `@supabase/supabase-js` for Supabase Realtime, native `WebSocket` API for simple cases.

---

### 18 — State Persistence

| Trigger Pattern                                                 | Module                        | Install                                   |
| --------------------------------------------------------------- | ----------------------------- | ----------------------------------------- |
| User asks for persisted state, localStorage sync, offline state | `pinia-plugin-persistedstate` | `npm install pinia-plugin-persistedstate` |

**Why not custom?** Automatic Pinia store persistence to localStorage/sessionStorage/cookies with SSR support.

```typescript
export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref<string | null>(null)
    return { token }
  },
  {
    persist: true, // Auto-persists to localStorage
  },
)
```

**Docs:** https://prazdevs.github.io/pinia-plugin-persistedstate/

---

## Best Practices & Rules

### Mandatory Rules

- **MUST** check `package.json` for existing dependencies before recommending.
- **MUST** verify module compatibility with detected Vue/Nuxt/Node versions.
- **MUST** always propose before installing — never install silently.
- **MUST** prefer official Nuxt modules (`@nuxt/*`) over third-party alternatives when quality is comparable.
- **MUST** prefer modules with TypeScript support.

### Safety Rules

- **MUST NOT** recommend unmaintained packages (last commit > 1 year).
- **MUST NOT** recommend packages with known security vulnerabilities.
- **MUST NOT** recommend multiple packages that solve the same problem — pick the best one.
- **MUST NOT** force modules on users who prefer custom implementations.
