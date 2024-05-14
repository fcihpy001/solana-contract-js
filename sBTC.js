const {
  signerIdentity,
  generateSigner,
  percentAmount,
  createSignerFromKeypair
} = require('@metaplex-foundation/umi')
const {
  mplTokenMetadata,
  createAndMint,
  TokenStandard
} = require('@metaplex-foundation/mpl-token-metadata')
const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults')
const { Keypair } = require('@solana/web3.js')
const fs = require('fs')

// 连接站点
// const umi = createUmi('https://api.devnet.solana.com')
const umi = createUmi('https://api.mainnet-beta.solana.com')

// 读取本地私钥文件
const keypair = Keypair.fromSecretKey(
  Buffer.from(
    JSON.parse(fs.readFileSync('/Users/sam/.config/solana/id.json', 'utf-8'))
  )
)

// 通过密钥对实例化钱包
const wallet = umi.eddsa.createKeypairFromSecretKey(keypair.secretKey)
// 生成签名
const singer = createSignerFromKeypair(umi, wallet)

// 定义元数据
const metadata = {
  name: 'Warp BTC on solana',
  symbol: 'sBTC',
  uri: 'https://magenta-brilliant-elephant-946.mypinata.cloud/ipfs/QmRREdAJfEMKNvd2jCp8S6qMSvq423CqerhGsHV2VEcRFC'
}

// 配置umi的签名者和元数据
umi.use(signerIdentity(singer)).use(mplTokenMetadata())

// 生成mint 签名者
const mint = generateSigner(umi)

createAndMint(umi, {
  mint,
  authority: umi.identity,
  name: metadata.name,
  symbol: metadata.symbol,
  uri: metadata.uri,
  sellerFeeBasisPoints: percentAmount(0),
  decimals: 9,
  amount: 21000000_000000000,
  tokenOwner: wallet.publicKey,
  tokenStandard: TokenStandard.Fungible
})
  .sendAndConfirm(umi)
  .then(() => {
    console.log('Successfully minted tokens (', mint.publicKey, ')')
  })
