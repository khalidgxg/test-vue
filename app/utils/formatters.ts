export function formatCurrency(value: number, locale = 'ar-SA', currency = 'SAR'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}

export function formatDate(value: string | Date, locale = 'ar-SA'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value))
}
