import { ref, App } from 'vue';
import { queryBatch, Dicts } from '@/api/dicts';

// 全局字典
export default function useDicts(app: App) {
    app.mixin({
        data(): Dicts {
            return {
                dicts: {}
            };
        },
        methods: {
            async getDicts(data) {
                const res = await queryBatch(data);
                this.dicts = res.data;
            }
        }
    });
}
