import React from 'react'
import { BannerAddForm } from '../../banners/_components/banner-add-form'
import { ProductAddForm } from '../_components/product-add-form'
import { categoryApi } from '@/api/category-api'
import { brandApi } from '@/api/brand-api'

const fetch = async ()=>{
  const brands = await brandApi.getAllBrands()
  const categories = await categoryApi.getAllCategory();

  const object = {
    brands: brands.data.data.brands,
    categories: categories.data.data.categories,
  }

  return object
}

const page = async () => {

  const { brands , categories } = await fetch()

  return (
    <ProductAddForm brands={brands} categories={categories}/>
  )
}

export default page