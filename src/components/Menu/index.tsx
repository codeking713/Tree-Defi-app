import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceSeedBusd, useGetPriceDataTree } from 'state/hooks'
import { Menu as UikitMenu } from '@pancakeswap-libs/uikit'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceSeedBusd()
  const cakePriceTreeUsd = useGetPriceDataTree()

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd}
      cakePriceTreeUsd={cakePriceTreeUsd}
      links={config}
      priceLink="https://pancakeswap.info/token/0xf0fcd737fce18f95621cc7841ebe0ea6efccf77e"
      priceLinkTree="https://pancakeswap.info/token/0x40B34cC972908060D6d527276e17c105d224559d"
      {...props}
    />
  )
}

export default Menu
