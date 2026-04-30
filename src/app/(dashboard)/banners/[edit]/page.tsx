import React from 'react'
import { BannerEditForm } from '../_components/banner-edit-form'
import { bannerApi } from '@/api/banner-api'


const api = async (id: string) => {
  return await bannerApi.getOneBanner(id)
}

const page = async() => {

  const response = await api()

  return (
    <BannerEditForm/>
  )
}

export default page