import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import chalk from 'chalk';

// 导出一个名为SvgToPng的函数，用于将svg文件转换为png文件
export async function SvgToPng(sizes = [16, 32, 48, 128]) {
    // 返回一个对象，包含name和closeBundle两个属性
    return {
        name: 'vite-plugin-svg-to-png',
        apply: 'build',
        enforce: 'pre',
        async buildStart() {
            console.log('SvgToPng 插件正在运行中...');

            // 定义输入目录和输出目录
            const rootDir = process.cwd();
            const inputDir = path.resolve(rootDir, 'src/assets/icons');
            const outputDir = path.resolve(rootDir, 'public/icons');

            console.log(chalk.blue('输入目录:', inputDir));
            console.log(chalk.blue('输出目录:', outputDir));

            // 如果输出目录不存在，则创建输出目录
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            // 获取输入目录下的所有svg文件
            const svgFiles = fs.readdirSync(inputDir).filter(file => file.endsWith('.svg'));

            // 遍历svg文件
            for (const file of svgFiles) {
                // 获取svg文件的路径
                const svgFilePath = path.join(inputDir, file);
                // 获取svg文件名（不带扩展名）
                const fileNameWithoutExt = path.basename(file, '.svg');

                // 遍历sizes数组
                for (const size of sizes) {
                    // 定义输出文件路径
                    const outputFilePath = path.join(outputDir, `${fileNameWithoutExt}-${size}.png`);

                    try {
                        // 使用sharp库将svg文件转换为png文件
                        await sharp(svgFilePath)
                            .resize(size, size)
                            .png({ quality: 80 })
                            .toFile(outputFilePath);
                        // 输出转换成功的文件路径
                        console.log(`Generated: ${outputFilePath}`);
                    } catch (err) {
                        // 输出转换失败的错误信息
                        console.error(`Error converting ${svgFilePath} to ${outputFilePath}:`, err);
                    }
                }
            }
        },
    };
}
