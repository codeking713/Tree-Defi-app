const getLastBidTime = (forestContract) => {
  return forestContract.methods.lastBidTime().call()
}

 const getLastBidder = (forestContract) => {
  return forestContract.methods.lastBidder().call()
}

 const getHasWinner = (forestContract) => {
  return forestContract.methods.hasWinner().call()
}

 const getNextStartTime = (forestContract) => {
  return forestContract.methods.nextStartTime().call()
}

 const getBidAmount = (forestContract) => {
  return forestContract.methods.bidAmount().call()
}

const getEndDelay = (forestContract) => {
  return forestContract.methods.endDelay().call()
}

const getLastWinner = (forestContract) => {
  return forestContract.methods.lastWinner().call()
}

const isAddressBanned = (forestContract, address) => {
  if (!address) return false
  return forestContract.methods.blacklist(address).call()
}

// Fetch all data in one function
// It would be better to have a structure to fetch from the smart contract

// eslint-disable-next-line import/prefer-default-export
export const getAllForestData = async (forestContract, address) => {
  const lastBidder = await getLastBidder(forestContract)
  const hasWinner = await getHasWinner(forestContract)
  const lastWinner = await getLastWinner(forestContract)
  const nextStartTime = await getNextStartTime(forestContract)
  const bidAmount = await getBidAmount(forestContract)
  const lastBidTime = parseInt(await getLastBidTime(forestContract))
  const _endDelay = parseInt(await getEndDelay(forestContract))
  const endOfAuction = (lastBidTime + _endDelay) * 1000
  const isBanned = await isAddressBanned(forestContract, address)

  // console.log(isBanned,address)
  return {
    lastBidTime,
    lastBidder,
    hasWinner,
    lastWinner,
    nextStartTime,
    bidAmount,
    endOfAuction,
    isBanned,
  }
}