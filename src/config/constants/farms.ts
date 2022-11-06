import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    // disabled
    pid: 3,
    risk: 1,
    lpSymbol: 'SEED-TREE LP',
    lpAddresses: {
      97: '',
      56: '0x0faFf2264Fcc6B1c9e8B245E37d11EeF951FA958',
    },
    tokenSymbol: 'SEED',
    tokenAddresses: {
      97: '',
      56: '0x40B34cC972908060D6d527276e17c105d224559d',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    isPartner: false,
  },
  {
    pid: 13,
    risk: 1,
    lpSymbol: 'SEED-TREE LP',
    lpAddresses: {
      97: '',
      56: '0x0faFf2264Fcc6B1c9e8B245E37d11EeF951FA958',
    },
    tokenSymbol: 'SEED',
    tokenAddresses: {
      97: '',
      56: '0x40B34cC972908060D6d527276e17c105d224559d',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    isPartner: false,
  },
  {
    pid: 14,
    risk: 1,
    lpSymbol: 'TREE-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xaa359A601Ec3bD46C04C5F8f6A77D4AC9310A39D',
    },
    tokenSymbol: 'TREE',
    tokenAddresses: {
      97: '',
      56: '0xf0fcd737fce18f95621cc7841ebe0ea6efccf77e',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    isPartner: false,
  },
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'SEED-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x957811B37e74E1A140F7cCedf1935E9a6a82C33c',
    },
    tokenSymbol: 'SEED',
    tokenAddresses: {
      97: '',
      56: '0x40B34cC972908060D6d527276e17c105d224559d',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    isPartner: false,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'SEED-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x38320b2b624a01D71a8520ac83Da890bc2A38EeF',
    },
    tokenSymbol: 'SEED',
    tokenAddresses: {
      97: '',
      56: '0x40B34cC972908060D6d527276e17c105d224559d',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isPartner: false,
  },
  {
    pid: 15,
    risk: 5,
    lpSymbol: 'SEED-CAKE LP',
    lpAddresses: {
      97: '',
      56: '0x7e1fef3eacf4ac54a95d2be3f33e9122a1fc0080',
    },
    tokenSymbol: 'SEED',
    tokenAddresses: {
      97: '',
      56: '0x40B34cC972908060D6d527276e17c105d224559d',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    isPartner: false,
  },
  {
    pid: 19, //
    risk: 5,
    lpSymbol: 'SEED-BUNNY LP',
    lpAddresses: {
      97: '',
      56: '0x238984572976D6c3e1D3499e382929014eE833D4',
    },
    tokenSymbol: 'SEED',
    tokenAddresses: {
      97: '',
      56: '0x40B34cC972908060D6d527276e17c105d224559d',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    isPartner: false,
  },
  {
    pid: 20, //
    risk: 5,
    lpSymbol: 'SEED-ADA LP',
    lpAddresses: {
      97: '',
      56: '0x66cEbcF25C53B36Dfae40F88a991De40ea4f2D63',
    },
    tokenSymbol: 'SEED',
    tokenAddresses: {
      97: '',
      56: '0x40B34cC972908060D6d527276e17c105d224559d',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    isPartner: false,
  },

  {
    pid: 16, // partner Slime
    risk: 5,
    lpSymbol: 'TREE-SLIME LP',
    lpAddresses: {
      97: '',
      56: '0x7503b4B29787e17A3d6768FC9FeC2EFcD74bab3F',
    },
    tokenSymbol: 'TREE',
    tokenAddresses: {
      97: '',
      56: '0xf0fcd737fce18f95621cc7841ebe0ea6efccf77e',
    },
    quoteTokenSymbol: QuoteToken.TREE,
    quoteTokenAdresses: contracts.tree,
    isPartner: true,
  },
  {
    pid: 17, // partner Slime
    risk: 5,
    lpSymbol: 'SEED-SLIME LP',
    lpAddresses: {
      97: '',
      56: '0xCF45B3E704C232fF95C6eb4AF89cC5B869c07021',
    },
    tokenSymbol: 'SEED',
    tokenAddresses: {
      97: '',
      56: '0x40B34cC972908060D6d527276e17c105d224559d',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    isPartner: true,
  },


  {
    pid: 25, // partner INDA
    risk: 5,
    lpSymbol: 'SEED-INDA LP',
    lpAddresses: {
      97: '',
      56: '0xABFB602e6cf4592252282FCf604FE2D446409dfd',
    },
    tokenSymbol: 'SEED',
    tokenAddresses: {
      97: '',
      56: '0x40B34cC972908060D6d527276e17c105d224559d',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    isPartner: true,
  },


  {
    pid: 23, // partner Slime
    risk: 5,
    lpSymbol: 'TREE-SLIME V2 LP',
    lpAddresses: {
      97: '',
      56: '0x617Eeb2e44FdF108a24CD4a2ab8eDe99a970D084',
    },
    tokenSymbol: 'TREE',
    tokenAddresses: {
      97: '',
      56: '0xf0fcd737fce18f95621cc7841ebe0ea6efccf77e',
    },
    quoteTokenSymbol: QuoteToken.TREE,
    quoteTokenAdresses: contracts.tree,
    isPartner: true,
  },

  {
    pid: 22, // partner Slime
    risk: 5,
    lpSymbol: 'SEED-SLIME V2 LP',
    lpAddresses: {
      97: '',
      56: '0x7ad8E694811Bf4Fc348c82B772f0E03af2E3480E',
    },
    tokenSymbol: 'SEED',
    tokenAddresses: {
      97: '',
      56: '0x40B34cC972908060D6d527276e17c105d224559d',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    isPartner: true,
  },

  {
    pid: 21, // partner NIU
    risk: 5,
    lpSymbol: 'SEED-NIU LP',
    lpAddresses: {
      97: '',
      56: '0x6ca7fc9b0424561d70382aec0faa8c2aafa0a008',
    },
    tokenSymbol: 'SEED',
    tokenAddresses: {
      97: '',
      56: '0x40B34cC972908060D6d527276e17c105d224559d',
    },
    quoteTokenSymbol: QuoteToken.CAKE,
    quoteTokenAdresses: contracts.cake,
    isPartner: true,
  },

  {
    pid: 18, // partner BlueSwap
    risk: 5,
    lpSymbol: 'TREE-GREEN LP',
    lpAddresses: {
      97: '',
      56: '0x490f11761ddf8d100a38e73592817f097aef12bc',
    },
    tokenSymbol: 'TREE',
    tokenAddresses: {
      97: '',
      56: '0xf0fcd737fce18f95621cc7841ebe0ea6efccf77e',
    },
    quoteTokenSymbol: QuoteToken.TREE,
    quoteTokenAdresses: contracts.tree,
    isPartner: true,
  },

  {
    pid: 11,
    risk: 5,
    lpSymbol: 'TREE-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xDDE1A087Ff3cA5E7e694D7609A307E8622842327',
    },
    tokenSymbol: 'TREE',
    tokenAddresses: {
      97: '',
      56: '0xf0fcd737fce18f95621cc7841ebe0ea6efccf77e',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isPartner: false,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isPartner: false,
  },

  
  // {
  //   pid: 3,
  //   risk: 1,
  //   lpSymbol: 'USDT-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xc15fa3e22c912a276550f3e5fe3b0deb87b55acd',
  //   },
  //   tokenSymbol: 'USDT',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x55d398326f99059ff775485246999027b3197955',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 4,
  //   risk: 4,
  //   lpSymbol: 'CAKE-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xa527a61703d82139f8a06bc30097cc9caa2df5a6',
  //   },
  //   tokenSymbol: 'CAKE',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 5,
  //   risk: 2,
  //   lpSymbol: 'BTCB-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x7561eee90e24f3b348e1087a005f78b4c8453524',
  //   },
  //   tokenSymbol: 'BTCB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 6,
  //   risk: 2,
  //   lpSymbol: 'ETH-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x70d8929d04b60af4fb9b58713ebcf18765ade422',
  //   },
  //   tokenSymbol: 'ETH',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 7,
  //   risk: 3,
  //   lpSymbol: 'DOT-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xbcd62661a6b1ded703585d3af7d7649ef4dcdb5c',
  //   },
  //   tokenSymbol: 'DOT',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  {
    // pid: 8,
    pid: 4,
    risk: 1,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x3ab77e40340ab084c3e23be8e5a6f7afed9d41dc',
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      97: '',
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isPartner: false,
  },
  // {
  //   pid: 7,
  //   risk: 1,
  //   lpSymbol: 'USDC-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x680dd100e4b394bda26a59dd5c119a391e747d18',
  //   },
  //   tokenSymbol: 'USDC',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 10,
  //   risk: 4,
  //   lpSymbol: 'CAKE-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458',
  //   },
  //   tokenSymbol: 'CAKE',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 3,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'TREE',
  //   lpAddresses: {
  //     97: '',
  //     // 56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019', // TREE-BUSD LP
  //     // 56: '0xf023e9d4508514723aef8de584f2a1ea00e52814',
  //     56: '0x3510559976A3352A2b3c197890A0c484f2EF7D82',
  //   },
  //   tokenSymbol: 'TREE',
  //   tokenAddresses: {
  //     97: '',
  //     // 56: '0xf952fc3ca7325cc27d15885d37117676d25bfda6',
  //     // 56: '0xA5ddf4c0C427A0641E354019Bd5D7C7F2DF44fe5',//TreeToken
  //     // 56: '0x32a5aa723e050338Ab490A694CC41b29099d5671',
  //     56: '0x4CfC325B86b89fdbD59821773f2D1B66C1513ba9',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  {
    pid: 5,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'SEED',
    lpAddresses: {
      97: '',
      56: '0x38320b2b624a01D71a8520ac83Da890bc2A38EeF',
    },
    tokenSymbol: 'SEED',
    tokenAddresses: {
      97: '',
      56: '0x40B34cC972908060D6d527276e17c105d224559d',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

  {
    pid: 12,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'TREE',
    lpAddresses: {
      97: '',
      56: '0xDDE1A087Ff3cA5E7e694D7609A307E8622842327', // TREE-BUSD LP
    },
    tokenSymbol: 'TREE',
    tokenAddresses: {
      97: '',
      56: '0xf0fcd737fce18f95621cc7841ebe0ea6efccf77e',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

  // {
  //   pid: 10,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'TREE',
  //   lpAddresses: {
  //     97: '',
  //     // 56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019', // TREE-BUSD LP
  //     56: '0xDDE1A087Ff3cA5E7e694D7609A307E8622842327',
  //   },
  //   tokenSymbol: 'TREE',
  //   tokenAddresses: {
  //     97: '',
  //     // 56: '0xf952fc3ca7325cc27d15885d37117676d25bfda6',
  //     56: '0xf0fcd737fce18f95621cc7841ebe0ea6efccf77e',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  {
    pid: 6,
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'WBNB',
    lpAddresses: {
      97: '',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // BNB-BUSD LP
    },
    tokenSymbol: 'WBNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 7,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'BTCB',
    lpAddresses: {
      97: '',
      56: '0xb8875e207ee8096a929d543c9981c9586992eacb', // BTCB-BUSD LP
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 8,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'USDT',
    lpAddresses: {
      97: '',
      56: '0xc15fa3e22c912a276550f3e5fe3b0deb87b55acd', // USDT-BUSD LP
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  // {
  //   pid: 17,
  //   risk: 2,
  //   isTokenOnly: true,
  //   lpSymbol: 'ETH',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xd9a0d1f5e02de2403f68bb71a15f8847a854b494', // ETH-BUSD LP
  //   },
  //   tokenSymbol: 'ETH',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  {
    pid: 9,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'DAI',
    lpAddresses: {
      97: '',
      56: '0x3ab77e40340ab084c3e23be8e5a6f7afed9d41dc', // DAI-BUSD LP
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      97: '',
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 10,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'BUSD',
    lpAddresses: {
      97: '',
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019', // TREE-BUSD LP (BUSD-BUSD will ignore)
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '',
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  // {
  //   pid: 19,
  //   risk: 1,
  //   isTokenOnly: true,
  //   lpSymbol: 'USDC',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x680dd100e4b394bda26a59dd5c119a391e747d18', // USDC-BUSD LP
  //   },
  //   tokenSymbol: 'USDC',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 20,
  //   risk: 3,
  //   isTokenOnly: true,
  //   lpSymbol: 'DOT',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x54c1ec2f543966953f2f7564692606ea7d5a184e', // DOT-BUSD LP
  //   },
  //   tokenSymbol: 'DOT',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 21,
  //   risk: 4,
  //   isTokenOnly: true,
  //   lpSymbol: 'CAKE',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458', // CAKE-BUSD LP
  //   },
  //   tokenSymbol: 'CAKE',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 22,
  //   risk: 3,
  //   isTokenOnly: true,
  //   lpSymbol: 'BSCX',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xa32a983a64ce21834221aa0ad1f1533907553136', // BSCX-BUSD LP
  //   },
  //   tokenSymbol: 'BSCX',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x5ac52ee5b2a633895292ff6d8a89bb9190451587',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 23,
  //   risk: 3,
  //   isTokenOnly: true,
  //   lpSymbol: 'AUTO',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x4d0228ebeb39f6d2f29ba528e2d15fc9121ead56', // AUTO-BNB LP
  //   },
  //   tokenSymbol: 'AUTO',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xa184088a740c695e156f91f5cc086a06bb78b827',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
]

export default farms
