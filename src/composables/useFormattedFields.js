// /composables/useFormattedField.js
import { computed } from 'vue'
import { ElNotification } from 'element-plus'

export function useFormattedFields(targetRef, key, options = { currency: false, max: Infinity }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(value || 0)
  }

  return computed({
    get() {
      const value = targetRef.value[key]
      if (value === null || value === undefined) return ''
      return options.currency ? formatCurrency(value) : value.toString()
    },
    set(val) {
      const input = String(val || '')
      const numeric = Number(
        options.currency ? input.replace(/[₦, ]/g, '') : input.replace(/[^0-9]/g, '')
      )

      let finalValue = numeric
      if (numeric > options.max) {
        finalValue = options.max
        ElNotification({
          title: 'Limit Exceeded',
          message: `Amount cannot exceed ${options.max.toLocaleString()}`,
          type: 'warning',
          duration: 3000
        })
      }

      targetRef.value[key] = input.trim() === '' ? null : isNaN(finalValue) ? 0 : finalValue
    }
  })
}