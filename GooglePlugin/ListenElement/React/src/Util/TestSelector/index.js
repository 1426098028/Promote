import { message } from 'antd';
export const TestSelector = ({ tbody, thead }, TargetType) => {
    try {
        const elements = document.querySelectorAll(tbody?.Selector);
        if (elements.length === 0) return message.error('未找到匹配的表格');
        elements.forEach(el => {
            if (el.tagName === TargetType.toUpperCase()) {
                el.style.outline = '1px dashed #409EFF';
                const TimeId = setTimeout(() => {
                    el.style.outline = '';
                    clearTimeout(TimeId)
                }, 2000);
            }
        });
        message.success(TargetType.toUpperCase() === 'TABLE' ? `找到 ${elements.length} 个表格` : `找到 ${elements.length} 条数据`);
    } catch (error) {
        message.error('选择器语法错误');
    }
}
