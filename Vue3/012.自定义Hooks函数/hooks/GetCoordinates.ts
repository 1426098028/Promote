import { onMounted, onUnmounted, ref } from 'vue'

export default function () {
    // 需求1:用户在页面中点击页面,把点击坐标显示出来
    const X = ref<number>(0)
    const Y = ref<number>(0)
    // 挂载后
    onMounted(() => {
        window.addEventListener('click', onClickBc)
    })
    // 卸载前
    onUnmounted(() => {
        window.removeEventListener('click', onClickBc)
    })
    const onClickBc = (event: MouseEvent) => {
        X.value = event.pageX
        Y.value = event.pageY
    }
    return { X, Y }
}