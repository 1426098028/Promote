
import { ref, } from 'vue';
const useWindowDrag = () => {
    const isKeyDown = ref<boolean>(false);
    const dinatesX = ref<number>(0);
    const dinatesY = ref<number>(0);
    const onMousedown = ({ x, y }): void => {
        isKeyDown.value = true;
        dinatesX.value = x;
        dinatesY.value = y;
    };
    const onMousemove = ({ screenX, screenY }): void | boolean => {
        if (!isKeyDown.value) return false;
        const X = screenX - dinatesX.value;
        const Y = screenY - dinatesY.value;
        const data = { appX: X, appY: Y, };
        console.log(data, isKeyDown.value);
        window.electron.ipcRenderer.invoke('renderer-to-main', { TypeName: 'custom-adsorption', data });
    };
    const onMouseup = (eve): void => {
        isKeyDown.value = false;
    };
    return { onMousedown, onMousemove, onMouseup };
};
export default useWindowDrag;
