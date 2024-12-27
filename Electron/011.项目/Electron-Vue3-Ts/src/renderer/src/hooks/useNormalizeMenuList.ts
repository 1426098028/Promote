import { ref } from 'vue';
import { menuTree, } from '@/api/role';
const useNormalizeMenuList = () => {
    const MenuArr = ref([]);
    const getMenuTree = async (Data = { current: 1, size: 999, enabled: 1, }) => {
        //获取权限菜单数据
        const { data: { records } } = await menuTree(Data);
        const MenuMap = new Map(records.map(item => [item.id, item]));
        records.forEach(item => {
            if (item.parentId == '-1') return MenuArr.value.push(item);
            // 因为 对象 地址值的引用 和 records 元素地址值引用 指向是共享的，所以当修改了对象中的内容， records 元素值也会修改 ， 从而 导致MenuArr 中的 children 值也变化了
            // 修复该问题需要深拷贝即可
            MenuMap.get(item.parentId)?.children.push(item);
        });
    };
    return { getMenuTree, MenuArr };
};
export { useNormalizeMenuList };
