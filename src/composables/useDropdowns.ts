import { ref } from "vue"
import { useAuthStore } from "@/stores/auth"
import ApiService from "@/services/Api/api"

export function useDropdowns() {

  const authStore = useAuthStore()

  const states = ref<any[]>([])
  const lgas = ref<Record<string, any[]>>({})
  const loanTypes = ref<any[]>([])
  const documentPurposes = ref<any[]>([])
  const loanTenors = ref<any[]>([])   // ✅ add this

  const loading = ref(false)
  const error = ref<any>(null)

  const fetchDropdownList = async () => {

    loading.value = true
    error.value = null

    try {

      const savedAuth = localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data")!)
        : null

      const tenantId = savedAuth
        ? savedAuth.user?.business_name
          ? savedAuth.user.id
          : savedAuth.user.tenant_id
        : authStore.user?.business_name
        ? authStore.user.id
        : authStore.user?.tenant_id

      const url = `/${tenantId}/fetch-dropdown-list`

      const response = await ApiService.get(url)

      const data = response?.data?.dropdown_list

      console.log("dropdown response:", data)

      if (!data) return

      // normalize states
      states.value = data.state.map((s: any) => ({
        label: s.name,
        value: s.name
      }))

      // lgas stays grouped
      lgas.value = data.lga

      loanTypes.value = data.loan_type.map((l: any) => ({
        label: l.name,
        value: l.id,
        description: l.description
      }))

      documentPurposes.value = data.document_purpose.map((d: any) => ({
        label: d.name,
        value: d.id,
        description: d.description
      }))

      // ✅ normalize loan tenors
      loanTenors.value = data.loan_tenor.map((t: number) => ({
        label: `${t} month${t > 1 ? "s" : ""}`,
        value: t
      }))
      console.log("loan tenors:", loanTenors.value)

    } catch (err) {

      console.error("Dropdown fetch failed:", err)
      error.value = err

    } finally {

      loading.value = false

    }
  }

  return {
    states,
    lgas,
    loanTypes,
    documentPurposes,
    loanTenors,   // ✅ expose it
    loading,
    error,
    fetchDropdownList
  }
}