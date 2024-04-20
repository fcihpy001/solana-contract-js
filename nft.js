const {
  signerIdentity,
  generateSigner,
  percentAmount,
  createSignerFromKeypair
} = require('@metaplex-foundation/umi')
const {
  mplTokenMetadata,
  createNft,
  fetchDigitalAsset,
} = require('@metaplex-foundation/mpl-token-metadata')
const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults')
const { Keypair } = require('@solana/web3.js')
const fs = require('fs')
// 连接到 Solana devnet
const umi = createUmi('https://api.devnet.solana.com').use(mplTokenMetadata())

// 使用 id.json 本地的私钥文件，实例化钱包
const userKeypair = Keypair.fromSecretKey(
  Buffer.from(
    JSON.parse(fs.readFileSync('/Users/sam/.config/solana/id.json', 'utf-8'))
  )
)
// 获取签名者
const userWallet = umi.eddsa.createKeypairFromSecretKey(userKeypair.secretKey)
const userWalletSigner = createSignerFromKeypair(umi, userWallet)

// 构建元数据
const metadata = {
  name: 'fcihpy make nft',
  symbol: 'FcNFT',
  description: 'solana fcihpy nft',
  image:
    'https://magenta-brilliant-elephant-946.mypinata.cloud/ipfs/QmaHMst7taDuenJmK8J6SVZHG7QopvQFqqSSrdsLa3jumB'
}

// 生成 Mint 签名者
const mint = generateSigner(umi)

// 使用 use 方法配置 UMI 的签名者和元数据模块
umi.use(signerIdentity(userWalletSigner))

createNft(umi, {
  mint: mint,
  name: metadata.name,
  uri: metadata.uri,
  sellerFeeBasisPoints: percentAmount(5.5)
})
  .sendAndConfirm(umi)
  .then(() => {
    console.log('Successfully minted tokens (', mint.publicKey, ')')
  })
 

// fetchDigitalAsset(umi, mint.publicKey)
//   .then(() => {
//     console.log('Successfully1111 minted tokens (', mint.publicKey, ')')
//   })

