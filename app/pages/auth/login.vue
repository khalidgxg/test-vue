<script setup>
import { reactive, ref } from 'vue'

definePageMeta({ layout: 'auth' })
useHead({ title: 'Login - BankDash' })

const { t, locale } = useI18n()
const authStore = useAuthStore()
const { rules } = useValidationRules()
const router = useRouter()
const globalStore = useGlobalStore()
const localePath = useLocalePath()

const form = reactive({ email: 'admin@admin.com', password: 'password' })
const showPassword = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  isSubmitting.value = true
  errorMessage.value = ''

  const success = await authStore.login(form)

  isSubmitting.value = false

  if (success) {
    globalStore.setAlertData(t('auth.login_success') || 'Welcome back!', true)
    router.push('/')
  } else {
    errorMessage.value = t('auth.login_failed') || 'Invalid email or password'
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-card__inner">
        <div class="auth-card__brand">
          <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="8" fill="#396AFF" />
            <path
              d="M10 18C10 18 13 13 18 13C23 13 26 18 26 18"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
            />
            <path
              d="M10 22C10 22 13 17 18 17C23 17 26 22 26 22"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
            />
          </svg>
          <h1 class="auth-card__brand-text">BankDash</h1>
        </div>

        <h2 class="auth-card__title">
          {{ t('auth.login') }}
        </h2>
        <p class="auth-card__subtitle">
          {{ locale === 'ar' ? 'مرحباً بعودتك! الرجاء إدخال بياناتك.' : 'Welcome back! Please enter your details.' }}
        </p>

        <v-alert
          v-if="errorMessage"
          type="error"
          variant="tonal"
          density="compact"
          class="mb-4"
        >
          {{ errorMessage }}
        </v-alert>

        <v-form class="auth-form" @submit.prevent="handleLogin">
          <v-text-field
            v-model="form.email"
            :rules="[rules.required, rules.invalidEmail]"
            :label="t('auth.email') || 'Email'"
            type="email"
            prepend-inner-icon="mdi-email-outline"
            autocomplete="email"
          />

          <v-text-field
            v-model="form.password"
            :rules="[rules.required, rules.minChar]"
            :label="t('auth.password') || 'Password'"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            autocomplete="current-password"
            @click:append-inner="showPassword = !showPassword"
          />

          <div class="auth-form__options">
            <v-checkbox
              :label="t('auth.remember_me') || 'Remember me'"
              density="compact"
              hide-details
              color="primary"
            />
            <NuxtLink
              :to="localePath('/auth/forgot-password')"
              class="auth-form__forgot"
            >
              {{ t('auth.forgot_password') || 'Forgot password?' }}
            </NuxtLink>
          </div>

          <v-btn
            type="submit"
            color="primary"
            block
            size="x-large"
            :loading="isSubmitting"
            class="auth-form__submit"
          >
            {{ t('auth.login') }}
          </v-btn>
        </v-form>

        <p class="auth-card__footer">
          {{ t('auth.no_account') || "Don't have an account?" }}
          <NuxtLink
            :to="localePath('/auth/register')"
            class="auth-card__link"
          >
            {{ t('auth.register') }}
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e7edff 100%);
  padding: 1.5rem;
}

.auth-card {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 440px;
  overflow: hidden;
}

.auth-card__inner {
  padding: 2.5rem;
}

.auth-card__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.auth-card__brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #343c6a;
  margin: 0;
}

.auth-card__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #343c6a;
  margin: 0 0 0.5rem;
}

.auth-card__subtitle {
  color: #8ba3cb;
  font-size: 0.875rem;
  margin: 0 0 1.5rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-form__options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.25rem 0 0.5rem;
}

.auth-form__forgot {
  font-size: 0.8125rem;
  color: #396aff;
  text-decoration: none;
  font-weight: 500;
}

.auth-form__forgot:hover {
  text-decoration: underline;
}

.auth-form__submit {
  margin-top: 0.5rem;
}

.auth-card__footer {
  text-align: center;
  font-size: 0.875rem;
  color: #8ba3cb;
  margin: 1.5rem 0 0;
}

.auth-card__link {
  color: #396aff;
  text-decoration: none;
  font-weight: 600;
  margin-inline-start: 0.25rem;
}

.auth-card__link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card__inner {
    padding: 1.5rem;
  }
}
</style>
