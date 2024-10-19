// 此文件是读取打包后的文件大小，是为了方便观察压缩体制大小
class CompressionStatsPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("CompressionStatsPlugin", (stats) => {
      console.log("\nCompression Results:");
      const assets = stats.toJson().assets || [];
      assets
        .filter((asset) => /\.(gz|br)$/.test(asset.name))
        .forEach((asset) => {
          console.log(`- ${asset.name}: ${formatBytes(asset.size)}`);
        });
      console.log(""); // 添加空行以便于阅读
    });
  }
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024,
    dm = decimals < 0 ? 0 : decimals,
    sizes = ["Bytes", "KB", "MB", "GB", "TB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

module.exports = CompressionStatsPlugin;
