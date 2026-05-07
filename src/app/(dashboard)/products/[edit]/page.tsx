import React from 'react'
import { BannerAddForm } from '../../banners/_components/banner-add-form'
import { ProductAddForm } from '../_components/product-add-form'
import { categoryApi } from '@/api/category-api'
import { brandApi } from '@/api/brand-api'
import { productApi } from '@/api/product-api'
import { ProductEditForm } from '../_components/product-edit-form'

const fetch = async ()=>{
  const brands = await brandApi.getAllBrands()
  const categories = await categoryApi.getAllCategory();

  const object = {
    brands: brands.data.data.brands,
    categories: categories.data.data.categories,
  }
  console.log(object);
  return object
}

const getOne = async (id: string)=>{
    const res = await productApi.getOneProduct(id)
    console.log(res.data.data.product[0]);
    return res.data.data.product[0]
    
}

const page = async ({ params } : { params : Promise<{edit: string}>}) => {

  const { edit : id} = await params
  const data = await getOne(id)

  const { brands , categories } = await fetch()

  return (
    <ProductEditForm brands={brands} categories={categories} data={data}/>
  )
}

export default page