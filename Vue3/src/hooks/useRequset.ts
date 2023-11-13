import axios from 'axios'
import { ref } from 'vue'
export default function <T>(Url: string) {
    const result = ref<T | null>(null)
    const loading = ref(true)
    const errorMsg = ref(null)
    axios.get(Url)
        .then(({ data }) => {
            result.value = data
            loading.value = false
        })
        .catch((error) => {
            console.log(error)
            loading.value = false
            errorMsg.value = error
        })
    return { result, loading, errorMsg }
}