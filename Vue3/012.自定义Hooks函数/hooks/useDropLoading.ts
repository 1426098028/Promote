import { onMounted, onUnmounted, ref } from 'vue'
const reader = new FileReader();
export default function () {
    const FileName = ref<String>('')
    const FileType = ref<String>('')
    const ReadText = ref<ArrayBuffer | String>('')
    window.addEventListener('dragover', (e) => { e.preventDefault() });
    window.addEventListener('drop', (e) => { e.preventDefault() });

    onMounted(() => {
        const Drag = document.querySelector('#view')
        Drag?.addEventListener('drop', onDrop)
    })
    onUnmounted(() => {
        const Drag = document.querySelector('#view')
        Drag?.removeEventListener('drop', onDrop)
    })
    const onDrop = (e: any) => {
        const { dataTransfer: { files: [File] } } = e
        reader.readAsText(File);
        const { name, type } = File
        reader.onload = function (e) {
            const { target } = e
            console.log(target)
            FileName.value = name
            FileType.value = type
            ReadText.value = target?.result || ''
            console.log({ FileName, FileType, ReadText })
        }
    }
    return { FileName, FileType, ReadText }
}