import useUserStore from '@/store/auth'
import type { Directive } from 'vue'

const directiveInst: Directive = {
  beforeMount(el, binding) {
    const userStore = useUserStore()
    const { roles } = userStore
    const requirePermission = binding.value
    if (!roles.includes(requirePermission)) {
      el.style.display = 'none'
    }
  },
}

export default directiveInst
