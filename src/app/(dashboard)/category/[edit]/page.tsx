import React from 'react'
import { CategoryAddForm } from '../_components/category-add-form'
import { CategoryEditForm } from '../_components/category-edit-form'
import { categoryApi } from '@/api/category-api'

const api = async(id : string)=> {
    const response  = await categoryApi.getOneCategory(id)
    return response.data.data.category[0]
}

const page = async ( {params} : { params : Promise <{ edit : string}>}) => {
  const { edit : id } = await params
  const data = await api(id)
  console.log(data);
  return (
    <CategoryEditForm data={data}/>
  )
}

export default page