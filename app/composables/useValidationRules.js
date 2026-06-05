/**
 * Form validation rules (mirrors Brooder's useValidationRules pattern).
 * Returns an i18n-aware rules object usable with Vuetify form components.
 */
export function useValidationRules() {
  const { t } = useI18n()

  const rules = ref({
    required: (v) => !!v || t('v.field_required'),
    requiredArray: (v) =>
      (Array.isArray(v) && v.length > 0) || t('v.field_required'),
    invalidEmail: (v) => {
      const pattern
        = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(v) || t('v.invalid_email')
    },
    validPhone: (v) => {
      const phoneRegex = /^\d{8,15}$/
      return phoneRegex.test(v) || t('v.phone')
    },
    minChar: (v) => (v || '').length >= 8 || t('v.min_char'),
    min3Char: (v) => (v || '').length >= 3 || t('v.min_3char'),
    mustBeNumber: (v) => /^\d+$/.test(v) || t('v.must_be_number'),
    onlyNumbers: (v) => /^\d+$/.test(v) || t('v.must_be_number'),
    hasCapitalLetter: (v) => /[A-Z]/.test(v) || t('v.field_required'),
    hasSmallLetter: (v) => /[a-z]/.test(v) || t('v.field_required'),
    hasOneNumber: (v) => /\d/.test(v) || t('v.field_required'),
    specialChar: (v) =>
      /[!@#$%^&*(),.?":{}|<>]/.test(v) || t('v.field_required'),
    matchPassword: (other) => (v) =>
      v === other || t('v.field_required'),
  })

  return { rules }
}
