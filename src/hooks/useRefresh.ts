import { useContext } from 'react'
import { RefreshContext } from 'contexts/RefreshContext'

const useRefresh = () => {
  const { ultra, fast, slow } = useContext(RefreshContext)
  return { ultraRefresh: ultra, fastRefresh: fast, slowRefresh: slow }
}

export default useRefresh
