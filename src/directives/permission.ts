import useUserStore from '@/store/auth'
import type { Directive, DirectiveBinding } from 'vue'

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const userStore = useUserStore()
    const { roles } = userStore
    const requirePermission = binding.value
    if (!roles.includes(requirePermission)) {
      el.style.display = 'none'
    }
  },
} as Directive
