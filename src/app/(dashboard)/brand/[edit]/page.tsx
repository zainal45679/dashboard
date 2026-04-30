import React from 'react'
import { BrandEditForm } from '../_components/brand-edit-form'
import { brandApi } from '@/api/brand-api'

const api = async (id : string)=>{
    const res = await brandApi.getOneBrand(id)
    return res.data.data.brand[0]
}

const page = async({params} : { params : Promise<{edit : string}>}) => {

  const { edit : id } = await params
  const data = await api(id)
  console.log(data);

  return (
    <BrandEditForm data={data}/>
  )
}

export default page