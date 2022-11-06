import { useState, useEffect } from 'react'
import { sumBy } from 'lodash'

export interface ApiDonationResponse {
  records: [
    {
      fields: {
        Total: number
      }
    },
  ]
}
const AIR_TABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY
const AIR_TABLE_API_URL = process.env.REACT_APP_AIRTABLE_API_URL
const useGetDonation = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await fetch(`${AIR_TABLE_API_URL}`, {
          headers: new Headers({
            Authorization: `Bearer ${AIR_TABLE_API_KEY}`,
          }),
        })
        const responsedata: ApiDonationResponse = await response.json()
        const output = sumBy(responsedata.records, (donation) => {
          return donation.fields.Total
        })
        setData(output)
      } catch (error) {
        console.error('Unable to fetch donation data:', error)
      }
    }

    fetchDonation()
  }, [setData])

  return data
}

export default useGetDonation
