const fs = require('fs')

// 读取本地 JSON 文件
fs.readFile('/Users/sam/.config/solana/id.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err)
    return
  }

  // 解析 JSON 数据
  try {
    const jsonContent = JSON.parse(data)

    // 提取私钥
    // const privateKey = jsonContent.privateKey
    console.log(jsonContent)
    let buff = Buffer.from(jsonContent)
    console.log('Private key:',buff.toLocaleString("hex"))

    // 在这里可以继续进行其他操作，比如使用私钥进行加密、签名等
  } catch (parseError) {
    console.error('Error parsing JSON data:', parseError)
  }
})
