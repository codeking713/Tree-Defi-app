import { useCallback, useState } from 'react'
import { getWeb3 } from 'utils/web3'

// it is called 2 times every fastRefresh (one for bid and one for win events)
const getPastEventsByBlocksStep = async (
  contract: any,
  eventName: string,
  // fromBlock = '0',
  filter: any = {},
  step = 5000,
) => {
  const web3 = getWeb3()

  

  const lastBlockNumber: number = await web3.eth.getBlockNumber()

  // Just ignore fromBlock parameter which is hardcoded and casues issues on metamask when the number of calls increases
  // let currentBlock = parseInt(fromBlock)
  // go back to 5000 blocks instead (approx 5 minutes history) and collect that data
  // with a step of 5000 it means that we have only 1 chunk
  let currentBlock = lastBlockNumber - 5000

  const diff = lastBlockNumber - currentBlock
  if (diff <= 0) return []

  const chunks = []

  while (currentBlock < lastBlockNumber) {
    chunks.push([currentBlock, Math.min(currentBlock + step, lastBlockNumber)])

    currentBlock += step
  }

  // console.log('chunks', chunks)
  const events: any[] = await Promise.all(
    chunks.map((chunk) => {
      // console.log('call', chunk[0], chunk[1])
      return contract.getPastEvents(eventName, {
        filter,
        fromBlock: chunk[0],
        toBlock: chunk[1],
      })
    }),
  ).then((chunksData) => {
    let data = []
    chunksData.forEach((chunk) => {
      // console.log('single chung data', chunk)
      data = data.concat(chunk)
    })
    return data
  })

  return events
}

const usePastEvents = (contract, eventName: string, filter: any = undefined) => {
  const [loading, setLoading] = useState(false)
  const fetchEvents = useCallback(async () => {
    setLoading(true)
    let data = []
    try {
      data = await getPastEventsByBlocksStep(contract, eventName, '6953142', filter)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
    return data
  }, [contract, eventName, filter])

  return {
    loading,
    fetch: fetchEvents,
  }
}

export default usePastEvents
