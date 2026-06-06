<script setup>
useHead({ title: 'Setting' })
definePageMeta({ title: 'Setting' })

const tabs = ['Edit Profile', 'Preferences', 'Security']
const activeTab = ref('Edit Profile')

const { data: settings } = await useApi('/settings')

const form = reactive({
  name: settings.value?.profile?.name || 'Charlene Reed',
  username: settings.value?.profile?.username || 'Charlene Reed',
  email: settings.value?.profile?.email || 'charlenereed@gmail.com',
  password: '',
  dob: settings.value?.profile?.dob || '25 January 1990',
  presentAddress: settings.value?.profile?.presentAddress || 'San Jose, California, USA',
  permanentAddress: settings.value?.profile?.permanentAddress || 'San Jose, California, USA',
  city: settings.value?.profile?.city || 'San Jose',
  postal: settings.value?.profile?.postal || '45962',
  country: settings.value?.profile?.country || 'USA',
})

const prefs = reactive({
  twoFactor: settings.value?.preferences?.twoFactor ?? true,
  newsletter: settings.value?.preferences?.newsletter ?? false,
  pushNotif: settings.value?.preferences?.pushNotif ?? true,
  smsNotif: settings.value?.preferences?.smsNotif ?? false,
})

const notifications = ref({
  digitalCurrency: true,
  merchantOrder: false,
  recommendations: true,
})
</script>

<template>
  <div class="settings-page">
    <v-card class="data-card" elevation="0" rounded="xl">
      <v-tabs v-model="activeTab" color="primary" align-tabs="start" class="settings-tabs">
        <v-tab
          v-for="tab in tabs"
          :key="tab"
          :value="tab"
          class="text-none"
        >
          {{ tab }}
        </v-tab>
      </v-tabs>

      <v-window v-model="activeTab" class="mt-4">
        <!-- Edit Profile -->
        <v-window-item value="Edit Profile">
          <div class="settings-profile">
            <div class="settings-avatar">
              <v-avatar size="120">
                <img src="https://i.pravatar.cc/120?img=47" alt="Profile photo" />
              </v-avatar>
              <v-btn
                icon
                size="small"
                color="primary"
                class="settings-avatar__edit"
                style="background-color: #396aff !important;"
              >
                <v-icon size="16">mdi-pencil</v-icon>
              </v-btn>
            </div>

            <v-form class="settings-form">
              <v-row dense>
                <v-col cols="12" md="6">
                  <span class="settings-form__label">Your Name</span>
                  <v-text-field v-model="form.name" variant="outlined" density="comfortable" />
                </v-col>
                <v-col cols="12" md="6">
                  <span class="settings-form__label">User Name</span>
                  <v-text-field v-model="form.username" variant="outlined" density="comfortable" />
                </v-col>
                <v-col cols="12" md="6">
                  <span class="settings-form__label">Email</span>
                  <v-text-field v-model="form.email" type="email" variant="outlined" density="comfortable" />
                </v-col>
                <v-col cols="12" md="6">
                  <span class="settings-form__label">Password</span>
                  <v-text-field v-model="form.password" type="password" placeholder="**********" variant="outlined" density="comfortable" />
                </v-col>
                <v-col cols="12" md="6">
                  <span class="settings-form__label">Date of Birth</span>
                  <v-text-field v-model="form.dob" variant="outlined" density="comfortable" />
                </v-col>
                <v-col cols="12" md="6">
                  <span class="settings-form__label">Present Address</span>
                  <v-text-field v-model="form.presentAddress" variant="outlined" density="comfortable" />
                </v-col>
                <v-col cols="12" md="6">
                  <span class="settings-form__label">Permanent Address</span>
                  <v-text-field v-model="form.permanentAddress" variant="outlined" density="comfortable" />
                </v-col>
                <v-col cols="12" md="6">
                  <span class="settings-form__label">City</span>
                  <v-text-field v-model="form.city" variant="outlined" density="comfortable" />
                </v-col>
                <v-col cols="12" md="6">
                  <span class="settings-form__label">Postal Code</span>
                  <v-text-field v-model="form.postal" variant="outlined" density="comfortable" />
                </v-col>
                <v-col cols="12" md="6">
                  <span class="settings-form__label">Country</span>
                  <v-text-field v-model="form.country" variant="outlined" density="comfortable" />
                </v-col>
              </v-row>

              <div class="settings-form__actions">
                <v-btn color="#1814f3" size="x-large" min-width="190" class="text-none">
                  Save
                </v-btn>
              </div>
            </v-form>
          </div>
        </v-window-item>

        <!-- Preferences -->
        <v-window-item value="Preferences">
          <v-row dense>
            <v-col cols="12" md="6">
              <span class="settings-form__label">Currency</span>
              <v-text-field variant="outlined" density="comfortable" placeholder="USD" />
            </v-col>
            <v-col cols="12" md="6">
              <span class="settings-form__label">Time Zone</span>
              <v-text-field
                variant="outlined"
                density="comfortable"
                placeholder="(GMT-12:00) International Date Line West"
              />
            </v-col>
          </v-row>

          <h3 class="settings-section-title">Notification</h3>

          <div class="settings-notifications">
            <div class="settings-notifications__item">
              <v-switch
                v-model="notifications.digitalCurrency"
                color="#16DBCC"
                hide-details
                inset
                density="compact"
              />
              <span>I send or receive digita currency</span>
            </div>
            <div class="settings-notifications__item">
              <v-switch
                v-model="notifications.merchantOrder"
                color="#16DBCC"
                hide-details
                inset
                density="compact"
              />
              <span>I receive merchant order</span>
            </div>
            <div class="settings-notifications__item">
              <v-switch
                v-model="notifications.recommendations"
                color="#16DBCC"
                hide-details
                inset
                density="compact"
              />
              <span>There are recommendation for my account</span>
            </div>
          </div>

          <div class="settings-form__actions mt-6">
            <v-btn color="#1814f3" size="x-large" min-width="190" class="text-none">
              Save
            </v-btn>
          </div>
        </v-window-item>

        <!-- Security -->
        <v-window-item value="Security">
          <div class="settings-security">
            <h3 class="settings-section-title">Two-factor Authentication</h3>
            <div class="settings-notifications__item mt-3">
              <v-switch
                v-model="prefs.twoFactor"
                color="#16DBCC"
                hide-details
                inset
                density="compact"
              />
              <span class="settings-notifications__label">Enable or disable two factor authentication</span>
            </div>

            <h3 class="settings-section-title mt-6">Change Password</h3>
            <v-form class="settings-password-form">
              <v-row dense>
                <v-col cols="12" md="8">
                  <span class="settings-form__label">Current Password</span>
                  <v-text-field type="password" placeholder="**********" variant="outlined" density="comfortable" />
                </v-col>
                <v-col cols="12" md="8" class="mt-2">
                  <span class="settings-form__label">New Password</span>
                  <v-text-field type="password" placeholder="**********" variant="outlined" density="comfortable" />
                </v-col>
              </v-row>

              <div class="settings-form__actions mt-6">
                <v-btn color="#1814f3" size="x-large" min-width="190" class="text-none">
                  Save
                </v-btn>
              </div>
            </v-form>
          </div>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.data-card {
  padding: 2rem !important;
  background: #ffffff !important;
  border: none !important;
  border-radius: 25px !important;
}

.settings-tabs :deep(.v-tab) {
  font-weight: 500;
  color: #b1b1b1;
  font-size: 0.9375rem;
}

.settings-tabs :deep(.v-tab--selected) {
  color: #1814f3;
  font-weight: 600;
}

.settings-profile {
  display: flex;
  flex-direction: column;
}

.settings-avatar {
  position: relative;
  width: fit-content;
  margin: 0 auto 2rem;
  flex-shrink: 0;
}

.settings-avatar__edit {
  position: absolute !important;
  bottom: 0;
  right: 0;
}

.settings-form {
  flex: 1;
}

.settings-password-form {
  max-width: 600px;
}

@media (min-width: 960px) {
  .settings-profile {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }

  .settings-avatar {
    margin: 0 0 0 1.5rem !important;
    padding-top: 1rem;
  }
}

.settings-form__label {
  display: block;
  font-size: 0.9375rem;
  color: #343c6a;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.settings-form__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.settings-section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #343c6a;
  margin: 1.5rem 0 1rem;
}

.settings-notifications {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.settings-notifications__item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9375rem;
  color: #343c6a;
}
</style>
