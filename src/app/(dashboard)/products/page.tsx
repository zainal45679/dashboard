import React from 'react'
import { ProductTable } from './_components/product-table'
import { bannerApi } from '@/api/banner-api'
import { productApi } from '@/api/product-api'
import { brandApi } from '@/api/brand-api'
import { categoryApi } from '@/api/category-api'
import { ProductAddForm } from './_components/product-add-form'

const api = async ()=>{
  const response = await productApi.getAllProducts()
  console.log(response.data.data.products);
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