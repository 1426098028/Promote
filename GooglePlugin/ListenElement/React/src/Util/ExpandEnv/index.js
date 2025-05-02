// 用于判断插件扩展环境变量

const Env = {
    Script: false,
    Popup: false,
}

export const ExpandEnv = () => {
    try {
        const manifest = chrome.runtime.getManifest();
        // 判断是否在 content script 环境
        if (manifest.content_scripts && window === window.top && !window.location.href.includes(chrome.runtime.id)) {
            Env.Script = true;
            return Env;
        }
        // 判断是否在 popup 环境
        if (manifest.action && window.location.href.includes(chrome.runtime.id)) {
            Env.Popup = true;
            return Env;
        }

    } catch (e) {
        if (process.env.NODE_ENV === 'development') {
            Env.Script = true;
            Env.Popup = true;
            return Env;
        }
        console.error('环境判断错误:', e);
    }
    return Env;
}
