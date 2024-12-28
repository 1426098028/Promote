import { useUserStore } from '@/pinia/useUserStore';
// 自定义权限指令
const AuthDirectives = {
    name: 'Auths',
    mounted(el, binding) {
        const { permissions } = useUserStore();
        if ((binding.value == undefined) || permissions.includes('*:*:*')) return false;
        if (typeof binding.value == 'string') return (!permissions.includes(binding.value)) && el?.remove();
        if (Array.isArray(binding.value)) return binding.value.some(item => permissions.includes(item)) && el?.remove();
    },
};
export { AuthDirectives };
