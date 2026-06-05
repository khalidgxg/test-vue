<template>
  <div class="settings-page">
    <div class="settings-page__grid">
      <v-card class="settings-card" elevation="0">
        <h2 class="settings-card__title">Edit Profile</h2>

        <div class="settings-avatar">
          <v-avatar size="90">
            <img src="https://i.pravatar.cc/120?img=47" alt="Profile photo" />
          </v-avatar>
          <v-btn
            class="settings-avatar__edit"
            icon
            size="small"
            color="primary"
            aria-label="Change profile photo"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </v-btn>
        </div>

        <v-form class="settings-form" @submit.prevent="handleSave">
          <div class="settings-form__row">
            <v-text-field
              v-model="form.name"
              label="Your Name"
              placeholder="Charlene Reed"
            />
            <v-text-field
              v-model="form.username"
              label="User Name"
              placeholder="Charlene Reed"
            />
          </div>
          <div class="settings-form__row">
            <v-text-field
              v-model="form.email"
              label="Email"
              type="email"
              placeholder="charlenereed@gmail.com"
            />
            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              placeholder="**********"
            />
          </div>
          <div class="settings-form__row">
            <v-text-field
              v-model="form.dob"
              label="Date of Birth"
              placeholder="25 January 1990"
            />
            <v-text-field
              v-model="form.presentAddress"
              label="Present Address"
              placeholder="San Jose, California, USA"
            />
          </div>
          <div class="settings-form__row">
            <v-text-field
              v-model="form.permanentAddress"
              label="Permanent Address"
              placeholder="San Jose, California, USA"
            />
            <v-text-field
              v-model="form.city"
              label="City"
              placeholder="San Jose"
            />
          </div>
          <div class="settings-form__row">
            <v-text-field
              v-model="form.postal"
              label="Postal Code"
              placeholder="45962"
            />
            <v-text-field
              v-model="form.country"
              label="Country"
              placeholder="USA"
            />
          </div>
          <div class="settings-form__actions">
            <v-btn type="submit" color="#1814f3" size="large" min-width="120" class="text-none">
              Save
            </v-btn>
          </div>
        </v-form>
      </v-card>

      <v-card class="settings-card settings-card--preferences" elevation="0">
        <v-tabs v-model="activeTab" color="primary" class="settings-tabs">
          <v-tab v-for="tab in tabs" :key="tab" :value="tab" class="text-none">
            {{ tab }}
          </v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <v-window-item value="Edit Profile">
            <div class="settings-prefs">
              <p class="settings-prefs__placeholder">Profile editing happens in the left panel.</p>
            </div>
          </v-window-item>

          <v-window-item value="Preference">
            <div class="settings-prefs">
              <div v-for="pref in preferenceItems" :key="pref.key" class="pref-item">
                <div class="pref-item__info">
                  <span class="pref-item__title">{{ pref.title }}</span>
                  <span class="pref-item__subtitle">{{ pref.subtitle }}</span>
                </div>
                <v-switch
                  v-model="prefs[pref.key]"
                  color="primary"
                  hide-details
                  inset
                  density="compact"
                />
              </div>
            </div>
          </v-window-item>

          <v-window-item value="Security">
            <div class="settings-prefs">
              <p class="settings-prefs__placeholder">Security settings coming soon.</p>
            </div>
          </v-window-item>
        </v-window>
      </v-card>
    </div>

    <v-snackbar
      v-model="toast.show"
      :color="toast.isError ? 'error' : 'success'"
      location="bottom right"
      timeout="3000"
    >
      <div class="toast-content">
        <svg
          v-if="!toast.isError"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span>{{ toast.message }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

definePageMeta({
  title: 'Setting',
})

useHead({ title: 'Settings - BankDash' })

interface ProfileForm {
  name: string
  username: string
  email: string
  password: string
  dob: string
  presentAddress: string
  permanentAddress: string
  city: string
  postal: string
  country: string
}

interface Preferences {
  twoFactor: boolean
  newsletter: boolean
  pushNotif: boolean
  smsNotif: boolean
}

const tabs = ['Edit Profile', 'Preference', 'Security'] as const
type Tab = typeof tabs[number]
const activeTab = ref<Tab>('Edit Profile')

const form = reactive<ProfileForm>({
  name: '',
  username: '',
  email: '',
  password: '',
  dob: '',
  presentAddress: '',
  permanentAddress: '',
  city: '',
  postal: '',
  country: '',
})

const prefs = reactive<Preferences>({
  twoFactor: false,
  newsletter: false,
  pushNotif: false,
  smsNotif: false,
})

const preferenceItems = [
  { key: 'twoFactor' as const, title: 'Two-factor Authentication', subtitle: 'Enable extra security for your account' },
  { key: 'newsletter' as const, title: 'Newsletter & Updates', subtitle: 'Receive updates and newsletters via email' },
  { key: 'pushNotif' as const, title: 'Push Notifications', subtitle: 'Get push notifications on your device' },
  { key: 'smsNotif' as const, title: 'SMS Notifications', subtitle: 'Get important alerts via text message' },
]

const { data } = await useApi<{
  profile: ProfileForm
  preferences: Preferences
}>('/settings')

if (data.value) {
  Object.assign(form, { ...data.value.profile, password: '' })
  Object.assign(prefs, data.value.preferences)
}

interface ToastState {
  show: boolean
  message: string
  isError: boolean
}
const toast = ref<ToastState>({ show: false, message: '', isError: false })

async function handleSave() {
  const { error } = await useApi('/settings', {
    method: 'POST',
    body: { profile: form, preferences: prefs },
  })

  toast.value = {
    show: true,
    message: error.value ? 'Error updating profile settings.' : 'Profile settings updated successfully!',
    isError: !!error.value,
  }
}
</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.settings-page__grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 1.25rem;
  align-items: start;
}

.settings-card {
  padding: 2rem !important;
}

.settings-card__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 2rem;
}

.settings-avatar {
  position: relative;
  width: 90px;
  margin: 0 auto 2rem;
}

.settings-avatar__edit {
  position: absolute !important;
  bottom: 0;
  right: 0;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.settings-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.settings-form__actions {
  display: flex;
  justify-content: flex-end;
}

.settings-tabs {
  margin-bottom: 1.75rem;
}

.settings-prefs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.settings-prefs__placeholder {
  color: var(--color-text-muted);
  padding: 1.5rem 0;
  text-align: center;
}

.pref-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--color-border);
}

.pref-item:last-child {
  border-bottom: none;
}

.pref-item__info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
}

.pref-item__title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
}

.pref-item__subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 1100px) {
  .settings-page__grid {
    grid-template-columns: 1fr;
  }

  .settings-form__row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .settings-card {
    padding: 1.25rem !important;
  }
}
</style>
