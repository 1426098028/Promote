import { ElMessage, } from 'element-plus';
import { ILoginRequest } from '@/interface/login';
import { useUserStore } from '@/pinia/useUserStore';
import { useMenuStore } from '@/pinia/useMenuStore';
import { router } from '@/router';
/**
 * 登录成功后的逻辑封装
*/
const useLogin = async (res: ILoginRequest): void => {
    if (!(res.code == 200)) return ElMessage.error(res.msg);
    // 1 . 持久化存储 Token
    await localStorage.setItem("TOKEN", res.data || '');

    // 2.获取用户信息
    await useUserStore().getUserInfo();

    // 3.获取路由
    await useMenuStore().getMenu();

    // 4.跳转到后台管理系统首页
    await router.push('/');
    return;
};
export default useLogin;
