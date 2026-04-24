import React from 'react'
import { BrandTable } from './_components/brand-table'
import { brandApi } from '@/api/brand-api'

const api = async ()=>{
  const response = await brandApi.getAllBrands()
  return response.data.data.brands
}


const page = async() => {
  
  const data = await api()

  return (
    <div>
      <BrandTable data={data}/>
    </div>
  )
}

export default page