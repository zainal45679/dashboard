import React from 'react'
import { ProductTable } from './_components/product-table'
import { bannerApi } from '@/api/banner-api'
import { productApi } from '@/api/product-api'

const api = async ()=>{
  const response = await productApi.getAllProducts()
  return response.data.data.products
}

const page = async() => {

  const data = await api();

  return (
    <div>
      <ProductTable data={data}/>
    </div>
  )
}

export default page