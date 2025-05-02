import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
// 默认 manifest 配置
const Manifest = {
    name: 'My App',
    description: 'A description of your app',
    version: '1',
    manifest_version: 3,
    permissions: ['activeTab', 'storage'],
    action: {
        default_title: '监听元素',
        default_popup: 'index.html',
    },
};

export async function MoveManifest(manifest) {
    return {
        name: 'vite-plugin-move-manifest',
        apply: 'build',
        enforce: 'post',
        buildStart() {
            console.log(chalk.blue('MoveManifest 插件已加载'));
        },
        buildEnd() {
            console.log(chalk.blue('MoveManifest 插件正在运行...'));
        },
        async closeBundle() {
            console.log('MoveManifest 插件正在运行中...');

            // 获取项目根目录
            const rootDir = process.cwd();
            const distDir = path.join(rootDir, 'dist');

            // 目标文件路径（最终生成的 manifest.json）
            const targetPath = path.join(distDir, 'manifest.json');
            // 文件资源文件夹路径
            const assetsPath = path.join(distDir, 'assets');
            // 图标资源文件夹路径
            const iconsPath = path.join(distDir, 'icons');

            console.log(chalk.blue('项目根目录:', rootDir));
            console.log(chalk.blue('目标文件路径:', targetPath));
            console.log(chalk.blue('文件资源文件夹路径:', assetsPath));
            console.log(chalk.blue('图标资源文件夹路径:', iconsPath));

            // 检查 assets 文件夹是否存在
            if (!fs.existsSync(assetsPath)) {
                console.error(chalk.red('文件资源文件夹路径:', assetsPath));
                return;
            }
            // 检查 icons 文件夹是否存在
            if (!fs.existsSync(iconsPath)) {
                console.error(chalk.red('图标资源文件夹路径:', iconsPath));
                return;
            }


            // 动态读取 assets 文件夹中的文件
            const assetsFiles = fs.readdirSync(assetsPath);

            // 动态读取 icons 文件夹中的文件
            const iconsFiles = fs.readdirSync(iconsPath);


            console.log(chalk.blue('文件资源文件列表:', assetsFiles));
            console.log(chalk.blue('图标资源文件列表:', iconsFiles));

            // 动态生成 icons 对象
            const icons = {}
            iconsFiles.map(file => {
                const [number] = file.match(/\d+/);
                icons[number] = `/icons/${file}`
            })
            // 默认 manifest.json 内容
            const DefaultManifest = {
                ...Manifest,
                icons,
                content_scripts: [
                    {
                        type: 'module',
                        matches: ['<all_urls>'],
                        js: assetsFiles.filter(file => file.endsWith('.js')).map(file => `/assets/${file}`), // 动态赋值 JS 文件
                        css: assetsFiles.filter(file => file.endsWith('.css')).map(file => `/assets/${file}`), // 动态赋值 CSS 文件
                    },
                ],
            };

            // 生成 manifest.json 内容
            const GenerateManifest = {
                ...DefaultManifest,
                ...manifest,
            };


            // 将生成的 manifest.json 写入目标文件
            try {
                fs.writeFileSync(targetPath, JSON.stringify(GenerateManifest, null, 2));
                console.log(chalk.green('manifest.json 已生成并写入:', targetPath));
            } catch (error) {
                console.error(chalk.red('写入 manifest.json 失败:', error));
                return;
            }
        },
    };
}
