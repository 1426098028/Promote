import fs from 'fs';
import path from 'path';
import Crx from 'crx';
import chalk from 'chalk';

let DefaultCrxConfig = {
    privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5HdaQ9S3zs7Za
9MlhlN+Q6uA+dGXbaNg+X+A2S00ecMI6Mgtb52GUkRNKIT5L33zPIe0VShRApkoj
QCnHsHg8Uz+YEv9wGwEfyTabdpW9WiEUUB4nBG0TbDT7hnTd59rF9iJMiIH+lz8W
Cmyb6e/+gOZi3UlUEGSqWkuWgjx3kyGrToNjS9AEA2vPaWrcreDYdmFGPCjDRcO5
76nLiaMvun1envCWSJJZqoPGvAr+TqxslvIzPT/q2JIfPeKxevHhIhUqdp3BYcy4
QduWChVZMXyZ7BE5f/fVJJACHurKZUwWAIDJeMRvd9DKQpdlenD3TP05VKOZU3Z9
bNMrWjMxAgMBAAECggEAAyPzwnmrV/ae98nucuupc4odh+e1/Of5X60FFuy1/CfH
7sBvt4VcTx67MdswpS0/Xvz1ioJ7R5m+mRye/NSURJs5sWb0mwp1PVyestpbGddS
J3fgvBMX1eAUgcYfHE7hM/GsFSntcSQQGZvPigFY7UOS7P9RrbW5vHdb0AvJcnKW
wHF1btL6ELmdPRrgRIhH5VIXLi8/zWQWQy7uDeMB5Ab+y33x5bRrTj/LmHlNHDb1
LcPC2RlDCzr3Gk6KErKMAOG+LAFwHAcjMwFKp6uZvuoVq8+5aWzxewLGPRc2atEZ
wZL8DyCvGZfiuyPetuZ3lRA2tRbO8drz+52Ubpjb4QKBgQD/4O9r4Vrw6kZQDpz8
0JyG6L98GsYH8BleQLFxleoqhF+mgvtHpP1ampEjsvez79L3xHorWk0224Knh7OT
GP2Em70cYm7TTlkOoMlaqqVvDXRWsTJwldmd6yzs1xQeXw4rP3xtj6MfKTDH/Xpf
xn1+jWaOn1huXQ3DzYlG/cQJUQKBgQC5NE/lD1LbHGchi5yyG8V/u3qCuulyFj8G
rQyaQPpB4AmWAEQ7ATHjKTzXaqsuBkAYIg97fFXnlqMMBFiW1W/H+qJsTC+KcklZ
QCCNeiZXhDvEuO2dF+d6NAz2/1zTLR/SUvTPx1Pfm+gfoeNoCrSX6qUivB3nV8hN
1YkTSE0T4QKBgFyAaI1LbqDhUIHohoAuuidbRL4Mv8Jm3gTgxkUVuQ2dxSZg+44u
6xgyAH4zWLDH5jCD6tZ5UqieOmFuAVEQG7YwxvDX9NCW5kMPhTstrZiz+HbOoDlr
MryQJDGKn09LdcfUr5q77nB5Z5Uk4XR2QS/a1lSA7msXYL6EMzhizNfBAoGARMIa
I1VkEnriAv89JpbO5RQqcJyKDNQbhBP9CMu03X4asPjaW/meltJ5hxRQBx9E7nC+
xL6tefRgBhca+Ky2+kyfvosuXzz85Ei9jSjbUUSDmA58EQWN572pTo4R3Uj0dnZb
80PybKMKM6w7rCXFVF1F/7ZNd9UMRXFQmbsO+qECgYEAvv+WOGl2WsGc7CbFr4F9
XRpV/hNw1SI6QQGaqEb2qzJGMENT0RBzXQs9ko5tFeJX0aX2Qhw9K6MJkJnTEo2u
gbIwRdNEDc8F4fZl/jl/L4mVRVJdCHhY7JmWb/CmfNC/EdZ/V+QDQk0o15fHj3U3
NYoMleDu0PiKgLHDhMcj3a4=
-----END PRIVATE KEY-----`
}



export async function PackCrx(FileName = 'dist', CrxConfig) {
    return {
        name: 'vite-plugin-pack-crx',
        apply: 'build',
        enforce: 'post',
        buildStart() {
            console.log(chalk.blue('PackCrx 插件已加载'));
        },
        buildEnd() {
            console.log(chalk.blue('PackCrx 插件正在运行...'));
        },
        async closeBundle() {
            console.log('PackCrx 插件正在运行中...');

            // 获取项目根目录
            const distDir = path.join(process.cwd(), 'dist');
            // 私钥文件路径 目标文件路径（最终生成的 dist.pem）
            const pemPath = path.join(distDir, `${FileName}.pem`);
            // 目标文件路径（最终生成的 dist.crx)
            const crxPath = path.join(distDir, `${FileName}.crx`);

            console.log(chalk.blue('项目根目录:', distDir));
            console.log(chalk.blue('目标 pem 文件路径:', pemPath));
            console.log(chalk.blue('目标 crx 文件路径:', crxPath));

            // 创建 Crx 实例
            const crx = await new Crx({ ...DefaultCrxConfig, ...CrxConfig });

            // 打包扩展程序
            try {
                console.log(chalk.blue('正在打包扩展程序...'));

                // 创建 ChromeExtension 实例
                const crxInstance = await crx.load(distDir);
                // 调用 pack() 方法生成 Buffer
                const crxBuffer = await crxInstance.pack();

                // 生成的 .crx 文件
                fs.writeFileSync(crxPath, crxBuffer);
                // 生成私钥文件
                fs.writeFileSync(pemPath, crx.privateKey);
                console.log(chalk.green('扩展程序打包完成:', crxPath));

            } catch (error) {
                console.error(chalk.red('打包扩展程序失败:', error));
            }
        },
    };
}
