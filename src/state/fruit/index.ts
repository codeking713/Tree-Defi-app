/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { fetchFruitPoolBlockLimit } from './fetchFruitPool'
import { FruitState, FruitPool } from '../types'
import {
  fetchFruitPoolAllowance,
  fetchFruitPoolUserData,
  fetchFruitUserBalance,
  fetchFruitUserPendingReward,
  fetchFruitUserStakeBalance,
  fetchMerchandiseAllowance
} from './fetchFruitPoolUser'

const initialState: FruitState = { data: {} }

export const FruitSlice = createSlice({
  name: 'Fruit',
  initialState,
  reducers: {
    setFruitPoolPublicData: (state, action) => {
      const fruitPoolData: FruitPool = action.payload
      state.data = { ...state.data, ...fruitPoolData }
    },
    setFruitPoolUserData: (state, action) => {
      const userData = action.payload
      state.data = { ...state.data, userData }
    },
    updateFruitPoolUserData: (state, action) => {
      const { field, value } = action.payload
      state.data = { ...state.data, userData: { ...state.data.userData, [field]: value } }
    },
  },
})

// Actions
export const { setFruitPoolPublicData, setFruitPoolUserData, updateFruitPoolUserData } = FruitSlice.actions

// Thunks
export const fetchFruitPublicDataAsync = () => async (dispatch) => {
  const blockLimit = await fetchFruitPoolBlockLimit()
  const liveData = { ...blockLimit }

  dispatch(setFruitPoolPublicData(liveData))
}

export const fetchFruitUserDataAsync = (account) => async (dispatch) => {
  const userData = await fetchFruitPoolUserData(account)
  dispatch(setFruitPoolUserData(userData))
}

export const updateFruitUserAllowance = (account: string) => async (dispatch) => {
  const allowance = await fetchFruitPoolAllowance(account)
  dispatch(updateFruitPoolUserData({ field: 'allowance', value: allowance }))
}

export const updateMerchandiseUserAllowance = (account: string) => async (dispatch) => {
  const allowance = await fetchMerchandiseAllowance(account)
  dispatch(updateFruitPoolUserData({ field: 'fruitAllowance', value: allowance }))
}

export const updateFruitUserBalance = (account: string) => async (dispatch) => {
  const stakingTokenBalance = await fetchFruitUserBalance(account)
  dispatch(updateFruitPoolUserData({ field: 'stakingTokenBalance', value: stakingTokenBalance }))
}

export const updateFruitUserStakedBalance = (account: string) => async (dispatch) => {
  const stakedBalances = await fetchFruitUserStakeBalance(account)
  dispatch(updateFruitPoolUserData({ field: 'stakedBalance', value: stakedBalances }))
}

export const updateFruitUserPendingReward = (account: string) => async (dispatch) => {
  const pendingReward = await fetchFruitUserPendingReward(account)
  dispatch(updateFruitPoolUserData({ field: 'pendingReward', value: pendingReward }))
}

export default FruitSlice.reducer
