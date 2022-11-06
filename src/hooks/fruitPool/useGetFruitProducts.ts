import { useEffect, useState } from 'react'
import useRefresh from 'hooks/useRefresh'

const merchandiseApiUrl = 'https://apimerchandise.treedefi.com'

const useGetFruitProducts = (withUpdate?: boolean) => {
  const { slowRefresh } = useRefresh()
  const [products, setProducts] = useState([])

  useEffect(() => {
    //   user-specific vault contract fetches
    const fetchFruitProducts = async () => {
      const response = await fetch(`${merchandiseApiUrl}/product`)
      const responseData = await response.json()

      if (responseData.success) {
        let productsData = responseData?.data?.products || []
        productsData = productsData.map(productData => { return { ...productData, totalQty: productData.total_qty, soldQty: productData.sold_qty } })
        setProducts(productsData)
      }
    }

    fetchFruitProducts()
  }, [slowRefresh, withUpdate])

  return products
}

export default useGetFruitProducts
