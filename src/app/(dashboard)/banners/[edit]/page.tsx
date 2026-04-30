import React from 'react'
import { BannerEditForm } from '../_components/banner-edit-form'
import { bannerApi } from '@/api/banner-api'


const api = async (id: string) => {
  const response = await bannerApi.getOneBanner(id)
  return response.data.data.banner[0]
}

const page = async({params}: { params : Promise<{ edit: string}>}) => {

  const { edit : id } = await params
  
  const data = await api(id)
  console.log(data);

  return (
    <BannerEditForm data={data}/>
  )
}

export default page