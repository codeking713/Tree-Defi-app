import { MenuEntry } from './types'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'TREE',
    icon: 'TREEIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.treedefi.com/#/swap?outputCurrency=0xf0fcd737fce18f95621cc7841ebe0ea6efccf77e',
      },
      {
        label: 'Chart',
        href: 'https://charts.treedefi.com/#/token/0xf0fcd737fce18f95621cc7841ebe0ea6efccf77e-bsc',
      },
    ],
  },
  {
    label: 'SEED',
    icon: 'SEEDIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.treedefi.com/#/swap?outputCurrency=0x40B34cC972908060D6d527276e17c105d224559d',
      },
      {
        label: 'Chart',
        href: 'https://charts.treedefi.com/#/token/0x40b34cc972908060d6d527276e17c105d224559d-bsc',
      },
    ],
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.treedefi.com/',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.treedefi.com/#/pool',
      },
      {
        label: 'Charts',
        href: 'https://charts.treedefi.com/',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Staking',
    icon: 'PoolIcon',
    href: '/staking',
  },
  {
    label: 'Pools',
    icon: 'IfoIcon',
    href: '/launch-pools',
    status: {
      text: "AUTO",
      color: "success",
    },
  },
  {
    label: 'NFTrees',
    icon: 'NFTrees',
    href: 'https://nft.treedefi.com/',
  },
  {
    label: 'Games',
    icon: 'NftIcon',
    items: [
      {
        label: 'Lottery',
        href: '/lottery',
      },
      {
        label: 'Green Wheel',
        href: '/greenwheel',
      },
      {
        label: 'King of The Forest',
        href: '/king',
      },
    ],
  },
  {
    label: 'Merch',
    icon: 'Merchandise',
    href: '/merchandise',
    status: {
      text: "FREE",
      color: "success",
    },
  },
  {
    label: 'Donations',
    icon: 'Donation',
    href: '/donation',
  },
  {
    label: 'Roadmap',
    icon: 'RoadmapIcon',
    href: '/roadmap',
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Project Info',
        href: 'https://treedefi.com/',
      },
      {
        label: 'Whitepaper',
        href: 'http://app.treedefi.com/files/whitepaper_treedefi.pdf',
      },
      {
        label: 'Donation Vault',
        href: 'https://app.treedefi.com/donation',
      },
      {
        label: 'TechRate Audit',
        href: 'https://github.com/TechRate/Smart-Contract-Audits/blob/main/Treedefi.pdf',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Docs',
        href: 'https://docs.treedefi.com/',
      },
      {
        label: 'Github',
        href: 'https://github.com/treedefi',
      },
      {
        label: 'Medium',
        href: 'https://treedefi.medium.com/',
      },
      {
        label: 'Feedback',
        href: 'https://feedback.treedefi.com',
      },
      {
        label: 'Vote',
        href: 'https://governance.treedefi.com',
      },
    ],
  },
  // {
  //   label: 'Partnerships/IFO',
  //   icon: 'GooseIcon',
  //   href: 'https://docs.google.com/forms/d/e/1FAIpQLSe7ycrw8Dq4C5Vjc9WNlRtTxEhFDB1Ny6jlAByZ2Y6qBo7SKg/viewform?usp=sf_link',
  // },
  // {
  //   label: 'Audit by Hacken',
  //   icon: 'AuditIcon',
  //   href: 'https://www.goosedefi.com/files/hackenAudit.pdf',
  // },
  // {
  //   label: 'Audit by CertiK',
  //   icon: 'AuditIcon',
  //   href: 'https://certik.org/projects/goose-finance',
  // },
]

export default config
