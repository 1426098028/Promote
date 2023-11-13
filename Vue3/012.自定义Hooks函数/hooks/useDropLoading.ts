import { onMounted, onUnmounted, ref } from 'vue'
const reader = new FileReader();
export default function (Drag) {
    const FileName = ref<String>('')
    const FileType = ref<String>('')
    const readAsText = ref<String>('')



    window.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    window.addEventListener('drop', (e) => {
        e.preventDefault();
    });
    onMounted(() => {
        if (!Drag) return
        Drag.addEventListener('drop', onDrop)
    })
    onUnmounted(() => {
        if (!Drag) return
        Drag.removeEventListener('drop', onDrop)
    })
    const onDrop = ({ dataTransfer: { files: [File] } }) => {
        reader.readAsText(File);
        const { name, type } = File
        reader.onload = function (e) {
            FileName.value = name
            FileType.value = type
            readAsText.value = e?.target?.result || ''
        }
    }
    return { FileName, FileType, readAsText }
}